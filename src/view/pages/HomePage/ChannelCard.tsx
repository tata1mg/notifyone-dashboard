import { Button, Col, Flex, Row, Tag, Typography } from 'antd';
import {
  MailFilled,
  MessageFilled,
  MobileFilled,
  WechatFilled,
} from '@ant-design/icons';
import React from 'react';
import { ChannelType } from './HomePage';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const ChannelCard = ({ channel }: { channel: ChannelType }) => {
  const { title, sub_title, notifications, active } = channel;

  const getChannelIcon = (title: string) => {
    switch (title) {
      case 'Email':
        return <MailFilled style={{ fontSize: '18px' }} />;
      case 'Sms':
        return <MessageFilled style={{ fontSize: '18px' }} />;
      case 'Push':
        return <MobileFilled style={{ fontSize: '18px' }} />;
      case 'Whatsapp':
        return <WechatFilled style={{ fontSize: '24px' }} />;
      default:
        return null;
    }
  };

  return (
    <Flex gap="middle" className="channel-card">
      <div style={{ marginTop: 4 }}>{getChannelIcon(title)}</div>
      <Flex vertical gap="middle" className="channel-card-info">
        <Flex gap="large" align="start">
          <Title level={4}>{title}</Title>
          {active ? (
            <Tag style={{ marginTop: 4 }} color="success">
              Active
            </Tag>
          ) : (
            <Tag style={{ marginTop: 4 }} color="error">
              Inactive
            </Tag>
          )}
        </Flex>
        <Row>{sub_title}</Row>
        <Row>
          <Col span={24}>
            <Text italic>
              Notifications Sent: <Tag color="blue">{notifications?.sent}</Tag>
            </Text>
          </Col>
          <Col span={24}>
            <Text italic>
              Successful: <Tag color="green">{notifications?.success_rate}</Tag>
            </Text>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Link to="/providers">
              <Button
                size="large"
                className="channel-card-button"
                type="primary"
              >
                Change Provider
              </Button>
            </Link>
          </Col>
        </Row>
      </Flex>
    </Flex>
  );
};

export default ChannelCard;
