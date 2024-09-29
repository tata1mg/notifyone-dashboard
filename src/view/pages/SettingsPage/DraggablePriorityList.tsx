import { Avatar, Button, Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { setProvidersPriority } from 'src/store/actions/actions';

const DraggableWidget = ({
  provider,
  index,
  rearrangeProviders,
}: {
  provider: { name: string; logo: string };
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
      className={`provider-list-item`}
    >
      <div>
        <Avatar src={provider.logo} alt={'Logo'} />
      </div>
      <div>{provider.name}</div>
    </Flex>
  );
};

export const DraggableProvidersList = ({
  channel,
  order,
  setOrder,
}: {
  channel: string;
  order: { name: string; logo: string }[];
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
          (provider: { name: string; logo: string }, index: number) => (
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
          onClick={() =>
            dispatch(
              setProvidersPriority({
                channel: channel,
                providers_priority: order,
              })
            )
          }
        >
          Update Priority
        </Button>
      </Flex>
    </>
  );
};
