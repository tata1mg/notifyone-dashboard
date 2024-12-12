import { Button, Flex, Spin, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchAddProvidersList } from 'src/store/actions/actions';
import ProvidersList from './ProvidersList';
import { PROVIDER_VIEWS } from 'src/common/constants';
import AddProviderForm from './AddProviderForm';

const AddProvider = ({
  selectedProvider,
  setSelectedProvider,
  onCancel,
}: {
  selectedProvider: object | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<object | null>>;
  onCancel: () => void;
}) => {
  const dispatch = useDispatch();
  const [selectedChannelCode, setSelectedChannelCode] = useState('email');
  const [type, setType] = useState(PROVIDER_VIEWS.LIST_PROVIDERS);
  const allProviders = useSelector(
    (state: RootState) => state.reducer.allProviders
  );
  const allProvidersLoading = useSelector(
    (state: RootState) => state.reducer.allProvidersLoading
  );

  useEffect(() => {
    dispatch(fetchAddProvidersList());
  }, []);

  const setNextView = (currentView: string) => {
    switch (currentView) {
      case PROVIDER_VIEWS.LIST_PROVIDERS:
        setType(PROVIDER_VIEWS.ADD_PROVIDER_FORM);
        break;
      default:
        setType(PROVIDER_VIEWS.LIST_PROVIDERS);
    }
  };

  const setPrevView = (currentView: string) => {
    switch (currentView) {
      case PROVIDER_VIEWS.LIST_PROVIDERS:
        break;
      case PROVIDER_VIEWS.ADD_PROVIDER_FORM:
        setSelectedProvider(null);
        setSelectedChannelCode('email');
        setType(PROVIDER_VIEWS.LIST_PROVIDERS);
        break;
      default:
        setSelectedProvider(null);
        setSelectedChannelCode('email');
        setType(PROVIDER_VIEWS.LIST_PROVIDERS);
    }
  };

  const getView = (viewType: string) => {
    switch (viewType) {
      case PROVIDER_VIEWS.LIST_PROVIDERS:
        return (
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
                        allProviders.channel_providers[channel]?.providers
                      }
                      selectedProvider={selectedProvider}
                      setSelectedProvider={setSelectedProvider}
                    />
                  ),
                };
              }
            )}
            onChange={(activeKey) => {
              setSelectedChannelCode(
                allProviders.channel_providers[
                  allProviders.channels?.[activeKey]
                ]?.code
              );
              setSelectedProvider(null);
            }}
          />
        );

      case PROVIDER_VIEWS.ADD_PROVIDER_FORM:
        return (
          <AddProviderForm
            channelCode={selectedChannelCode}
            providerCode={selectedProvider?.code}
            onCancel={onCancel}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <div>
      <Spin spinning={allProvidersLoading}>
        <>{getView(type)}</>
        <Flex
          style={{ marginTop: 24 }}
          justify="flex-end"
          align="center"
          gap="large"
        >
          <Button
            danger
            style={{ width: 180 }}
            onClick={() => {
              if (type === PROVIDER_VIEWS.LIST_PROVIDERS) {
                onCancel?.();
                setSelectedChannelCode('');
              } else {
                setPrevView(type);
              }
            }}
          >
            {type === PROVIDER_VIEWS.LIST_PROVIDERS ? 'Cancel' : 'Prev'}
          </Button>
          {type === PROVIDER_VIEWS.LIST_PROVIDERS && (
            <Button
              type="primary"
              disabled={selectedProvider ? false : true}
              style={{ width: 180 }}
              onClick={() => setNextView(type)}
            >
              Next
            </Button>
          )}
        </Flex>
      </Spin>
    </div>
  );
};

export default AddProvider;
