import React, { useEffect } from 'react';
import ChannelCard from './ChannelCard';
import { Col, Collapse, Flex, Row, Typography } from 'antd';
import type { CollapseProps } from 'antd';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePageData } from 'src/store/actions/homePage';
import { Spinner } from 'src/view/components/Spinner';
import KeymetricsComponent from './KeymetricsComponent';
import './homepage.css';
import ChannelQueuesTable from './ChannelQueuesTable';
import ComponentsTable from './ComponentsTable';
import PriorityQueuesTable from './PriorityQueuesTable';

export interface ChannelType {
  active: boolean;
  notifications: object;
  sub_title: string;
  title: string;
}

const { Title } = Typography;

const HomePage = () => {
  const dispatch = useDispatch();
  const homePageData = useSelector((state: RootState) => state.homePage.data);
  const homePageLoading = useSelector(
    (state: RootState) => state.homePage.loading
  );

  useEffect(() => {
    dispatch(fetchHomePageData());
  }, []);

  // const { channels, key_metrics, real_time_status } = homePageData;
  const getCollapseItems = (): CollapseProps['items'] => {
    return [
      {
        key: 1,
        label: <Title level={5}>Channel Queues</Title>,
        children: (
          <>
            <ChannelQueuesTable
              channelQueues={
                homePageData?.real_time_status?.system_health?.channel_queues
              }
            />
          </>
        ),
      },
      {
        key: 2,
        label: <Title level={5}>Components</Title>,
        children: (
          <ComponentsTable
            components={
              homePageData?.real_time_status?.system_health?.components
            }
          />
        ),
      },
      {
        key: 3,
        label: <Title level={5}>Priority Queues</Title>,
        children: (
          <PriorityQueuesTable
            priorityQueues={
              homePageData?.real_time_status?.system_health?.priority_queues
            }
          />
        ),
      },
    ];
  };

  return (
    <>
      {homePageLoading ? (
        <Spinner
          className="h-[calc(100vh-48px-50px)]"
          loading={homePageLoading}
        />
      ) : (
        <div className="content-wrapper">
          {homePageData && (
            <div>
              <Flex style={{ height: '100%' }}>
                <div className="leftPanel">
                  {homePageData && (
                    <KeymetricsComponent
                      keyMetrics={homePageData?.key_metrics}
                    />
                  )}
                </div>
                <Row className="rightPanel">
                  {homePageData?.channels?.map(
                    (channel: ChannelType, index: number) => {
                      return (
                        <Col key={index} md={24} lg={12}>
                          <ChannelCard channel={channel}></ChannelCard>
                        </Col>
                      );
                    }
                  )}
                </Row>
              </Flex>
              <Row>
                <Col span={24}>
                  <Title level={3}>System Health</Title>
                </Col>
                <Collapse
                  ghost
                  style={{ width: '100%' }}
                  items={getCollapseItems()}
                  bordered={false}
                />
              </Row>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
