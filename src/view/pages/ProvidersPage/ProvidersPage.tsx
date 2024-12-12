import { Button, Col, Drawer, Row, Space, Spin, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  fetchProvidersList,
  resetProvidersForm,
} from 'src/store/actions/actions';
import './providers.css';
import ProvidersTable from './ProvidersTable';
import AddProvider from './AddProvider';
import UpdateProviderForm from './UpdateProviderForm';

const { Title, Text } = Typography;

const ProvidersPage = () => {
  const dispatch = useDispatch();
  const [providerDrawer, setProviderDrawer] = useState(false);
  const [updateProviderDrawer, setUpdateProviderDrawer] = useState(false);
  const [updateProvider, setUpdateProvider] = useState({});
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<object | null>(null);
  const pageLoading = useSelector((state: RootState) => state.reducer.loading);
  const providersData = useSelector(
    (state: RootState) => state.reducer.providersList
  );

  useEffect(() => {
    dispatch(fetchProvidersList());
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <Spin spinning={pageLoading}>
          {providersData && (
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Row>
                <Col span={24}>
                  <Title level={3}>
                    {providersData?.title || 'Providers List'}
                  </Title>
                </Col>
                <Col span={8}>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    className="add-provider-button"
                    onClick={() => {
                      setProviderDrawer(true);
                      setDrawerTitle('Select a Provider');
                    }}
                  >
                    Add a Provider
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <ProvidersTable
                    providersData={providersData}
                    setUpdateProvider={setUpdateProvider}
                    setUpdateProviderDrawer={setUpdateProviderDrawer}
                  />
                </Col>
              </Row>
            </Space>
          )}
        </Spin>
        <Drawer
          onClose={() => {
            setProviderDrawer(false);
            setDrawerTitle('');
            setSelectedProvider(null);
          }}
          open={providerDrawer}
          title={drawerTitle}
          width={800}
          maskClosable
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Text italic>
              Select a provider to create instance for a channel
            </Text>
            {providerDrawer && (
              <AddProvider
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
                onCancel={() => {
                  setProviderDrawer(false);
                  setDrawerTitle('');
                  setSelectedProvider(null);
                }}
              />
            )}
          </Space>
        </Drawer>

        <Drawer
          onClose={() => {
            setUpdateProviderDrawer(false);
            dispatch(resetProvidersForm());
          }}
          open={updateProviderDrawer}
          title={`Update Provider - ${updateProvider?.unique_identifier}`}
          width={800}
          maskClosable
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Text italic>Update current configured provider</Text>
            {updateProviderDrawer && (
              <UpdateProviderForm
                uniqueIdentifier={updateProvider?.unique_identifier}
                onCancel={() => {
                  setUpdateProviderDrawer(false);
                  dispatch(resetProvidersForm());
                }}
              />
            )}
          </Space>
        </Drawer>
      </div>
    </>
  );
};

export default ProvidersPage;
