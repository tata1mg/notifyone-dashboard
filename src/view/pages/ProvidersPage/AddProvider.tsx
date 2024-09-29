import { Button, Flex, Spin, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchAddProvidersList } from 'src/store/actions/actions';
import ProvidersList from './ProvidersList';

const AddProvider = ({
  providerDrawer,
  selectedProvider,
  setSelectedProvider,
}: {
  providerDrawer: boolean;
  selectedProvider: object | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<object | null>>;
}) => {
  const dispatch = useDispatch();
  const allProviders = useSelector(
    (state: RootState) => state.reducer.allProviders
  );
  const allProvidersLoading = useSelector(
    (state: RootState) => state.reducer.allProvidersLoading
  );

  useEffect(() => {
    if (providerDrawer) {
      dispatch(fetchAddProvidersList());
    }
  }, [providerDrawer]);
  return (
    <div>
      <Spin spinning={allProvidersLoading}>
        <Tabs
          defaultActiveKey="1"
          items={allProviders?.channels?.map(
            (channel: string, index: number) => {
              return {
                label: channel.toUpperCase(),
                key: index,
                children: (
                  <ProvidersList
                    providersList={
                      allProviders?.channel_providers[channel]?.providers
                    }
                    selectedProvider={selectedProvider}
                    setSelectedProvider={setSelectedProvider}
                  />
                ),
              };
            }
          )}
          onChange={() => setSelectedProvider(null)}
        />
        <Flex
          style={{ marginTop: 24 }}
          justify="flex-end"
          align="center"
          gap="large"
        >
          <Button danger style={{ width: 180 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={selectedProvider ? false : true}
            style={{ width: 180 }}
          >
            Next
          </Button>
        </Flex>
      </Spin>
    </div>
  );
};

export default AddProvider;
