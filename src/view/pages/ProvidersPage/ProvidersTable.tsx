import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { DEFAULT_PAGINATION } from 'src/common/constants';

const ProvidersTable = ({
  providersData,
  setUpdateProvider,
  setUpdateProviderDrawer,
}: {
  providersData: {
    providers: object[];
    total: number;
  };
  setUpdateProvider: React.Dispatch<React.SetStateAction<object>>;
  setUpdateProviderDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const providersList = providersData?.providers || [];
  const [tableData, setTableData] = useState<object[]>([]);

  const columns = [
    {
      title: 'Identifier',
      dataIndex: 'unique_identifier',
      key: 'unique_identifier',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      render: (value: string) => {
        switch (value?.toLowerCase()) {
          case 'email':
            return <Tag color="blue">{value.toUpperCase()}</Tag>;
          case 'push':
            return <Tag color="magenta">{value.toUpperCase()}</Tag>;
          case 'sms':
            return <Tag color="cyan">{value.toUpperCase()}</Tag>;
          case 'whatsapp':
            return <Tag color="green">{value.toUpperCase()}</Tag>;
          default:
            return <></>;
        }
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => {
        if (value === 'active') {
          return <Tag color="green">{value}</Tag>;
        } else {
          return <Tag color="volcano">{value}</Tag>;
        }
      },
    },
    {
      title: 'Last Updated',
      dataIndex: 'last_updated',
      key: 'last_updated',
    },
  ];

  useEffect(() => {
    if (providersList.length) {
      setTableData(providersList);
    } else {
      setTableData([]);
    }
  }, [providersList]);

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={{
        pageSize: DEFAULT_PAGINATION.pageSize,
        total: providersData?.total,
      }}
      onRow={(record) => ({
        onClick: () => {
          setUpdateProviderDrawer(true);
          setUpdateProvider(record);
        },
      })}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default ProvidersTable;
