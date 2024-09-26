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
  activityData: [],
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

    default:
      return state;
  }
};

export default actionsReducer;
