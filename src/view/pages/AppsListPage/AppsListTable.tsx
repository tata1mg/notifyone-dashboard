import React, { useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Typography } from 'antd';
// import { useDispatch } from 'react-redux';
// import { fetchAppsList } from 'src/store/actions/actions';
// import { getHealthColor } from 'src/common/utils/index';
// import { render } from '@testing-library/react';

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
  // const dispatch = useDispatch();
  const [tableData, setTableData] = useState<object[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 5,
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);
    // dispatch(fetchAppsList());
  };

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
      dataIndex: 'last_updated',
      key: 'last_updated',
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
      pagination={pagination}
      scroll={{ x: 'max-content' }}
      onRow={(record) => ({
        onClick: () => setEditAppData(record),
      })}
      onChange={handleTableChange}
    />
  );
};

export default AppsListTable;
