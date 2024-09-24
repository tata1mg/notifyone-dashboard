import axios from 'axios';
import { toast } from 'react-toastify';

// import { COMMUNICATION_TYPE } from 'src/common/constants';
import AppConfig from 'src/common/appConfig';

import {
  FETCH_HOME_DATA_FAILURE,
  FETCH_HOME_DATA_REQUEST,
  FETCH_HOME_DATA_SUCCESS,
  FETCH_PROVIDERS_LIST_REQUEST,
  FETCH_PROVIDERS_LIST_FAILURE,
  FETCH_PROVIDERS_LIST_SUCCESS,
  FETCH_ADD_PROVIDERS_LIST_SUCCESS,
  FETCH_ADD_PROVIDERS_LIST_REQUEST,
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
 * @public
 */
export const fetchProvidersListRequest = () => {
  return {
    type: FETCH_PROVIDERS_LIST_REQUEST,
  };
};

/**
 * @public
 */
export const fetchProvidersListSuccess = (data: any) => {
  return {
    type: FETCH_PROVIDERS_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchProvidersListFailure = (error: any) => {
  return {
    type: FETCH_PROVIDERS_LIST_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchAddProvidersListRequest = () => {
  return {
    type: FETCH_ADD_PROVIDERS_LIST_REQUEST,
  };
};

/**
 * @public
 */
export const fetchAddProvidersListSuccess = (data: any) => {
  return {
    type: FETCH_ADD_PROVIDERS_LIST_SUCCESS,
    payload: data,
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
        dispatch(fetchHomePageSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Email Event ${error?.response?.data?.error}`
        );
        dispatch(fetchHomePageFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch a home page data
 * @param
 */
export const fetchProvidersList = () => {
  return (dispatch: EmailDispatchType) => {
    dispatch(fetchProvidersListRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/providers/configured`)
      .then((response: any) => {
        dispatch(fetchProvidersListSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Email Event ${error?.response?.data?.error}`
        );
        dispatch(fetchProvidersListFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch a home page data
 * @param
 */
export const fetchAddProvidersList = () => {
  return (dispatch: EmailDispatchType) => {
    dispatch(fetchAddProvidersListRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/providers/list`)
      .then((response: any) => {
        dispatch(fetchAddProvidersListSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Email Event ${error?.response?.data?.error}`
        );
        dispatch(fetchProvidersListFailure(error?.response?.data?.error));
      });
  };
};
