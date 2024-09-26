import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getTagColor } from 'src/common/utils/index';

const PriorityQueuesTable = ({
  priorityQueues,
}: {
  priorityQueues: object[];
}) => {
  const [tableData, setTableData] = useState<object[]>([]);

  const columns = [
    {
      title: 'Priority Type',
      dataIndex: 'priority_type',
      key: 'priority_type',
    },
    {
      title: 'Health',
      dataIndex: 'health',
      key: 'health',
      render: (value: string) => {
        return <Tag color={getTagColor(value)}>{value}</Tag>;
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
    if (priorityQueues.length) {
      setTableData(priorityQueues);
    } else {
      setTableData([]);
    }
  }, [priorityQueues]);

  return <Table dataSource={tableData} columns={columns} pagination={false} />;
};

export default PriorityQueuesTable;
