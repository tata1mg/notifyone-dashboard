import { combineReducers } from 'redux';

import emailEventsReducer from './emailEvents.reducer';
import pushNotificationEventsReducer from './pushNotificationEvents.reducer';
import smsEventsReducer from './smsEvents.reducer';
import whatsAppEventsReducer from './whatsappEvents.reducer';
import ravenRootEventsReducer from './ravenRootNodeEvents.reducer';
import currentEventsReducer from './currentEvent.reducer';
import newEventReducer from './newEvent.reducer';
import actionsReducer from './actions.reducer';

const rootReducer = combineReducers({
  emailEvents: emailEventsReducer,
  pushNotificationEvents: pushNotificationEventsReducer,
  smsEvents: smsEventsReducer,
  newEvent: newEventReducer,
  whatsAppEvents: whatsAppEventsReducer,
  currentEvent: currentEventsReducer,
  ravenRootEventsReducer: ravenRootEventsReducer,
  reducer: actionsReducer,
});

export default rootReducer;
