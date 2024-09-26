import React, { useEffect, useState } from 'react';
import { Drawer, Space, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CreateForm } from '@tata1mg/formzen';
import { RootState } from 'src/store';
import {
  fetchAppsList,
  fetchEditAppFormStructure,
} from 'src/store/actions/actions';
import AppsListTable from './AppsListTable';

const { Title, Text } = Typography;

const AppsList = () => {
  const dispatch = useDispatch();
  const appsList = useSelector((state: RootState) => state.reducer.appsList);
  const loading = useSelector((state: RootState) => state.reducer.loading);
  const [editAppData, setEditAppData] = useState<object | null>(null);
  const editAppFormStructure = useSelector(
    (state: RootState) => state.reducer.editAppFormStructure
  );
  const editAppFormLoading = useSelector(
    (state: RootState) => state.reducer.editAppFormLoading
  );

  const onSubmit = (formData: any) => {
    // dispatch(createAppName(formData.create_app));
    console.log(formData);
  };

  useEffect(() => {
    dispatch(fetchAppsList());
  }, []);

  useEffect(() => {
    if (editAppData?.id) {
      dispatch(fetchEditAppFormStructure(editAppData.id));
    }
  }, [editAppData]);

  return (
    <div className="content-wrapper">
      <Space style={{ width: '100%' }} direction="vertical">
        <Title level={3}>{appsList?.title}</Title>
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
        title={
          <>
            Editing App -
            <Text
              style={{ paddingLeft: 12, fontSize: 14, color: '#880808' }}
              italic
              strong
            >
              {editAppData?.app_name}
            </Text>
          </>
        }
        width={800}
      >
        <Spin spinning={editAppFormLoading}>
          <CreateForm
            formConfig={{
              onSubmit: onSubmit,
              formName: `Edit App Form`,
              structure: editAppFormStructure || {},
              mode: 'create', // create | view | edit,
            }}
          />
        </Spin>
      </Drawer>
    </div>
  );
};

export default AppsList;
