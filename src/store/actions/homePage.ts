import axios from 'axios';
import { toast } from 'react-toastify';

// import { COMMUNICATION_TYPE } from 'src/common/constants';
// import AppConfig from 'src/common/appConfig';

import {
  FETCH_HOME_DATA_FAILURE,
  FETCH_HOME_DATA_REQUEST,
  FETCH_HOME_DATA_SUCCESS,
} from '../constants';
// import {
//   addToCurrentEvent,
//   removeToCurrentEvent,
//   switchCurrentEventLoading,
// } from './currentEvents';

/**
 * @public
 */
export const fetchHomePageRequest = () => {
  return {
    type: FETCH_HOME_DATA_REQUEST,
  };
};

/**
 * @public
 */
export const fetchHomePageSuccess = (data: any) => {
  return {
    type: FETCH_HOME_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchHomePageFailure = (error: any) => {
  return {
    type: FETCH_HOME_DATA_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch a single email event
 * @param
 */
export const fetchHomePageData = () => {
  return (dispatch: EmailDispatchType) => {
    dispatch(fetchHomePageRequest());
    axios
      .get(
        // `${AppConfig.serverDomain}${AppConfig.emailEventsUpdate}?id=${option}`
        'https://run.mocky.io/v3/d0e6f9ea-e6dd-48dd-b553-20690636711b'
      )
      .then((response: any) => {
        // const data = response?.data?.result?.templates;
        console.log('response -> ', response.data);
        dispatch(fetchHomePageSuccess(response.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Email Event ${error?.response?.data?.error}`
        );
        dispatch(fetchHomePageFailure(error?.response?.data?.error));
      });
  };
};
