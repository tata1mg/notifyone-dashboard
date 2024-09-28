import { Space, Tabs, Typography } from 'antd';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchProvidersPriorityList } from 'src/store/actions/actions';
import { DraggableProvidersList } from './DraggablePriorityList';
import { Spinner } from 'src/view/components/Spinner';
import './settings.css';

const { Title } = Typography;

const SettingsPage = () => {
  const dispatch = useDispatch();
  const priorityList = useSelector(
    (state: RootState) => state.reducer.priorityList
  );

  const loading = useSelector((state: RootState) => state.reducer.loading);

  useEffect(() => {
    dispatch(fetchProvidersPriorityList());
  }, []);

  return (
    <>
      {loading ? (
        <Spinner className="h-[calc(100vh-48px-50px)]" loading={loading} />
      ) : (
        <div className="content-wrapper">
          <Space style={{ width: '100%' }} direction="vertical">
            <Title level={3}>{priorityList.title}</Title>
            <DndProvider backend={HTML5Backend}>
              <Tabs
                defaultActiveKey="1"
                items={priorityList?.channels?.map(
                  (
                    provider: {
                      name: string;
                      code: string;
                      providers_priority: { name: string; logo: string }[];
                    },
                    index: number
                  ) => {
                    return {
                      label: provider?.name?.toUpperCase(),
                      key: index,
                      children: (
                        <DraggableProvidersList
                          providers={provider.providers_priority}
                          channel={provider?.code}
                        />
                      ),
                    };
                  }
                )}
                // onChange={() => dispatch(fetchProvidersPriorityList())}
              />
            </DndProvider>
          </Space>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
