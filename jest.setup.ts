import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
