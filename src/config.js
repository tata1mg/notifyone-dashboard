// Keys exposed on client for each workspace
export const allowedConfigs = {
  communication: [
    'appUrl',
    'communicationAppUrlPort',
    'emailEvents',
    'emailEventsUpdate',
    'platformLogin',
    'previewEmailEvent',
    'pushNotificationEvents',
    'pushNotificationEventsUpdate',
    'sentry',
    'serverDomain',
    'smsEvents',
    'smsEventsUpdate',
    'useMockAPI',
    'whatsAppEvents',
    'whatsAppEventsUpdate',
    'ravenAppEndpoint',
  ],
};

/**
 * Filter keys of an object based on allowedkeys
 *
 * @param object Object including multiple keys
 * @param allowedKeys Array of keys present in "object" that are allowed to exist
 * @returns New Object after filtering out all keys not present in allowedKeys
 */
export const filterConfig = (object, allowedKeys = []) => {
  return allowedKeys.reduce((keyMap, key) => {
    keyMap[key] = JSON.stringify(object[key]);
    return keyMap;
  }, {});
};
