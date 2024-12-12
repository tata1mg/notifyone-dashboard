import axios from 'axios';
import { toast } from 'react-toastify';
import AppConfig from 'src/common/appConfig';
import {
  FETCH_CREATE_EVENT_FORM_STRUCTURE_REQUEST,
  FETCH_CREATE_EVENT_FORM_STRUCTURE_FAILURE,
  FETCH_CREATE_EVENT_FORM_STRUCTURE_SUCCESS,
  CREATE_NEW_EVENT_FAILURE,
  CREATE_NEW_EVENT_REQUEST,
  CREATE_NEW_EVENT_SUCCESS,
  CREATE_APP_FAILURE,
  CREATE_APP_REQUEST,
  CREATE_APP_SUCCESS,
} from '../constants';
/**
 * @public
 */
export const fetchFormStructureRequest = () => {
  return {
    type: FETCH_CREATE_EVENT_FORM_STRUCTURE_REQUEST,
  };
};
/**
 * @public
 */
export const fetchFormStructureSuccess = (data: object[]) => {
  return {
    type: FETCH_CREATE_EVENT_FORM_STRUCTURE_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const fetchFormStructureFailure = (error: any) => {
  return {
    type: FETCH_CREATE_EVENT_FORM_STRUCTURE_FAILURE,
    payload: error,
  };
};
/**
 * @public
 */
export const createEventRequest = () => {
  return {
    type: CREATE_NEW_EVENT_REQUEST,
  };
};
/**
 * @public
 */
export const createEventSuccess = (data: object[]) => {
  return {
    type: CREATE_NEW_EVENT_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const createEventFailure = (error: any) => {
  return {
    type: CREATE_NEW_EVENT_FAILURE,
    payload: error,
  };
};
/**
 * @public
 */
export const createAppRequest = () => {
  return {
    type: CREATE_APP_REQUEST,
  };
};
/**
 * @public
 */
export const createAppSuccess = (data: object[]) => {
  return {
    type: CREATE_APP_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const createAppFailure = (error: any) => {
  return {
    type: CREATE_APP_FAILURE,
    payload: error,
  };
};
/**
 * Method to fetch form structure for New event creation
 */
export const fetchCreateEventFormStructure = () => {
  return (dispatch: any) => {
    dispatch(fetchFormStructureRequest());
    axios
      .get(`${AppConfig.serverDomain}/form-structure/create-event`)
      .then((response: any) => {
        const data = response.data;
        dispatch(fetchFormStructureSuccess(data));
      })
      .catch((error: any) => {
        dispatch(
          fetchFormStructureFailure(error?.response?.data?.error?.message)
        );
        toast.error(
          `Failed to fetch form structure ${error?.response?.data?.error?.message}`
        );
      });
  };
};
/**
 * Method to create a new event using api call
 *  *  * @param {object} formData

 */
export const createNewEvent = (formData: object) => {
  return (dispatch: any) => {
    dispatch(createEventRequest());
    axios
      .post(`${AppConfig.serverDomain}/event/create`, {
        ...formData,
      })
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(createEventSuccess(data?.data));
          toast.success(data?.data?.message || 'New Event Creation Successful');
        }
      })
      .catch((error: any) => {
        dispatch(createEventFailure(error?.response?.data?.error?.message));
        toast.error(
          `Failed to create a new event ${error?.response?.data?.error?.message}`
        );
      });
  };
};
/**
 * Method to fetch form structure for App Name creation
 */
export const fetchAppNameFormStructure = () => {
  return (dispatch: any) => {
    dispatch(fetchFormStructureRequest());
    axios
      .get(`${AppConfig.serverDomain}/form-structure/create-app`)
      .then((response: any) => {
        const data = response.data;
        dispatch(fetchFormStructureSuccess(data));
      })
      .catch((error: any) => {
        dispatch(
          fetchFormStructureFailure(error?.response?.data?.error?.message)
        );
        toast.error(
          `Failed to fetch form structure ${error?.response?.data?.error?.message}`
        );
      });
  };
};
/**
 * Method to create a new event using api call
 *  * @param {object} formData

 */
export const createApp = (formData: object, navigate: any) => {
  return (dispatch: any) => {
    dispatch(createAppRequest());
    axios
      .post(`${AppConfig.serverDomain}/apps`, {
        ...formData,
      })
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(createAppSuccess(data?.data));
          toast.success(data?.data?.message || 'New App Created');
          navigate('/apps');
        }
      })
      .catch((error: any) => {
        dispatch(createAppFailure(error?.response?.data?.error?.message));
        toast.error(
          `Failed to create a new event ${error?.response?.data?.error?.message}`
        );
      });
  };
};
