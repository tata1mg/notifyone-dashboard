import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

import { COMMUNICATION_TYPE } from 'src/common/constants';

import CommunicationTemplate from '../CommunicationTemplate/CommunicationTemplate';
import { commonEventDetailType } from '../../components/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetchCurrentEmailEvent } from 'src/store/actions/emailEvents';
import { Spinner } from '../../components/Spinner';
import { fetchCurrentSmsEvent } from 'src/store/actions/smsEvents';
import { fetchCurrentPushEvent } from 'src/store/actions/pushNotificationEvents';
import { fetchCurrentWhatsappEvent } from 'src/store/actions/whatsappEvents';

const { Content } = Layout;

const Communication: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentEvent = useSelector(
    (state: RootState) => state.currentEvent.current_event
  );

  const currentEventLoading = useSelector(
    (state: RootState) => state.currentEvent.loading
  );

  const [eventDetails, setEventDetails] = useState<commonEventDetailType>({
    app_name: '',
    event_name: '',
    event_type: '',
    id: '',
    triggers_limit: '',
  });

  const shouldDisable = !!currentEvent;

  useEffect(() => {
    if (!currentEvent) {
      if (location.pathname.startsWith('/template/email/') && id) {
        dispatch(fetchCurrentEmailEvent(parseInt(id)));
      } else if (location.pathname.startsWith('/template/sms/') && id) {
        dispatch(fetchCurrentSmsEvent(parseInt(id)));
      } else if (location.pathname.startsWith('/template/transaction/') && id) {
        dispatch(fetchCurrentPushEvent(parseInt(id)));
      } else if (location.pathname.startsWith('/template/whatsapp/') && id) {
        dispatch(fetchCurrentWhatsappEvent(parseInt(id)));
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentEvent && currentEvent !== null) {
      const record: any = currentEvent;

      const eventProperties = {
        actions: record?.actions,
        app_name: record?.app_name,
        event_name: record?.event_name,
        event_type: record?.event_type,
        id: record?.id,
        triggers_limit: record?.triggers_limit,
        event_id: record?.event_id,
        data: record?.data,
      };

      if (record.event_type === COMMUNICATION_TYPE.SMS) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.content,
        });
      }

      if (
        record.event_type === COMMUNICATION_TYPE.Transactional_Push_notification
      ) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.body,
          image: record?.image,
          target: record?.target,
          title: record?.title,
          updated: record?.updated,
          updated_by: record?.updated_by,
        });
      }

      if (record.event_type == COMMUNICATION_TYPE.Whatsapp) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.name,
        });
      }

      if (record.event_type == COMMUNICATION_TYPE.Email) {
        return setEventDetails({
          ...eventProperties,
          event_text: record?.content,
          description: record?.description,
          includes: record?.includes,
          name: record?.name,
          subject: record?.subject,
          updated_by: record?.updated_by,
        });
      }
    }
  }, [currentEvent, currentEventLoading]);

  return (
    <Layout
      hasSider
      className="max-h-[calc(100vh-50px-50px)] overflow-y-scroll content-wrapper"
    >
      {currentEventLoading ? (
        <Spinner
          className="h-[calc(100vh-48px-50px)]"
          loading={currentEventLoading}
        />
      ) : (
        <Content>
          <CommunicationTemplate
            eventDetails={eventDetails}
            setEventDetails={setEventDetails}
            shouldDisable={shouldDisable}
          />
        </Content>
      )}
    </Layout>
  );
};

export default Communication;
