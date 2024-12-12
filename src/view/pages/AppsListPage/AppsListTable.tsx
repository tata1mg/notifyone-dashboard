import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { DEFAULT_PAGINATION } from 'src/common/constants';

const { Text } = Typography;

const AppsListTable = ({
  tenants,
  loading,
  setEditAppData,
}: {
  tenants: object[];
  loading: boolean;
  setEditAppData: React.Dispatch<React.SetStateAction<object | null>>;
}) => {
  const [tableData, setTableData] = useState<object[]>([]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'App Name',
      dataIndex: 'app_name',
      key: 'app_name',
    },
    {
      title: 'Callback Url',
      dataIndex: 'callback_url',
      key: 'callback_url',
      render: (value: string) => (
        <Text italic style={{ color: '#007FFF' }}>
          {value}
        </Text>
      ),
    },
    {
      title: 'Sender address',
      dataIndex: 'email_sender_address',
      key: 'email_sender_address',
    },
    {
      title: 'Sender name',
      dataIndex: 'email_sender_name',
      key: 'email_sender_name',
    },
    {
      title: 'Reply to',
      dataIndex: 'email_sender_reply_to',
      key: 'email_sender_reply_to',
    },
    {
      title: 'Last updated',
      dataIndex: 'updated',
      key: 'updated',
    },
  ];

  useEffect(() => {
    if (tenants?.length) {
      setTableData(tenants);
    } else {
      setTableData([]);
    }
  }, [tenants]);

  return (
    <Table
      loading={loading}
      dataSource={tableData}
      columns={columns}
      pagination={{
        pageSize: DEFAULT_PAGINATION.pageSize,
        total: tableData?.length,
      }}
      scroll={{ x: 'max-content' }}
      onRow={(record) => ({
        onClick: () => setEditAppData(record),
      })}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default AppsListTable;
