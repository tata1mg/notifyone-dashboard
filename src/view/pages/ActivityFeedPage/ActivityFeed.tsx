import { Button, Form, Input, InputNumber, Segmented, Typography } from 'antd';
import React, { useState } from 'react';
import ActivityFeedTable from './ActivityFeedTable';
const { Title } = Typography;

const ActivityFeed = () => {
  const [formType, setFormType] = useState('Email');
  const [formValues, setFormValues] = useState({});
  const [form] = Form.useForm();

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
                    if (!value)
                      return Promise.reject(
                        new Error(`Number cannot be empty`)
                      );
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
          if (Object.keys(values).length) {
            setFormValues(values);
          }
        }}
        form={form}
      >
        <Form.Item label="Input Type" name="layout" initialValue="Email">
          <Segmented
            options={['Email', 'Number', 'Request Id']}
            onChange={(type: string) => {
              setFormType(type);
              form.setFieldsValue({
                email: null,
                number: null,
                requestId: null,
              });
            }}
          />
        </Form.Item>
        {getInputForm()}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" size="small" style={{ width: 180 }}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
      <ActivityFeedTable formValues={formValues} />
    </div>
  );
};

export default ActivityFeed;
