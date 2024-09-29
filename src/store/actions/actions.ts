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
  FETCH_APPS_LIST_REQUEST,
  FETCH_APPS_LIST_FAILURE,
  FETCH_APPS_LIST_SUCCESS,
  FETCH_ACTIVITY_FEED_FAILURE,
  FETCH_ACTIVITY_FEED_REQUEST,
  FETCH_ACTIVITY_FEED_SUCCESS,
  FETCH_EDIT_APP_FORM_REQUEST,
  FETCH_EDIT_APP_FORM_FAILURE,
  FETCH_EDIT_APP_FORM_SUCCESS,
  FETCH_PRIORITY_LIST_REQUEST,
  FETCH_PRIORITY_LIST_SUCCESS,
  FETCH_PRIORITY_LIST_FAILURE,
  FETCH_DYNAMIC_PRIORITY_REQUEST,
  FETCH_DYNAMIC_PRIORITY_SUCCESS,
  FETCH_DYNAMIC_PRIORITY_FAILURE,
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
 * @public
 */
export const fetchAppsListRequest = () => {
  return {
    type: FETCH_APPS_LIST_REQUEST,
  };
};

/**
 * @public
 */
export const fetchAppsListSuccess = (data: any) => {
  return {
    type: FETCH_APPS_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchAppsListFailure = (error: any) => {
  return {
    type: FETCH_APPS_LIST_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchEditAppFormRequest = () => {
  return {
    type: FETCH_EDIT_APP_FORM_REQUEST,
  };
};

/**
 * @public
 */
export const fetchEditAppFormSuccess = (data: any) => {
  return {
    type: FETCH_EDIT_APP_FORM_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchEditAppFormFailure = (error: any) => {
  return {
    type: FETCH_EDIT_APP_FORM_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchActivityFeedRequest = () => {
  return {
    type: FETCH_ACTIVITY_FEED_REQUEST,
  };
};

/**
 * @public
 */
export const fetchActivityFeedSuccess = (data: any) => {
  return {
    type: FETCH_ACTIVITY_FEED_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchActivityFeedFailure = (error: any) => {
  return {
    type: FETCH_ACTIVITY_FEED_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchPriorityListRequest = () => {
  return {
    type: FETCH_PRIORITY_LIST_REQUEST,
  };
};

/**
 * @public
 */
export const fetchPriorityListSuccess = (data: any) => {
  return {
    type: FETCH_PRIORITY_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchPriorityListFailure = (error: any) => {
  return {
    type: FETCH_PRIORITY_LIST_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchDynamicPriorityRequest = () => {
  return {
    type: FETCH_DYNAMIC_PRIORITY_REQUEST,
  };
};

/**
 * @public
 */
export const fetchDynamicPrioritySuccess = (data: any) => {
  return {
    type: FETCH_DYNAMIC_PRIORITY_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchDynamicPriorityFailure = (error: any) => {
  return {
    type: FETCH_DYNAMIC_PRIORITY_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch home page data
 * @param
 */
export const fetchHomePageData = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchHomePageRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/home`)
      .then((response: any) => {
        dispatch(fetchHomePageSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Home page data ${error?.response?.data?.error}`
        );
        dispatch(fetchHomePageFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch data for table of providers configured
 * @param
 */
export const fetchProvidersList = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchProvidersListRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/providers/configured`)
      .then((response: any) => {
        dispatch(fetchProvidersListSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Providers ${error?.response?.data?.error}`
        );
        dispatch(fetchProvidersListFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch data to add new providers
 * @param
 */
export const fetchAddProvidersList = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchAddProvidersListRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/providers/list`)
      .then((response: any) => {
        dispatch(fetchAddProvidersListSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Providers ${error?.response?.data?.error}`
        );
        dispatch(fetchProvidersListFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch all apps list
 * @param
 */
export const fetchAppsList = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchAppsListRequest());
    axios
      .get(`${AppConfig.serverDomain}/apps`)
      .then((response: any) => {
        dispatch(fetchAppsListSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Apps list ${error?.response?.data?.error}`
        );
        dispatch(fetchAppsListFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch edit app form structure
 * @param
 */
export const fetchEditAppFormStructure = (id: string | number) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchEditAppFormRequest());
    axios
      .get(`${AppConfig.serverDomain}/form-structure/update-app/${id}`)
      .then((response: any) => {
        dispatch(fetchEditAppFormSuccess(response.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Apps list ${error?.response?.data?.error}`
        );
        dispatch(fetchEditAppFormFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch all apps list
 * @param
 */
export const fetchActivityFeed = ({
  number,
  requestId,
  email,
}: {
  number: number;
  requestId: string;
  email: string;
}) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchActivityFeedRequest());
    axios
      .get(
        // `${AppConfig.serverDomain}/dashboard/providers/list`
        'https://run.mocky.io/v3/074b655f-5b26-4252-8039-40107708d188',
        {
          params: {
            number,
            email,
            request_id: requestId,
          },
        }
      )
      .then((response: any) => {
        dispatch(fetchActivityFeedSuccess(response.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Activity feed ${error?.response?.data?.error}`
        );
        dispatch(fetchActivityFeedFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch providers list
 * @param
 */
export const fetchProvidersPriorityList = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchPriorityListRequest());
    axios
      .get(
        // `${AppConfig.serverDomain}/form-structure/update-app/${id}`
        'https://run.mocky.io/v3/b7f562f3-f9bf-455d-9f91-52786a334253'
      )
      .then((response: any) => {
        dispatch(fetchPriorityListSuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Providers list ${error?.response?.data?.error}`
        );
        dispatch(fetchProvidersListFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to set providers proirity
 * @param
 */
export const setProvidersPriority = ({ channel, providers_priority }) => {
  // return (dispatch: ActionDispatchType) => {
  //   axios
  //     .post(
  //       // `${AppConfig.serverDomain}/form-structure/update-app/${id}`
  //       'https://run.mocky.io/v3/b7f562f3-f9bf-455d-9f91-52786a334253',
  //       {
  //         channel,
  //         providers_priority,
  //       }
  //     )
  //     .then((response: any) => {
  //       dispatch(fetchPriorityListSuccess(response.data?.data));
  //     })
  //     .catch((error: any) => {
  //       toast.error(
  //         `Failed to fetch Providers list ${error?.response?.data?.error}`
  //       );
  //       dispatch(fetchProvidersListFailure(error?.response?.data?.error));
  //     });
  // };
  console.log(channel, providers_priority);
};

/**
 * Method to fetch providers list
 * @param
 */
export const fetchDynamicPriority = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchDynamicPriorityRequest());
    axios
      .get(
        // `${AppConfig.serverDomain}/form-structure/update-app/${id}`
        'https://run.mocky.io/v3/ab9fd915-f349-4253-a28d-3e82392cb91b'
      )
      .then((response: any) => {
        dispatch(fetchDynamicPrioritySuccess(response.data?.data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Providers list ${error?.response?.data?.error}`
        );
        dispatch(fetchDynamicPriorityFailure(error?.response?.data?.error));
      });
  };
};
