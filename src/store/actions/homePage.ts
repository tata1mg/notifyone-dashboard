import axios from 'axios';
import { toast } from 'react-toastify';

// import { COMMUNICATION_TYPE } from 'src/common/constants';
import AppConfig from 'src/common/appConfig';

import {
  FETCH_HOME_DATA_FAILURE,
  FETCH_HOME_DATA_REQUEST,
  FETCH_HOME_DATA_SUCCESS,
} from '../constants';

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
 * Method to fetch a home page data
 * @param
 */
export const fetchHomePageData = () => {
  return (dispatch: EmailDispatchType) => {
    dispatch(fetchHomePageRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/home`)
      .then((response: any) => {
        dispatch(fetchHomePageSuccess(response.data.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Email Event ${error?.response?.data?.error}`
        );
        dispatch(fetchHomePageFailure(error?.response?.data?.error));
      });
  };
};
