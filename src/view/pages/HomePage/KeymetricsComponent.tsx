import { Pie } from '@ant-design/plots';
import { Card, Col, Row, Tag } from 'antd';
import React from 'react';

const KeymetricsComponent = ({ keyMetrics }: { keyMetrics: any }) => {
  const { title = '', sub_title, metrics } = keyMetrics;
  const config = {
    data: [
      { type: 'Total Notifications', value: metrics.total_notifications },
      { type: 'Successful', value: metrics.success_rate },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    tooltip: false,
    legend: {
      color: {
        position: 'top',
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
  };
  return (
    <>
      <Card title={title} className="keyMetricsCard">
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
      <Pie {...config} />
    </>
  );
};

export default KeymetricsComponent;
