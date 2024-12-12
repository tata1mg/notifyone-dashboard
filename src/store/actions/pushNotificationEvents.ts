import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';

import {
  FETCH_PUSH_NOTIFICATION_EVENTS_REQUEST,
  FETCH_PUSH_NOTIFICATION_EVENTS_SUCCESS,
  FETCH_PUSH_NOTIFICATION_EVENTS_FAILURE,
  UPDATE_PUSH_NOTIFICATION_EVENTS_REQUEST,
  UPDATE_PUSH_NOTIFICATION_EVENTS_SUCCESS,
  UPDATE_PUSH_NOTIFICATION_EVENTS_FAILURE,
  FETCH_PUSH_NOTIFICATION_TEMPLATES_SUCCESS,
  FETCH_PUSH_NOTIFICATION_TEMPLATES_FAILURE,
  PREVIEW_PUSH_NOTIFICATION_EVENTS_REQUEST,
  PREVIEW_PUSH_NOTIFICATION_EVENTS_SUCCESS,
  PREVIEW_PUSH_NOTIFICATION_EVENTS_FAILURE,
} from '../constants';
import {
  addToCurrentEvent,
  removeToCurrentEvent,
  switchCurrentEventLoading,
} from './currentEvents';
import { COMMUNICATION_TYPE } from 'src/common/constants';

/**
 * @public
 */
export const fetchPushNotificationEventsRequest = () => {
  return {
    type: FETCH_PUSH_NOTIFICATION_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const fetchPushNotificationTemplatesSuccess = (data: object[]) => {
  return {
    type: FETCH_PUSH_NOTIFICATION_TEMPLATES_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const fetchPushNotificationTemplatesFailure = (error: any) => {
  return {
    type: FETCH_PUSH_NOTIFICATION_TEMPLATES_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchPushNotificationEventsSuccess = (events: any) => {
  return {
    type: FETCH_PUSH_NOTIFICATION_EVENTS_SUCCESS,
    payload: events,
  };
};

/**
 * @public
 */
export const fetchPushNotificationEventsFailure = (error: any) => {
  return {
    type: FETCH_PUSH_NOTIFICATION_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const previewPushNotificationEventsRequest = () => {
  return {
    type: PREVIEW_PUSH_NOTIFICATION_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const previewPushNotificationEventsSuccess = (previews: any) => {
  return {
    type: PREVIEW_PUSH_NOTIFICATION_EVENTS_SUCCESS,
    payload: previews,
  };
};

/**
 * @public
 */
export const previewPushNotificationEventsFailure = (error: any) => {
  return {
    type: PREVIEW_PUSH_NOTIFICATION_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const updatePushNotificationEventsRequest = () => {
  return {
    type: UPDATE_PUSH_NOTIFICATION_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const updatePushNotificationEventsSuccess = (success: boolean) => {
  return {
    type: UPDATE_PUSH_NOTIFICATION_EVENTS_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const updatePushNotificationEventsFailure = (error: any) => {
  return {
    type: UPDATE_PUSH_NOTIFICATION_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch all event templates (IDs and Name Only)
 * @param  {string} event_type: 'transaction' Email Event Details
 */
export const fetchPushNotificationEventDetails = (event_type: 'push') => {
  return (dispatch: EmailDispatchType) => {
    axios
      .get(`${AppConfig.serverDomain}/events?channel=${event_type}`)
      .then((response: any) => {
        const data = response?.data?.data?.push;
        dispatch(fetchPushNotificationTemplatesSuccess(data));
      })
      .catch((error: any) => {
        dispatch(switchCurrentEventLoading(false));
        toast.error(
          `Fetching All Transaction Templates Failed ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchPushNotificationTemplatesFailure(
            error?.response?.data?.error?.message
          )
        );
      });
  };
};

/**
 * Method to fetch Push Notification Events from Node
 * @param  {number} currentPageSize Current page for notification events fetched
 * @param  {number} templatesSize templatesize for further or reduced the chunk size
 */
export const fetchPushNotificationEvents = (
  currentPageSize: number,
  templatesSize: number
) => {
  return (dispatch: PushEventDispatchType) => {
    dispatch(fetchPushNotificationEventsRequest());
    axios
      .get(
        `${AppConfig.serverDomain}/events?channel=push&size=${currentPageSize}&start=${templatesSize}`
      )
      .then((response: any) => {
        const data = response?.data?.data?.push;
        dispatch(fetchPushNotificationEventsSuccess(data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Push Notification Events, ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchPushNotificationEventsFailure(
            error?.response?.data?.error?.message
          )
        );
      });
  };
};
/**
 * Method to update a single push notification event template
 * @param  {MPushEventTemplate} eventDetails Single Push Notification event to be updated
 */
export const updatePushNotificationEvent = (
  eventDetails: MPushEventTemplate,
  data: any,
  redirect: string,
  navigate: any
) => {
  return (dispatch: PushEventDispatchType) => {
    dispatch(updatePushNotificationEventsRequest());

    axios
      .put(`${AppConfig.serverDomain}/push/template`, {
        app_name: eventDetails.app_name,
        body: eventDetails.event_text,
        event_name: eventDetails.event_name,
        id: eventDetails.id,
        image: eventDetails.image,
        target: eventDetails.target,
        title: eventDetails.title,
        triggers_limit: eventDetails.triggers_limit,
        event_id: eventDetails.event_id,
        data,
      })
      .then((response: any) => {
        toast.success('Push Notification Event Updated');
        const success = response.success;
        dispatch(updatePushNotificationEventsSuccess(success));
        dispatch(removeToCurrentEvent());
        navigate(`/templates${redirect}`);
      })
      .catch((error: any) => {
        toast.error(
          `Push Notification Event Update Failed, ${error.response?.data?.error?.message}`
        );
        dispatch(
          updatePushNotificationEventsFailure(
            error.response?.data?.error?.message
          )
        );
      });
  };
};

/**
 * Method to fetch current email event
 * @param  {number} id Email Id
 */
export const fetchCurrentPushEvent = (id: number) => {
  return (dispatch: PushEventDispatchType) => {
    dispatch(switchCurrentEventLoading(true));
    axios
      .get(`${AppConfig.serverDomain}/event/${id}?channel=push`)
      .then((response: any) => {
        const data = response.data.data.push;
        dispatch(
          addToCurrentEvent({
            ...data,
            event_type: COMMUNICATION_TYPE.Transactional_Push_notification,
          })
        );
        dispatch(switchCurrentEventLoading(false));
      })
      .catch((error: any) => {
        dispatch(addToCurrentEvent(null));
        dispatch(switchCurrentEventLoading(false));
        toast.error(
          `Failed to fetch template for this ID ${error?.response?.data?.error?.message}`
        );
      });
  };
};

/**
 * Method invoked when previewing a singular email event
 * @param  {any} eventDetails Email Event Details */
export const previewPushNotificationEvent = (eventDetails: any, data: any) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(previewPushNotificationEventsRequest());
    axios
      .post(`${AppConfig.serverDomain}/push/template/preview`, {
        body: eventDetails.event_text,
        event_id: eventDetails.event_id,
        title: eventDetails.title,
        data,
      })
      .then((response: any) => {
        const previews = response.data?.data;
        dispatch(previewPushNotificationEventsSuccess(previews));
      })
      .catch((error: any) => {
        toast.error(
          `${error?.response?.data?.error?.message || 'Error in preview'}`
        );
        dispatch(
          previewPushNotificationEventsFailure(
            error?.response?.data?.error?.message || 'Error'
          )
        );
      });
  };
};
