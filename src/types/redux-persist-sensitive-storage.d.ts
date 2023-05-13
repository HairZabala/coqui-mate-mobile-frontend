declare module 'redux-persist-sensitive-storage' {
  import { RNSensitiveInfoOptions } from 'react-native-sensitive-info';
  import { PersistConfig } from 'redux-persist/es/types';

  export default function (options?: RNSensitiveInfoOptions): PersistConfig;
}
