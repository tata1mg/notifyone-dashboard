import { Button, Form, Input, InputNumber, Segmented, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchActivityFeed } from 'src/store/actions/actions';
import ActivityFeedTable from './ActivityFeedTable';
const { Title } = Typography;

const ActivityFeed = () => {
  const dispatch = useDispatch();
  const [formType, setFormType] = useState('Email');
  const activityData = useSelector(
    (state: RootState) => state.reducer.activityData
  );

  const getInputForm = () => {
    switch (formType) {
      case 'Email':
        return (
          <div>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'string',
                  validator: (_: any, value: string) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!value)
                      return Promise.reject(new Error(`Email cannot be empty`));
                    if (!emailRegex.test(value)) {
                      return Promise.reject(
                        new Error(`Email is of not correct form`)
                      );
                    }
                    return Promise.resolve();
                  },
                  validateTrigger: 'onSubmit',
                },
              ]}
            >
              <Input placeholder="Enter email id" />
            </Form.Item>
          </div>
        );
      case 'Number':
        return (
          <div>
            <Form.Item
              label="Number"
              name="number"
              rules={[
                {
                  required: true,
                  type: 'number',
                  validator: (_: any, value: number) => {
                    if (value < 1000000000 || value > 9999999999) {
                      return Promise.reject(
                        new Error(`Phone number should be 10 digits`)
                      );
                    }
                    return Promise.resolve();
                  },
                  validateTrigger: 'onSubmit',
                },
              ]}
            >
              <InputNumber
                placeholder="Enter number"
                controls={false}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        );
      case 'Request Id':
        return (
          <div>
            <Form.Item
              label="Request ID"
              name="requestId"
              rules={[
                {
                  required: true,
                  type: 'string',
                },
              ]}
            >
              <Input placeholder="Enter request id" />
            </Form.Item>
          </div>
        );
      default:
        return <></>;
    }
  };

  console.log(activityData);
  return (
    <div className="content-wrapper">
      <Title level={4}>Activity Feed</Title>
      <Form
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        labelAlign="left"
        onFinish={(values: any) => {
          console.log(values);
          dispatch(
            fetchActivityFeed({
              requestId: values?.requestId,
              email: values?.email,
              number: values?.number,
            })
          );
        }}
      >
        <Form.Item label="Input Type" name="layout" initialValue="Email">
          <Segmented
            options={['Email', 'Number', 'Request Id']}
            onChange={(type: string) => setFormType(type)}
          />
        </Form.Item>
        {getInputForm()}
        <Form.Item label="">
          <Button htmlType="submit" size="small" style={{ width: 180 }}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
      <ActivityFeedTable notifications={activityData?.notifications} />
    </div>
  );
};

export default ActivityFeed;
