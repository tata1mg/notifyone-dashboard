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
  FETCH_DEFAULT_PRIORITY_REQUEST,
  FETCH_DEFAULT_PRIORITY_SUCCESS,
  FETCH_DEFAULT_PRIORITY_FAILURE,
  SET_DEFAULT_PRIORITY_REQUEST,
  SET_DEFAULT_PRIORITY_SUCCESS,
  SET_DEFAULT_PRIORITY_FAILURE,
  FETCH_DYNAMIC_PRIORITY_REQUEST,
  FETCH_DYNAMIC_PRIORITY_SUCCESS,
  FETCH_DYNAMIC_PRIORITY_FAILURE,
  SET_DYNAMIC_PRIORITY_REQUEST,
  SET_DYNAMIC_PRIORITY_SUCCESS,
  SET_DYNAMIC_PRIORITY_FAILURE,
  FETCH_ADD_PROVIDERS_FORM_STRUCTURE_REQUEST,
  FETCH_ADD_PROVIDERS_FORM_STRUCTURE_FAILURE,
  FETCH_ADD_PROVIDERS_FORM_STRUCTURE_SUCCESS,
  FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_REQUEST,
  FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_FAILURE,
  FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_SUCCESS,
  RESET_PROVIDERS_FORM,
  ADD_PROVIDER_REQUEST,
  ADD_PROVIDER_FAILURE,
  UPDATE_APP_REQUEST,
  UPDATE_APP_FAILURE,
  UPDATE_APP_SUCCESS,
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
export const fetchAddProvidersFormStructureRequest = () => {
  return {
    type: FETCH_ADD_PROVIDERS_FORM_STRUCTURE_REQUEST,
  };
};

/**
 * @public
 */
export const fetchAddProvidersFormStructureFailure = (error: any) => {
  return {
    type: FETCH_ADD_PROVIDERS_FORM_STRUCTURE_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchAddProvidersFormStructureSuccess = (data: any) => {
  return {
    type: FETCH_ADD_PROVIDERS_FORM_STRUCTURE_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const addProviderRequest = () => {
  return {
    type: ADD_PROVIDER_REQUEST,
  };
};

/**
 * @public
 */
export const addProviderFailure = (error: any) => {
  return {
    type: ADD_PROVIDER_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const resetProvidersForm = () => {
  return {
    type: RESET_PROVIDERS_FORM,
  };
};

/**
 * @public
 */
export const fetchUpdateProvidersFormStructureRequest = () => {
  return {
    type: FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_REQUEST,
  };
};

/**
 * @public
 */
export const fetchUpdateProvidersFormStructureFailure = (error: any) => {
  return {
    type: FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchUpdateProvidersFormStructureSuccess = (data: any) => {
  return {
    type: FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_SUCCESS,
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
export const updateAppRequest = () => {
  return {
    type: UPDATE_APP_REQUEST,
  };
};

/**
 * @public
 */
export const updateAppFailure = (error: any) => {
  return {
    type: UPDATE_APP_SUCCESS,
    payload: error,
  };
};

/**
 * @public
 */
export const updateAppSuccess = (data: any) => {
  return {
    type: UPDATE_APP_FAILURE,
    payload: data,
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
export const fetchDefaultPriorityRequest = () => {
  return {
    type: FETCH_DEFAULT_PRIORITY_REQUEST,
  };
};

/**
 * @public
 */
export const fetchDefaultPrioritySuccess = (data: any) => {
  return {
    type: FETCH_DEFAULT_PRIORITY_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchDefaultPriorityFailure = (error: any) => {
  return {
    type: FETCH_DEFAULT_PRIORITY_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const setDefaultPriorityRequest = () => {
  return {
    type: SET_DEFAULT_PRIORITY_REQUEST,
  };
};

/**
 * @public
 */
export const setDefaultPrioritySuccess = (data: any) => {
  return {
    type: SET_DEFAULT_PRIORITY_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const setDefaultPriorityFailure = (error: any) => {
  return {
    type: SET_DEFAULT_PRIORITY_FAILURE,
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
 * @public
 */
export const setDynamicPriorityRequest = () => {
  return {
    type: SET_DYNAMIC_PRIORITY_REQUEST,
  };
};

/**
 * @public
 */
export const setDynamicPrioritySuccess = (data: any) => {
  return {
    type: SET_DYNAMIC_PRIORITY_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const setDynamicPriorityFailure = (error: any) => {
  return {
    type: SET_DYNAMIC_PRIORITY_FAILURE,
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
        const err = error?.response?.data;
        toast.error(`Failed to fetch Home page data, ${err?.error?.message}`);
        dispatch(fetchHomePageFailure(err?.error?.message));
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
        const err = error?.response?.data;
        toast.error(`Failed to fetch Providers, ${err?.error?.message}`);
        dispatch(fetchProvidersListFailure(err?.error?.message));
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
        const err = error?.response?.data;
        toast.error(`Failed to fetch Providers, ${err?.error?.message}`);
        dispatch(fetchProvidersListFailure(err?.error?.message));
      });
  };
};

/**
 * Method to fetch providers list
 * @param
 */
export const fetchAddProvidersFormStructure = (
  channelCode: string,
  providerCode: string
) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchAddProvidersFormStructureRequest());
    axios
      .get(
        `${AppConfig.serverDomain}/form-structure/add-provider/${channelCode}/${providerCode}`
      )
      .then((response: any) => {
        dispatch(fetchAddProvidersFormStructureSuccess(response.data));
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(`Failed to fetch Form, ${err?.error?.message}`);
        dispatch(fetchAddProvidersFormStructureFailure(err?.error?.message));
      });
  };
};

/**
 * Method to fetch providers list
 * @param
 */
export const fetchUpdateProvidersFormStructure = (uniqueIdentifier: string) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchUpdateProvidersFormStructureRequest());
    axios
      .get(
        `${AppConfig.serverDomain}/form-structure/update-provider/${uniqueIdentifier}`
      )
      .then((response: any) => {
        dispatch(fetchUpdateProvidersFormStructureSuccess(response.data));
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(`Failed to fetch Form, ${err?.error?.message}`);
        dispatch(fetchUpdateProvidersFormStructureFailure(err?.error?.message));
      });
  };
};

/**
 * Method to add new provider configuration
 * @param
 */
export const addProvider = (
  {
    channel,
    provider,
    unique_identifier,
    configuration,
  }: {
    channel: string;
    provider: string;
    unique_identifier: string;
    configuration: object;
  },
  onSuccess: () => void
) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(addProviderRequest());
    axios
      .post(`${AppConfig.serverDomain}/dashboard/providers`, {
        channel,
        provider,
        unique_identifier,
        configuration,
      })
      .then((response: any) => {
        if (response.data?.is_success) {
          onSuccess?.();
          dispatch(fetchProvidersList());
          toast.success(response.data?.data?.message);
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        dispatch(addProviderFailure(err?.error?.message));
        toast.error(`Failed to add provider ${err?.error?.message}`);
      });
  };
};

/**
 * Method to update provider configuration
 * @param
 */
export const updateProvider = (
  {
    enabled,
    unique_identifier,
    configuration,
  }: {
    enabled: string;
    unique_identifier: string;
    configuration: object;
  },
  onSuccess: () => void
) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(addProviderRequest());
    axios
      .put(`${AppConfig.serverDomain}/dashboard/providers`, {
        enabled,
        unique_identifier,
        configuration,
      })
      .then((response: any) => {
        if (response.data?.is_success) {
          onSuccess?.();
          dispatch(fetchProvidersList());
          toast.success(response.data?.data?.message);
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        dispatch(addProviderFailure(err?.error?.message));
        toast.error(`Failed to add provider ${err?.error?.message}`);
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
        const err = error?.response?.data;
        toast.error(`Failed to fetch Apps list, ${err?.error?.message}`);
        dispatch(fetchAppsListFailure(err?.error?.message));
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
        const err = error?.response?.data;
        toast.error(`Failed to fetch form, ${err?.error?.message}`);
        dispatch(fetchEditAppFormFailure(err?.error?.message));
      });
  };
};

/**
 * Method to fetch edit app form structure
 * @param
 */
export const updateApp = (id: number, formData: any, onSuccess: () => void) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(updateAppRequest());
    axios
      .put(`${AppConfig.serverDomain}/apps`, {
        id,
        ...formData,
      })
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(updateAppSuccess(response.data));
          onSuccess?.();
          toast.success(data?.data?.message);
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(`Failed to update app, ${err?.error?.message}`);
        dispatch(updateAppFailure(err?.error?.message));
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
  currentPage,
  pageSize,
}: {
  number: number;
  requestId: string;
  email: string;
  currentPage: number;
  pageSize: number;
}) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchActivityFeedRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/activity-feed/search`, {
        params: {
          mobile: number,
          email,
          request_id: requestId,
          limit: pageSize,
          offset: pageSize * (currentPage - 1),
        },
      })
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(fetchActivityFeedSuccess(data?.data));
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(`Failed to fetch Activity feed, ${err?.error?.message}`);
        dispatch(fetchActivityFeedFailure(err?.error?.message));
      });
  };
};

/**
 * Method to fetch providers list
 * @param
 */
export const fetchDefaultPriorityList = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchDefaultPriorityRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/settings/default-priority/all`)
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(fetchDefaultPrioritySuccess(data?.data));
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(`Failed to fetch Priority, ${err?.error?.message}`);
        dispatch(fetchDefaultPriorityFailure(err?.error?.message));
      });
  };
};

/**
 * Method to set providers proirity
 * @param
 */
export const setDefaultPriority = ({
  channel,
  providers_priority,
}: {
  channel: string;
  provider_priority: string;
}) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(setDefaultPriorityRequest());
    axios
      .post(`${AppConfig.serverDomain}/dashboard/settings/default-priority`, {
        channel,
        providers_priority: providers_priority,
      })
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(fetchDefaultPriorityList());
          dispatch(setDefaultPrioritySuccess(data?.data));
          toast.success(data?.data?.message || 'Updated Priority');
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(`Failed to update priority, ${err?.error?.message}`);
        dispatch(setDefaultPriorityFailure(err?.error?.message));
      });
  };
};

/**
 * Method to fetch providers list
 * @param
 */
export const fetchDynamicPriority = () => {
  return (dispatch: ActionDispatchType) => {
    dispatch(fetchDynamicPriorityRequest());
    axios
      .get(`${AppConfig.serverDomain}/dashboard/settings/dynamic-priority/all`)
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(fetchDynamicPrioritySuccess(data?.data));
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(
          `Failed to fetch Dynmaic priority, ${error?.response?.data?.error?.message}`
        );
        dispatch(fetchDynamicPriorityFailure(err?.error?.message));
      });
  };
};

/**
 * Method to set providers proirity
 * @param
 */
export const setDynamicPriority = ({
  channel,
  dynamic_priority,
}: {
  channel: string;
  provider_priority: string;
}) => {
  return (dispatch: ActionDispatchType) => {
    dispatch(setDynamicPriorityRequest());
    axios
      .post(`${AppConfig.serverDomain}/dashboard/settings/dynamic-priority`, {
        channel,
        dynamic_priority,
      })
      .then((response: any) => {
        const data = response.data;
        if (data?.is_success) {
          dispatch(setDynamicPrioritySuccess(data?.data));
          dispatch(fetchDynamicPriority());
          toast.success(data?.data?.message || 'Updated Priority');
        }
      })
      .catch((error: any) => {
        const err = error?.response?.data;
        toast.error(
          `Failed to update dynamic priority, ${err?.error?.message}`
        );
        dispatch(setDynamicPriorityFailure(err?.error?.message));
      });
  };
};
