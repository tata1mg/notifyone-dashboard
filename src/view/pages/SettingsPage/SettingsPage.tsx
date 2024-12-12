import { Space, Spin, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchDefaultPriorityList } from 'src/store/actions/actions';
import { DraggableProvidersList } from './DraggablePriorityList';
import './settings.css';

const { Title } = Typography;

const SettingsPage = () => {
  const dispatch = useDispatch();
  const priorityList = useSelector(
    (state: RootState) => state.reducer.priorityList
  );
  const [order, setOrder] = useState<
    { name: string; logo: string; code: string; unique_identifier: string }[]
  >([]);

  const loading = useSelector((state: RootState) => state.reducer.loading);

  useEffect(() => {
    dispatch(fetchDefaultPriorityList());
  }, []);

  useEffect(() => {
    setOrder(priorityList?.channels[0].providers_priority);
  }, [priorityList]);

  return (
    <>
      <div className="content-wrapper">
        <Spin spinning={loading}>
          <Space style={{ width: '100%' }} direction="vertical">
            <Title level={3}>{priorityList?.title}</Title>
            <DndProvider backend={HTML5Backend}>
              <Tabs
                defaultActiveKey="1"
                items={priorityList?.channels?.map(
                  (
                    provider: {
                      name: string;
                      code: string;
                      providers_priority: {
                        name: string;
                        logo: string;
                        code: string;
                        unique_identifier: string;
                      }[];
                    },
                    index: number
                  ) => {
                    return {
                      label: provider?.name?.toUpperCase(),
                      key: index,
                      children: (
                        <DraggableProvidersList
                          channel={provider?.code}
                          order={order}
                          setOrder={setOrder}
                        />
                      ),
                    };
                  }
                )}
                onChange={(index: string) => {
                  setOrder(priorityList?.channels[index].providers_priority);
                }}
              />
            </DndProvider>
          </Space>
        </Spin>
      </div>
    </>
  );
};

export default SettingsPage;
