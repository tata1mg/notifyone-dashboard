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
  CREATE_APP_NAME_FAILURE,
  CREATE_APP_NAME_REQUEST,
  CREATE_APP_NAME_SUCCESS,
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
export const createAppNameRequest = () => {
  return {
    type: CREATE_APP_NAME_REQUEST,
  };
};
/**
 * @public
 */
export const createAppNameSuccess = (data: object[]) => {
  return {
    type: CREATE_APP_NAME_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const createAppNameFailure = (error: any) => {
  return {
    type: CREATE_APP_NAME_FAILURE,
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
 * @param {object} formData
 */
export const createNewEvent = (formData: object) => {
  return (dispatch: any) => {
    dispatch(createEventRequest());
    axios
      .post(`http://52.66.130.251:9815/form-structure/create-app`, {
        ...formData,
      })
      .then((response: any) => {
        const data = response;
        console.log('New event Creation API response -> ', response);
        dispatch(createEventSuccess(data));
        toast.success('New Event Creation Successful');
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
  console.log('fetchAppNameFormStructure');

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
 * @param {object} formData
 */
export const createAppName = (formData: object) => {
  return (dispatch: any) => {
    dispatch(createEventRequest());
    axios
      .post(`http://52.66.130.251:9815/form-structure/create-app`, {
        ...formData,
      })
      .then((response: any) => {
        const data = response;
        console.log('New event Creation API response -> ', response);
        dispatch(createEventSuccess(data));
        toast.success('New Event Creation Successful');
      })
      .catch((error: any) => {
        dispatch(createEventFailure(error?.response?.data?.error?.message));
        toast.error(
          `Failed to create a new event ${error?.response?.data?.error?.message}`
        );
      });
  };
};
