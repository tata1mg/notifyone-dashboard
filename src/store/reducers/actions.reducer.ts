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

const initialState: IPageState = {
  loading: false,
  error: '',
  homePageData: null,
  providersList: null,
  allProviders: null,
  allProvidersLoading: false,
  appsList: [],
  editAppFormStructure: null,
  editAppFormLoading: false,
  addProviderFormStructure: {},
  updateProviderFormStructure: {},
  activityData: [],
  priorityList: null,
  dynamicPriority: null,
};

const actionsReducer = (state = initialState, action: CurrentAction): any => {
  switch (action.type) {
    case FETCH_HOME_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HOME_DATA_SUCCESS:
      return {
        ...state,
        homePageData: action.payload,
        loading: false,
      };

    case FETCH_HOME_DATA_FAILURE:
      return {
        ...state,
        homePageData: null,
        error: action.payload,
        loading: false,
      };

    case FETCH_PROVIDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROVIDERS_LIST_SUCCESS:
      return {
        ...state,
        providersList: action.payload,
        loading: false,
      };

    case FETCH_PROVIDERS_LIST_FAILURE:
      return {
        ...state,
        providersList: null,
        error: action.payload,
        loading: false,
        allProvidersLoading: false,
      };
    case FETCH_ADD_PROVIDERS_LIST_REQUEST:
      return {
        ...state,
        allProvidersLoading: true,
      };
    case FETCH_ADD_PROVIDERS_LIST_SUCCESS:
      return {
        ...state,
        allProviders: action.payload,
        allProvidersLoading: false,
      };

    case FETCH_ADD_PROVIDERS_FORM_STRUCTURE_REQUEST:
    case ADD_PROVIDER_REQUEST:
      return {
        ...state,
        allProvidersLoading: true,
      };

    case FETCH_ADD_PROVIDERS_FORM_STRUCTURE_SUCCESS:
      return {
        ...state,
        addProviderFormStructure: action.payload,
        allProvidersLoading: false,
      };

    case FETCH_ADD_PROVIDERS_FORM_STRUCTURE_FAILURE:
      return {
        ...state,
        addProviderFormStructure: {},
        error: action.payload,
        allProvidersLoading: false,
      };

    case ADD_PROVIDER_FAILURE:
      return {
        ...state,
        allProvidersLoading: false,
        error: action.payload,
      };

    case FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_REQUEST:
      return {
        ...state,
        allProvidersLoading: true,
      };

    case FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_SUCCESS:
      return {
        ...state,
        updateProviderFormStructure: action.payload,
        allProvidersLoading: false,
      };

    case FETCH_UPDATE_PROVIDERS_FORM_STRUCTURE_FAILURE:
      return {
        ...state,
        updateProviderFormStructure: {},
        error: action.payload,
        allProvidersLoading: false,
      };

    case RESET_PROVIDERS_FORM:
      return {
        ...state,
        addProviderFormStructure: {},
        updateProviderFormStructure: {},
        allProvidersLoading: false,
        error: '',
      };

    case FETCH_APPS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_APPS_LIST_SUCCESS:
      return {
        ...state,
        appsList: action.payload,
        loading: false,
      };

    case FETCH_APPS_LIST_FAILURE:
      return {
        ...state,
        appsList: [],
        error: action.payload,
        loading: false,
      };
    case FETCH_EDIT_APP_FORM_REQUEST:
    case UPDATE_APP_REQUEST:
      return {
        ...state,
        editAppFormLoading: true,
      };

    case FETCH_EDIT_APP_FORM_SUCCESS:
      return {
        ...state,
        editAppFormStructure: action.payload,
        editAppFormLoading: false,
      };

    case FETCH_EDIT_APP_FORM_FAILURE:
      return {
        ...state,
        editAppFormStructure: null,
        error: action.payload,
        editAppFormLoading: false,
      };

    case UPDATE_APP_FAILURE:
      return {
        ...state,
        editAppFormLoading: false,
        error: action.payload,
      };

    case UPDATE_APP_SUCCESS:
      return {
        ...state,
        editAppFormLoading: false,
      };

    case FETCH_ACTIVITY_FEED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACTIVITY_FEED_SUCCESS:
      return {
        ...state,
        activityData: action.payload,
        loading: false,
      };

    case FETCH_ACTIVITY_FEED_FAILURE:
      return {
        ...state,
        activityData: [],
        error: action.payload,
        loading: false,
      };

    case FETCH_DEFAULT_PRIORITY_REQUEST:
    case SET_DEFAULT_PRIORITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DEFAULT_PRIORITY_SUCCESS:
      return {
        ...state,
        priorityList: action.payload,
        loading: false,
      };

    case FETCH_DEFAULT_PRIORITY_FAILURE:
      return {
        ...state,
        priorityList: null,
        error: action.payload,
        loading: false,
      };

    case SET_DEFAULT_PRIORITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SET_DEFAULT_PRIORITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case FETCH_DYNAMIC_PRIORITY_REQUEST:
    case SET_DYNAMIC_PRIORITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DYNAMIC_PRIORITY_SUCCESS:
      return {
        ...state,
        dynamicPriority: action.payload,
        loading: false,
      };

    case FETCH_DYNAMIC_PRIORITY_FAILURE:
      return {
        ...state,
        dynamicPriority: null,
        error: action.payload,
        loading: false,
      };

    case SET_DYNAMIC_PRIORITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SET_DYNAMIC_PRIORITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default actionsReducer;
