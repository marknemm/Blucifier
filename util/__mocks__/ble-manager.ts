import { stubAllMethods } from '@test/util/spy';
import { Device, State, type NativeDevice } from 'react-native-ble-plx';

const connectedDevices: Map<string, Device> = new Map<string, Device>();

/**
 * Generates a map of default devices.
 *
 * @returns A map of default devices.
 */
export function genDefaultDevices(): Map<string, Device> {
  return new Map<string, Device>([
    ['device-3', genBleDeviceMock({ id: 'device-3', name: 'Device 3', connected: true })],
    ['device-2', genBleDeviceMock({ id: 'device-2', name: 'Device 2' })],
    ['device-0', genBleDeviceMock({ id: 'device-0', name: 'Device 0', localName: 'Device A' })],
    ['device-1', genBleDeviceMock({ id: 'device-1', name: 'Device 1', localName: 'Device B' })],
    ['device-4', genBleDeviceMock({ id: 'device-4' })],
  ]);
}

/**
 * Resets the connected devices to given devices.
 *
 * @param devices The devices to reset to. Defaults to the default devices from {@link genDefaultDevices}.
 */
function resetDevices(devices: Map<string, Device> = genDefaultDevices()): void {
  connectedDevices.clear();
  for (const [key, value] of devices) {
    connectedDevices.set(key, value);
  }
}

/**
 * The `@util/ble-manager` module mock.
 */
const BleManagerMock = jest.fn().mockImplementation(() => {
  resetDevices();

  return {
    getConnectedDevices: jest.fn().mockResolvedValue(connectedDevices),
    waitForPoweredOnState: jest.fn().mockResolvedValue(null),
    onStateChange: jest.fn().mockImplementation((listenerCb) => {
      listenerCb?.(State.PoweredOn);
      return { remove: jest.fn() };
    }),
    state: jest.fn().mockResolvedValue(State.PoweredOn),
    startDeviceScan: jest.fn().mockImplementation((listenerCb) => {
      for (const device of connectedDevices.values()) {
        listenerCb?.(device);
      }
    }),
    stopDeviceScan: jest.fn(),
    connectToDevice: jest.fn().mockImplementation((deviceIdentifier: string) => {
      const device = connectedDevices.get(deviceIdentifier) ?? genBleDeviceMock(deviceIdentifier);
      (device.isConnected as jest.Mock).mockResolvedValue(true);
      return Promise.resolve(device);
    }),
    disconnectFromDevice: jest.fn().mockImplementation((deviceIdentifier: string) => {
      const device = connectedDevices.get(deviceIdentifier) ?? genBleDeviceMock(deviceIdentifier);
      (device.isConnected as jest.Mock).mockResolvedValue(false);
      return Promise.resolve(device);
    }),
    destroy: jest.fn(),
    genDefaultDevices,
    resetDevices,
  };
});

/**
 * Generates a mock {@link Device} object.
 *
 * @param data The {@link NativeDevice} data to populate the mock {@link Device}.
 * @returns A mock {@link Device} object.
 */
export function genBleDeviceMock(data: (Partial<NativeDevice> & { connected?: boolean }) | string | number): Device {
  const device = new Device(null, null);

  if (typeof data === 'number') {
    data = { id: `device-${data}` };
  } else if (typeof data === 'string') {
    data = { id: data };
  }

  for (const key of Object.keys(data)) {
    (device as any)[key as keyof Device] = data[key as keyof NativeDevice];
  }
  stubAllMethods(device);
  (device.isConnected as jest.Mock).mockResolvedValue(data.connected ?? false);

  return device;
}

export { Device, State };
export default BleManagerMock;