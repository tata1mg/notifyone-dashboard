import React, { useEffect } from 'react';
import ChannelCard from './ChannelCard';
import { Col, Flex, Row } from 'antd';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePageData } from 'src/store/actions/homePage';
import { Spinner } from 'src/view/components/Spinner';
import KeymetricsCard from './KeymetricsCard';
import './homepage.css';

export interface ChannelType {
  active: boolean;
  notifications: object;
  sub_title: string;
  title: string;
}

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

  return (
    <>
      {homePageLoading ? (
        <Spinner
          className="h-[calc(100vh-48px-50px)]"
          loading={homePageLoading}
        />
      ) : (
        <Flex className="content-wrapper" align="center">
          <div className="leftPanel">
            {homePageData && (
              <KeymetricsCard keyMetrics={homePageData?.key_metrics} />
            )}
          </div>
          <Row className="rightPanel" justify="end" align="bottom">
            {homePageData?.channels?.map(
              (channel: ChannelType, index: number) => {
                return (
                  <Col key={index} span={12}>
                    <ChannelCard channel={channel}></ChannelCard>
                  </Col>
                );
              }
            )}
          </Row>
        </Flex>
      )}
    </>
  );
};

export default HomePage;
