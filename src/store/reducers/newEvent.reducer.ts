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
const initialState: NewEventState = {
  loading: false,
  error: '',
  formStructure: {},
  eventCreated: false,
  appNameCreated: false,
};
const newEventReducer = (state = initialState, action: NewEventAction): any => {
  switch (action.type) {
    case FETCH_CREATE_EVENT_FORM_STRUCTURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CREATE_EVENT_FORM_STRUCTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        formStructure: action.payload,
      };
    case FETCH_CREATE_EVENT_FORM_STRUCTURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_NEW_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        eventCreated: true,
      };
    case CREATE_NEW_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_APP_NAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_APP_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        appNameCreated: true,
      };
    case CREATE_APP_NAME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default newEventReducer;
