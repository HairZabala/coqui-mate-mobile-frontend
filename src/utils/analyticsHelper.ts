// import analytics from '@react-native-firebase/analytics';
type AnalyticsProperties = {
  [key: string]: unknown;
};

export const trackEvent = async (eventName: string, properties: AnalyticsProperties | null = null): Promise<void> => {
  try {
    // Max event name length from Firebase is 40 characters
    const trimmedEventName = eventName.slice(0, 40);

    if (properties) {
      // Max property values length from Firebase is 100 characters
      const trimmedProperties = trimObjValues(properties, 100);
      // await analytics().logEvent(trimmedEventName, trimmedProperties);
      console.error(
        'ATTEMPTING TO LOG EVENT BUT NO ANALYTICS PACKAGE IMPLEMENTED',
        trimmedEventName,
        trimmedProperties,
      );
    } else {
      // await analytics().logEvent(trimmedEventName);
    }
  } catch (error) {
    console.error('TRACK EVENT ERROR: ', error);
  }
};

const trimObjValues = (obj: AnalyticsProperties, length: number): AnalyticsProperties => {
  return Object.keys(obj).reduce((acc, curr) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[curr] = String(obj[curr])?.slice(0, length) ?? obj[curr];
    return acc;
  }, {});
};
