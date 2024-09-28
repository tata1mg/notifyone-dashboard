import { Flex, Avatar } from 'antd';
// import { RightOutlined } from '@ant-design/icons';
import React from 'react';

const ProvidersList = ({
  providersList,
  selectedProvider,
  setSelectedProvider,
}: {
  providersList: any;
  selectedProvider: object | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<object>>;
}) => {
  return (
    <div style={{ height: '60vh', overflow: 'scroll' }}>
      {providersList?.map(
        (provider: { name: string; code: string }, index: number) => {
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
                <Avatar
                  src={
                    'https://t4.ftcdn.net/jpg/07/83/59/39/240_F_783593931_K5AmIK5HXwqkZtOpJQjRN1gAFmqzvLYg.jpg'
                  }
                  alt={'Logo'}
                />
              </div>

              <div>{provider.name}</div>
            </Flex>
          );
        }
      )}
    </div>
  );
};

export default ProvidersList;
