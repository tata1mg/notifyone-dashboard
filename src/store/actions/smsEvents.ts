import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';

import {
  FETCH_SMS_EVENTS_REQUEST,
  FETCH_SMS_EVENTS_SUCCESS,
  FETCH_SMS_EVENTS_FAILURE,
  UPDATE_SMS_EVENTS_REQUEST,
  UPDATE_SMS_EVENTS_SUCCESS,
  UPDATE_SMS_EVENTS_FAILURE,
  FETCH_SMS_TEMPLATES_SUCCESS,
  FETCH_SMS_TEMPLATES_FAILURE,
  PREVIEW_SMS_EVENTS_REQUEST,
  PREVIEW_SMS_EVENTS_SUCCESS,
  PREVIEW_SMS_EVENTS_FAILURE,
} from '../constants';

import {
  addToCurrentEvent,
  removeToCurrentEvent,
  switchCurrentEventLoading,
} from './currentEvents';
import { COMMUNICATION_TYPE } from 'src/common/constants';
import { useNavigate } from 'react-router-dom';

const dat = {
  data: {
    sms: [
      {
        event_name: 'patient_ekyc_journey',
        actions: 1,
        app_name: 'psp',
        triggers_limit: 1,
        id: 348,
        content:
          'Hi {{name}}, Tata1Mg invites you to perform KYC: Click on the link below: {{url}}. Kindly open the above link in Google Chrome for the best experience.',
        event_id: 849,
        data: {},
      },
      {
        event_name: 'retail_invoice_sent_via_sms',
        actions: 1,
        app_name: 'COT',
        triggers_limit: 1,
        id: 347,
        content:
          'Dear customer, Thank you for choosing us for your needs. Please find your invoice at the following link - (invoice no.- {{invoice_number}}) - __URL_SHORTNER_START__{{invoice_link}}__URL_SHORTNER_END__. Please help us improve by submitting your feedback on the following link - {{feedback_link}} - Team Tata 1mg',
        event_id: 842,
        data: {},
      },
      {
        event_name: 'invoice_sent_via_sms',
        actions: 1,
        app_name: 'COT',
        triggers_limit: 1,
        id: 337,
        content:
          'Dear customer, Thank you for choosing us for your needs. Please find your invoice at the following link - (invoice no.- {{invoice_number}}) - __URL_SHORTNER_START__{{invoice_link}}__URL_SHORTNER_END__. Please help us improve by submitting your feedback on the following link - {{feedback_link}} - Team Tata 1mg',
        event_id: 841,
        data: {},
      },
      {
        event_name: 'lab_api_order_report_delayed',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 346,
        content:
          'Dear Customer, we are experiencing delay in sending your report for Health check-up with Order ID {{order_id}}. Our team is continuously working with the respective lab to get your report ready and will get back with an update within 24 hours. Team Tata 1MG.',
        event_id: 838,
        data: {},
      },
      {
        event_name: 'lab_api_order_unattended_cancellation',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 343,
        content:
          'Dear Customer, On behalf of Niva Bupa, this is to inform you that your request for the Health check-up was placed on {{booked_date}}Since you have not availed the check-up, we are cancelling the appointment. To re-book, please log-in to Niva Bupa health app.Team Tata 1MG',
        event_id: 837,
        data: {},
      },
      {
        event_name: 'lab_api_order_cancelled',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 342,
        content:
          'Dear Customer, on behalf of Niva Bupa, we confirm that your Appointment with Order ID {{order_id}} has been cancelled. To re-book, please log-in to Niva Bupa health app.\n\nTeam Tata 1MG',
        event_id: 835,
        data: {},
      },
      {
        event_name: 'lab_api_order_rescheduled',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 344,
        content:
          'Dear Customer, on behalf of Niva Bupa, we confirm that your Health check-up with Order ID {{order_id}} has been rescheduled. Revised details are shared below-\nDate and time - {{date}} and {{time}}\n\nFor any assistance, contact {{contact_1mg}}\nTeam Tata 1MG',
        event_id: 834,
        data: {},
      },
      {
        event_name: 'lab_api_report_upload',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 345,
        content:
          'Dear Customer,                              \nOn behalf of Niva Bupa, we would like to inform you that you can now view report of your recent Health check-up against Order ID {{order_id}} by clicking {{report_url}}. Alternatively, you can also access your report from the Niva Bupa Health app. \n\nTeam Tata 1MG.',
        event_id: 833,
        data: {},
      },
      {
        event_name: 'lab_api_center_sample_collected',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 339,
        content:
          'Dear Customer, on behalf of Niva Bupa, thank you for completing the Health check-up. Test samples have been collected today for Order ID {{order_id}}. The test reports will be shared via SMS within 72 hours. Request your corporation and do not visit the center.Team Tata 1MG',
        event_id: 832,
        data: {},
      },
      {
        event_name: 'lab_api_home_sample_collected',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 338,
        content:
          'Dear Customer, on behalf of Niva Bupa, we thank you for completing the Health check-up. Test samples have been collected today for Order ID {{order_id}}. The test reports will be shared via SMS within 72 hours.Team Tata 1MG',
        event_id: 831,
        data: {},
      },
      {
        event_name: 'lab_api_center_order_confirmed',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 341,
        content:
          'Dear Customer, On behalf of Niva Bupa, we confirm that your appointment for Health check-up is scheduled for Centre visit on {{date}} at {{time}} at {{provider_name}}, Address: {{provider_address}}. In case of any query, contact us on 18002124636.\n\nTeam Tata 1MG.',
        event_id: 830,
        data: {},
      },
      {
        event_name: 'lab_api_home_order_confirmed',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 340,
        content:
          'Dear Customer, on behalf of Niva Bupa, we confirm that your appointment for Health check-up has been scheduled on {{date}} at {{time}}.The phlebotomist will visit your residence between appointment hours for the sample collection. In case of any query, contact us on 18002124636. Team Tata 1MG',
        event_id: 829,
        data: {},
      },
      {
        event_name: 'lab_api_order_booked',
        actions: 1,
        app_name: 'merchant_aggregator',
        triggers_limit: -1,
        id: 334,
        content:
          'Dear Customer, on behalf of {{display_name}}, your request for health check-up with Order ID {{order_id}} has been placed. Confirmation on your booking preference will be shared with you within 24 hours. \n\nTeam TATA 1MG.',
        event_id: 827,
        data: {},
      },
      {
        event_name: 'pfizer_physical_verification_otp',
        actions: 1,
        app_name: 'psp',
        triggers_limit: 1,
        id: 333,
        content:
          'Dear {{name}}, Your OTP for Healthcare support services Pfizer application, an initiative by Pfizer is {{otp}}. OTP is valid for {{otp_validity}} mins. Please do not share OTP with anyone. Best regards, 1MG',
        event_id: 822,
        data: {},
      },
      {
        event_name: 'EventsTestings',
        actions: 1,
        app_name: 'testApp',
        triggers_limit: 1,
        id: 799,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 744,
        data: {
          order: {
            name: 'mamalin sahoo',
            group_id: '744',
          },
        },
      },
      {
        event_name: 'EventsTesting',
        actions: 1,
        app_name: 'testApp',
        triggers_limit: 1,
        id: 798,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 743,
        data: {
          order: {
            name: 'mamalin',
            group_id: '743',
          },
        },
      },
      {
        event_name: 'ldp_testt',
        actions: 1,
        app_name: 'ldp_n_testt',
        triggers_limit: -1,
        id: 797,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 742,
        data: {
          order: {
            name: 'm. sahoo',
            group_id: '742',
          },
        },
      },
      {
        event_name: 'final_test_abcdefff',
        actions: 1,
        app_name: 'final_test_abcdefff',
        triggers_limit: 1,
        id: 796,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 741,
        data: {
          order: {
            name: 'mamalin',
            group_id: '741',
          },
        },
      },
      {
        event_name: 'final_test_abcdeff',
        actions: 1,
        app_name: 'final_test_abcdeff',
        triggers_limit: 1,
        id: 795,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 740,
        data: {
          order: {
            name: 'mamalisahoo',
            group_id: '740',
          },
        },
      },
      {
        event_name: 'final_test_abcdef',
        actions: 1,
        app_name: 'final_test_abcdef',
        triggers_limit: 35,
        id: 794,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 739,
        data: {
          order: {
            name: 'mama',
            group_id: 61,
          },
        },
      },
      {
        event_name: 'final_test_abcde',
        actions: 1,
        app_name: 'final_test_abcde',
        triggers_limit: 1,
        id: 793,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 738,
        data: {
          order: {
            name: 'mamali',
            group_id: '738',
          },
        },
      },
      {
        event_name: 'final_testttt',
        actions: 1,
        app_name: 'final_testttt',
        triggers_limit: -1,
        id: 792,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 737,
        data: {
          order: {
            name: 'guddy',
            group_id: '737',
          },
        },
      },
      {
        event_name: 'final_testtt',
        actions: 0,
        app_name: 'final_testtt',
        triggers_limit: 1,
        id: 791,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 736,
        data: {
          order: {
            name: 'gud',
            group_id: '736',
          },
        },
      },
      {
        event_name: 'final_test_abcd',
        actions: 1,
        app_name: 'final_test_abcd',
        triggers_limit: 1,
        id: 490,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 734,
        data: {
          order: {
            name: 'lara service',
            group_id: 734,
          },
        },
      },
      {
        event_name: 'final_test_abc',
        actions: 1,
        app_name: 'final_test_abc',
        triggers_limit: 1,
        id: 489,
        content:
          'Dear customer. Tracking link- __URL_SHORTNER_START__{{order.group_id}}__URL_SHORTNER_END__ Your delivery confirmation code is {{order.name}}',
        event_id: 733,
        data: {
          order: {
            name: 'little',
            group_id: 733,
          },
        },
      },
    ],
    start: '0',
    size: '25',
  },
  is_success: true,
  status_code: 200,
};

/**
 * @public
 */
export const fetchSMSEventsRequest = () => {
  return {
    type: FETCH_SMS_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const fetchSMSEventsSuccess = (events: any) => {
  return {
    type: FETCH_SMS_EVENTS_SUCCESS,
    payload: events,
  };
};

/**
 * @public
 */
export const fetchSMSEventsFailure = (error: any) => {
  return {
    type: FETCH_SMS_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchSmsTemplatesSuccess = (data: object[]) => {
  return {
    type: FETCH_SMS_TEMPLATES_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const fetchSmsTemplatesFailure = (error: any) => {
  return {
    type: FETCH_SMS_TEMPLATES_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const previewSmsEventsRequest = () => {
  return {
    type: PREVIEW_SMS_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const previewSmsEventsSuccess = (previews: any) => {
  return {
    type: PREVIEW_SMS_EVENTS_SUCCESS,
    payload: previews,
  };
};

/**
 * @public
 */
export const previewSmsEventsFailure = (error: any) => {
  return {
    type: PREVIEW_SMS_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const updateSMSEventRequest = () => {
  return {
    type: UPDATE_SMS_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const updateSMSEventSuccess = (success: boolean) => {
  return {
    type: UPDATE_SMS_EVENTS_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const updateSMSEventFailure = (error: any) => {
  return {
    type: UPDATE_SMS_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch all event templates (IDs and Name Only)
 * @param  {string} accessToken
 * @param  {string} event_type: 'sms' Email Event Details
 */
export const fetchSmsEventDetails = (
  accessToken: string,
  event_type: 'sms'
) => {
  return (dispatch: EmailDispatchType) => {
    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/events?channel=${event_type}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX3Rva2VuIjoiNzA4MzliM2MtZDI3Ny00ZWE4LWJkZDMtZDMzOGZkYjFiMTkzIiwidG9rZW5fZXhwaXJ5IjoiMTBoIiwiaWF0IjoxNzEwMzEzNDUxLCJleHAiOjE3MTAzNDk0NTF9.Ret7GTS29ehZe2dv3ApI2ujg1uF1B82LCdvz_EQ1XVc`,
          },
        }
      )
      .then((response: any) => {
        const data = response?.data?.data?.sms;
        dispatch(fetchSmsTemplatesSuccess(data));
      })
      .catch((error: any) => {
        dispatch(switchCurrentEventLoading(false));
        toast.error(
          `Fetching All SMS Templates Failed ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchSmsTemplatesFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to fetch SMS Events from Node API
 * (Currently fetches in chunks of 50)
 * @param  {string} accessToken AccessToken for user
 * @param  {number} currentPageSize Current page size of existing events fetched
 * @param  {number} templatesSize template size to be fetched
 */
export const fetchSmsEvents = (
  accessToken: string,
  currentPageSize: number,
  templatesSize: number
) => {
  return (dispatch: SMSEventDispatchType) => {
    dispatch(fetchSMSEventsRequest());

    axios
      .get(
        `${AppConfig.serverDomain}/events?channel=sms&size=${currentPageSize}&start=${templatesSize}`
      )
      .then((response: any) => {
        const data = response?.data?.data?.sms;
        dispatch(fetchSMSEventsSuccess(data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Sms Events ${error?.response?.data?.error?.message}`
        );
        dispatch(fetchSMSEventsFailure(error?.response?.data?.error?.message));
      });
  };
};

/**
 * Method to update SMS event
 * @param  {SMSEventDispatchType} eventDetails Simple SMS details that needs to update
 * @param  {string} accessToken AccessToken for user
 */
export const updateSmsEvent = (
  eventDetails: MSMSTemplate,
  accessToken: { auth_token: string },
  data: any,
  redirect: string,
  navigate: any
) => {
  return (dispatch: SMSEventDispatchType) => {
    dispatch(updateSMSEventRequest());
    axios
      .put(
        `${AppConfig.serverDomain}notification_core/v4/sms/template`,
        {
          id: eventDetails.id,
          app_name: eventDetails.app_name,
          event_name: eventDetails.event_name,
          trigger_limit: eventDetails.triggers_limit,
          content: eventDetails.event_text,
          event_id: eventDetails.event_id,
          data,
        },
        {
          headers: {
            Authorization: accessToken.auth_token,
          },
        }
      )
      .then((response: any) => {
        toast.success('Sms Event Updated');
        const success = response.success;
        dispatch(updateSMSEventSuccess(success));
        dispatch(removeToCurrentEvent());
        navigate(`/templates${redirect}`);
      })
      .catch((error: any) => {
        toast.error(
          `Sms Event Update Failed ${error.response?.data?.error?.message}`
        );
        dispatch(updateSMSEventFailure(error.response?.data?.error?.message));
      });
  };
};

/**
 * Method to fetch current email event
 * @param  {string} accessToken
 * @param  {number} id Email Id
 */
export const fetchCurrentSmsEvent = (accessToken: string, id: number) => {
  return (dispatch: SMSEventDispatchType) => {
    dispatch(switchCurrentEventLoading(true));
    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/event/${id}?channel=sms`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response.data.data.sms;
        dispatch(
          addToCurrentEvent({ ...data, event_type: COMMUNICATION_TYPE.SMS })
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
 * @param  {any} eventDetails Email Event Details
 * @param  {string} accessToken
 */
export const previewSmsEvent = (
  eventDetails: any,
  accessToken: { auth_token: string },
  data: any
) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(previewSmsEventsRequest());
    axios
      .post(
        `${AppConfig.serverDomain}notification_core/v4/sms/template/preview`,
        {
          content: eventDetails.event_text,
          event_name: eventDetails.event_name,
          data,
        },
        {
          headers: {
            Authorization: accessToken.auth_token,
          },
        }
      )
      .then((response: any) => {
        const previews = response.data?.data;
        dispatch(previewSmsEventsSuccess(previews));
      })
      .catch((error: any) => {
        toast.error(
          `${error?.response?.data?.error?.message || 'Error in preview'}`
        );
        dispatch(
          previewSmsEventsFailure(
            error?.response?.data?.error?.message || 'Error'
          )
        );
      });
  };
};
