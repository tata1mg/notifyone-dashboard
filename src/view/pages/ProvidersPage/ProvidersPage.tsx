import { Button, Col, Drawer, Row, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchProvidersList } from 'src/store/actions/actions';
import { Spinner } from 'src/view/components/Spinner';
import './providers.css';
import ProvidersTable from './ProvidersTable';
import AddProvider from './AddProvider';

const { Title, Text } = Typography;

const ProvidersPage = () => {
  const dispatch = useDispatch();
  const [providerDrawer, setProviderDrawer] = useState(false);
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
      {pageLoading ? (
        <Spinner className="h-[calc(100vh-48px-50px)]" loading={pageLoading} />
      ) : (
        <div className="content-wrapper">
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
                    providersList={providersData?.providers || []}
                  />
                </Col>
              </Row>
            </Space>
          )}
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
              <AddProvider
                providerDrawer={providerDrawer}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
              />
            </Space>
          </Drawer>
        </div>
      )}
    </>
  );
};

export default ProvidersPage;
