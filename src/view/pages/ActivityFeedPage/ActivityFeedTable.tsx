import React, { useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Tag } from 'antd';
import { getTagColor } from 'src/common/utils';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { fetchAppsList } from 'src/store/actions/actions';
// import { getTagColor } from 'src/common/utils/index';
// import { render } from '@testing-library/react';

const ActivityFeedTable = ({ notifications }: { notifications: object[] }) => {
  //   const dispatch = useDispatch();
  const [tableData, setTableData] = useState<object[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 5,
  });
  const loading = useSelector((state: RootState) => state.reducer.loading);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);
    // dispatch(fetchAppsList());
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'notification_request_id',
      key: 'notification_request_id',
      width: 180,
    },
    {
      title: 'App Name',
      dataIndex: 'app_name',
      key: 'app_name',
    },
    {
      title: 'Event Name',
      dataIndex: 'event_name',
      key: 'event_name',
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
      title: 'Sent To',
      dataIndex: 'sent_to',
      key: 'sent_to',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => {
        return <Tag color={getTagColor(value)}>{value}</Tag>;
      },
    },
    {
      title: 'Source Identifier',
      dataIndex: 'source_identifier',
      key: 'source_identifier',
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Operator Event Id',
      dataIndex: 'operator_event_id',
      key: 'operator_event_id',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Sent At',
      dataIndex: 'sent_at',
      key: 'sent_at',
    },
  ];

  useEffect(() => {
    if (notifications?.length) {
      setTableData(notifications);
    } else {
      setTableData([]);
    }
  }, [notifications]);

  return (
    <Table
      loading={loading}
      dataSource={tableData}
      columns={columns}
      pagination={pagination}
      scroll={{ x: '150%' }}
      onChange={handleTableChange}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default ActivityFeedTable;
