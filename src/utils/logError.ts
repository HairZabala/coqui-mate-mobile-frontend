const logError: (error: Error) => void = (error) => {
  // TODO: add error logging such as crashlytics
  console.error({ error });
};

export default logError;
