import React, { useEffect, useState } from 'react';
import { Drawer, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchAppsList } from 'src/store/actions/actions';
import AppsListTable from './AppsListTable';

const { Title } = Typography;

const AppsList = () => {
  const dispatch = useDispatch();
  const appsList = useSelector((state: RootState) => state.reducer.appsList);
  const loading = useSelector((state: RootState) => state.reducer.loading);
  const [editAppData, setEditAppData] = useState<object | null>(null);

  useEffect(() => {
    dispatch(fetchAppsList());
  }, []);

  return (
    <div className="content-wrapper">
      <Space style={{ width: '100%' }} direction="vertical">
        <Title level={3}>{appsList?.message}</Title>
        <AppsListTable
          loading={loading}
          tenants={appsList?.tenants}
          setEditAppData={setEditAppData}
        />
      </Space>
      <Drawer
        onClose={() => {
          setEditAppData(null);
        }}
        open={editAppData ? true : false}
        title={`Edit App - ${editAppData?.app_name}`}
        width={800}
        // maskClosable
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Title level={5}>Editing {editAppData?.app_name}</Title>
        </Space>
      </Drawer>
    </div>
  );
};

export default AppsList;
