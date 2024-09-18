import { Card, Col, Row, Tag } from 'antd';
import React from 'react';

const KeymetricsCard = ({ keyMetrics }: { keyMetrics: any }) => {
  const { title, sub_title, metrics } = keyMetrics;
  return (
    <Card title={title} style={{ width: '80%' }}>
      <Row>{sub_title}</Row>
      <Row>
        <Col span={24}>
          Total Notifications:
          <Tag color="geekblue" bordered={false}>
            {metrics.total_notifications}
          </Tag>
        </Col>
        <Col span={24}>
          Success Rate:
          <Tag color="success" bordered={false}>
            {metrics.success_rate}
          </Tag>
        </Col>
        <Col span={24}>
          Latency:
          <Tag color="volcano" bordered={false}>
            {metrics.latency}
          </Tag>
        </Col>
      </Row>
    </Card>
  );
};

export default KeymetricsCard;
