import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { getTagColor } from 'src/common/utils/index';

const ComponentsTable = ({ components }: { components: object[] }) => {
  const [tableData, setTableData] = useState<object[]>([]);

  const columns = [
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
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
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  useEffect(() => {
    if (components.length) {
      setTableData(components);
    } else {
      setTableData([]);
    }
  }, [components]);

  return <Table dataSource={tableData} columns={columns} pagination={false} />;
};

export default ComponentsTable;
