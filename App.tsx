// App.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Button, Text, View, StyleSheet } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import networkScanner, { ConnectedDevice } from './services/networkScanner';

const App: React.FC = () => {
  const [deviceIP, setDeviceIP] = useState<string>('');
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([]);

  useEffect(() => {
    // Get the device's IP address when the app loads
    NetworkInfo.getIPV4Address().then((ip: string | null) => {
      setDeviceIP(ip as string);

    });
  }, []);

  const scanForDevices = async () => {
    const devices = await networkScanner();
    setConnectedDevices(devices);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mobile Hotspot Device Scanner</Text>
      <Text style={styles.deviceIP}>Your IP: {deviceIP}</Text>
      <Button title="Scan for Connected Devices" onPress={scanForDevices} />
      <FlatList
        data={connectedDevices}
        keyExtractor={(item) => item.ip}
        renderItem={({ item }) => (
          <View style={styles.deviceContainer}>
            <Text style={styles.deviceText}>IP: {item.ip}</Text>
            {item.deviceName && <Text style={styles.deviceText}>Name: {item.deviceName}</Text>}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  deviceIP: { fontSize: 18, marginBottom: 20 },
  deviceContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  deviceText: { fontSize: 16 },
});

export default App;
