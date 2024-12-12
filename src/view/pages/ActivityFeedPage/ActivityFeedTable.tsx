import React, { useEffect, useState } from 'react';
import { Table, TablePaginationConfig, Tag } from 'antd';
import { getTagColor } from 'src/common/utils';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_PAGINATION } from 'src/common/constants';
import { fetchActivityFeed } from 'src/store/actions/actions';

const ActivityFeedTable = ({ formValues }: { formValues: any }) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<object[]>([]);
  const [pagination, setPagination] = useState({
    current: DEFAULT_PAGINATION.currentPage,
    pageSize: DEFAULT_PAGINATION.pageSize,
    total: DEFAULT_PAGINATION.pageSize,
  });
  const loading = useSelector((state: RootState) => state.reducer.loading);
  const activityData = useSelector(
    (state: RootState) => state.reducer.activityData
  );

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);
    fetchApiData(formValues, pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: 'Event Id',
      dataIndex: 'event_id',
      key: 'event_id',
      width: 100,
    },
    {
      title: 'Request Id',
      dataIndex: 'notification_request_id',
      key: 'notification_request_id',
      width: 180,
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
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
      title: 'Sent To',
      dataIndex: 'sent_to',
      key: 'sent_to',
    },
  ];

  const fetchApiData = (
    formValues: any,
    currentPage: number,
    pageSize: number
  ) => {
    dispatch(
      fetchActivityFeed({
        requestId: formValues?.requestId,
        email: formValues?.email,
        number: formValues?.number,
        currentPage,
        pageSize,
      })
    );
  };

  useEffect(() => {
    if (Object.keys(formValues).length) {
      fetchApiData(formValues, pagination.current, pagination.pageSize);
    }
  }, [formValues]);

  useEffect(() => {
    if (activityData?.notifications?.length) {
      setTableData(activityData?.notifications);
      setPagination({
        current: activityData.offset / pagination.pageSize + 1,
        pageSize: pagination.pageSize,
        total: activityData.total || pagination.total,
      });
    } else {
      setTableData([]);
    }
  }, [activityData]);

  console.log(pagination);

  return (
    <>
      <Table
        loading={loading}
        dataSource={tableData}
        columns={columns}
        pagination={{
          ...pagination,
        }}
        scroll={{ x: '150%' }}
        onChange={handleTableChange}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};

export default ActivityFeedTable;
