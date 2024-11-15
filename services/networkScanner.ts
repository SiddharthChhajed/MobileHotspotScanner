// services/networkScanner.ts
import { Ping } from 'react-native-ping';

// Define the shape of a connected device
export interface ConnectedDevice {
  ip: string;
  deviceName?: string;
}

const networkScanner = async (): Promise<ConnectedDevice[]> => {
  const connectedDevices: ConnectedDevice[] = [];
  
  const localIPRange = '192.168.1.'; // Adjust based on common IP range for hotspots
  const startIP = 1;
  const endIP = 255;

  for (let i = startIP; i <= endIP; i++) {
    const ipAddress = `${localIPRange}${i}`;
    // try {
    //   const isReachable = await Ping.start(ipAddress, { timeout: 1000 });
    //   if (isReachable) {
    //     connectedDevices.push({ ip: ipAddress });
    //   }
    // } catch (error) {
    //   console.log(`Ping error for IP ${ipAddress}:`, error);
    // }
    try {
      const response = await fetch(`http://${ip}:80`, { method: 'HEAD' });
      if (response.status === 200 || response.status === 404) {
        connectedDevices.push({ ip: ipAddress });
      }
    } catch (error) {
      // Ignoring failed ping
    }
  }

  return connectedDevices;
};

export default networkScanner;
