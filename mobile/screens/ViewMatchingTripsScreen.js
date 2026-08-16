import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { tripAPI, requestAPI } from '../services/api';

const ViewMatchingTripsScreen = ({ route, navigation }) => {
  const { destination, parcelId } = route.params || {};
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatchingTrips();
  }, [destination]);

  const loadMatchingTrips = async () => {
    try {
      const response = await tripAPI.getAvailableTrips(null, destination);
      setTrips(response.data);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (tripId) => {
    if (!parcelId) {
      Alert.alert('Error', 'No parcel ID provided');
      return;
    }

    try {
      await requestAPI.createRequest(parcelId, tripId);
      Alert.alert('Success', 'Request sent successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send request');
    }
  };

  const renderTrip = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.source}>{item.source}</Text>
      <Text style={styles.arrow}>→</Text>
      <Text style={styles.destination}>{item.destination}</Text>
      <Text style={styles.detail}>Date: {new Date(item.departureDate).toLocaleDateString()}</Text>
      <Text style={styles.detail}>Available Capacity: {item.availableCapacity} kg</Text>
      <Text style={styles.detail}>Vehicle: {item.vehicleType}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSendRequest(item._id)}
      >
        <Text style={styles.buttonText}>Send Request</Text>
      </TouchableOpacity>
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
      <Text style={styles.title}>Matching Trips to {destination}</Text>
      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.empty}>No matching trips found</Text>}
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
  title: {
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
  source: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
  destination: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
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

export default ViewMatchingTripsScreen;
