import { Flex, Avatar } from 'antd';
// import { RightOutlined } from '@ant-design/icons';
import React from 'react';

const ProvidersList = ({
  providersList,
  selectedProvider,
  setSelectedProvider,
}: {
  providersList: { name: string; code: string; logo: string }[];
  selectedProvider: object | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<object>>;
}) => {
  return (
    <div style={{ height: '60vh', overflow: 'scroll' }}>
      {providersList?.map(
        (
          provider: { name: string; code: string; logo: string },
          index: number
        ) => {
          return (
            <Flex
              gap="middle"
              align="center"
              key={index}
              className={`provider-list-item ${
                selectedProvider?.code === provider.code ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedProvider(provider);
              }}
            >
              <div>
                <Avatar src={provider?.logo} alt={'Logo'} />
              </div>

              <div>{provider.name || provider.code}</div>
            </Flex>
          );
        }
      )}
    </div>
  );
};

export default ProvidersList;
