import { Flex, Avatar } from 'antd';
// import { RightOutlined } from '@ant-design/icons';
import React from 'react';

const ChannelsList = ({
  channelList,
  selectedProvider,
  setSelectedProvider,
}: {
  channelList: any;
  selectedProvider: object | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<object>>;
}) => {
  return (
    <div style={{ height: '60vh', overflow: 'scroll' }}>
      {channelList?.providers.map(
        (channel: { name: string; code: string }, index: number) => {
          return (
            <Flex
              gap="middle"
              align="center"
              key={index}
              className={`channel-list-item ${
                selectedProvider?.name === channel.name ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedProvider(channel);
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

              <div>{channel.code}</div>
            </Flex>
          );
        }
      )}
    </div>
  );
};

export default ChannelsList;
