import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { parcelAPI } from '../services/api';

const MyDeliveriesScreen = ({ navigation }) => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParcels();
  }, []);

  const loadParcels = async () => {
    try {
      const response = await parcelAPI.getMyParcels();
      setParcels(response.data);
    } catch (error) {
      console.error('Failed to load parcels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePickupOtp = async (parcelId) => {
    try {
      const response = await parcelAPI.generatePickupOtp(parcelId);
      alert(`Pickup OTP: ${response.data.devOtp}`);
      loadParcels();
    } catch (error) {
      alert(error.message || 'Failed to generate pickup OTP');
    }
  };

  const handleGenerateDeliveryOtp = async (parcelId) => {
    try {
      const response = await parcelAPI.generateDeliveryOtp(parcelId);
      alert(`Delivery OTP: ${response.data.devOtp}`);
      loadParcels();
    } catch (error) {
      alert(error.message || 'Failed to generate delivery OTP');
    }
  };

  const renderParcel = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Parcel to {item.destination}</Text>
      <Text style={styles.detail}>Receiver: {item.receiverName}</Text>
      <Text style={styles.detail}>Weight: {item.weight} kg</Text>
      <Text style={styles.detail}>Pickup: {item.pickupLocation}</Text>
      <Text style={[styles.status, styles[item.status]]}>{item.status}</Text>

      {item.status === 'Accepted' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGeneratePickupOtp(item._id)}
        >
          <Text style={styles.buttonText}>Generate Pickup OTP</Text>
        </TouchableOpacity>
      )}

      {item.status === 'PickupDone' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGenerateDeliveryOtp(item._id)}
        >
          <Text style={styles.buttonText}>Generate Delivery OTP</Text>
        </TouchableOpacity>
      )}

      {item.status === 'PickupDone' && (
        <TouchableOpacity
          style={[styles.button, styles.verifyButton]}
          onPress={() => navigation.navigate('DeliveryOtp', { parcelId: item._id, type: 'pickup' })}
        >
          <Text style={styles.buttonText}>Verify Pickup OTP</Text>
        </TouchableOpacity>
      )}

      {item.status === 'InTransit' && (
        <TouchableOpacity
          style={[styles.button, styles.verifyButton]}
          onPress={() => navigation.navigate('DeliveryOtp', { parcelId: item._id, type: 'delivery' })}
        >
          <Text style={styles.buttonText}>Verify Delivery OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Deliveries</Text>
      <FlatList
        data={parcels}
        renderItem={renderParcel}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.empty}>No parcels found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  Pending: { color: '#FF9800' },
  Matched: { color: '#2196F3' },
  Accepted: { color: '#4CAF50' },
  PickupDone: { color: '#9C27B0' },
  InTransit: { color: '#3F51B5' },
  Delivered: { color: '#4CAF50' },
  Cancelled: { color: '#F44336' },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
  },
});

export default MyDeliveriesScreen;
