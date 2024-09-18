import {
  FETCH_HOME_DATA_FAILURE,
  FETCH_HOME_DATA_REQUEST,
  FETCH_HOME_DATA_SUCCESS,
} from '../constants';

const initialState: IHomePageState = {
  loading: false,
  error: '',
  data: null,
};

const homePageReducer = (state = initialState, action: CurrentAction): any => {
  switch (action.type) {
    case FETCH_HOME_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_HOME_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case FETCH_HOME_DATA_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default homePageReducer;
