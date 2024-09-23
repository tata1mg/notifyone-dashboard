import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getHealthColor } from 'src/common1/utils';

const ChannelQueuesTable = ({ channelQueues }: { channelQueues: object[] }) => {
  const [tableData, setTableData] = useState<object[]>([]);

  const columns = [
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: 'Health',
      dataIndex: 'health',
      key: 'health',
      render: (value: string) => {
        return <Tag color={getHealthColor(value)}>{value}</Tag>;
      },
    },
    {
      title: 'Total Messages',
      dataIndex: 'total_messages',
      key: 'total_messages',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  useEffect(() => {
    if (channelQueues.length) {
      setTableData(channelQueues);
    } else {
      setTableData([]);
    }
  }, [channelQueues]);

  return <Table dataSource={tableData} columns={columns} pagination={false} />;
};

export default ChannelQueuesTable;
