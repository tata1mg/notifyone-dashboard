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
} from '../constants';

const initialState: IPageState = {
  loading: false,
  error: '',
  homePageData: null,
  providersList: null,
  allProviders: null,
  allProvidersLoading: false,
  appsList: [],
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

    default:
      return state;
  }
};

export default actionsReducer;
