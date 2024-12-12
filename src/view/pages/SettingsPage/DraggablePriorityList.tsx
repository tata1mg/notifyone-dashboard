import React from 'react';
import { Avatar, Button, Flex } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { setDefaultPriority } from 'src/store/actions/actions';
import { FullscreenExitOutlined } from '@ant-design/icons';

const DraggableWidget = ({
  provider,
  index,
  rearrangeProviders,
}: {
  provider: {
    name: string;
    logo: string;
    code: string;
    unique_identifier: string;
  };
  index: number;
  rearrangePRoviders: (initialIndex: number, finalIndex: number) => void;
}) => {
  const [, ref] = useDrag({
    type: 'WIDGET',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'WIDGET',
    drop: (item: { index: number }) => {
      if (item.index !== index) {
        rearrangeProviders(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <Flex
      ref={(node) => ref(drop(node))}
      gap="middle"
      align="center"
      justify="space-between"
      className={`provider-list-item`}
    >
      <Flex gap="middle" align="center">
        <Avatar src={provider.logo} alt={'Logo'} />
        <div>{provider.unique_identifier}</div>
      </Flex>
      <div style={{ marginRight: 16 }}>
        <FullscreenExitOutlined style={{ fontSize: '18px' }} />
      </div>
    </Flex>
  );
};

export const DraggableProvidersList = ({
  channel,
  order,
  setOrder,
}: {
  channel: string;
  order: {
    name: string;
    logo: string;
    code: string;
    unique_identifier: string;
  }[];
  setOrder: any;
}) => {
  const dispatch = useDispatch();

  const rearrangeProviders = (initialIndex: number, finalIndex: number) => {
    const updatedOrder = [...order];
    updatedOrder.splice(initialIndex, 1);
    updatedOrder.splice(finalIndex, 0, order[initialIndex]);
    setOrder(updatedOrder);
  };

  return (
    <>
      <div>
        {order?.map(
          (
            provider: {
              name: string;
              logo: string;
              code: string;
              unique_identifier: string;
            },
            index: number
          ) => (
            <DraggableWidget
              key={`${index} ${provider}`}
              provider={provider}
              index={index}
              rearrangeProviders={rearrangeProviders}
            />
          )
        )}
      </div>
      <Flex justify="flex-end">
        <Button
          type="primary"
          style={{ width: 240, marginTop: 16 }}
          onClick={() => {
            dispatch(
              setDefaultPriority({
                channel: channel,
                providers_priority: order.map(
                  (priority: {
                    name: string;
                    logo: string;
                    code: string;
                    unique_identifier: string;
                  }) => priority.unique_identifier
                ),
              })
            );
          }}
          disabled={!order.length || false}
        >
          Update Priority
        </Button>
      </Flex>
    </>
  );
};
