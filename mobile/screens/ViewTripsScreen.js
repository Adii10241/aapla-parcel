import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { tripAPI } from '../services/api';

const ViewTripsScreen = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const response = await tripAPI.getMyTrips();
      setTrips(response.data);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTrip = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.source}>{item.source}</Text>
      <Text style={styles.arrow}>→</Text>
      <Text style={styles.destination}>{item.destination}</Text>
      <Text style={styles.detail}>Date: {new Date(item.departureDate).toLocaleDateString()}</Text>
      <Text style={styles.detail}>Capacity: {item.availableCapacity}/{item.totalCapacity} kg</Text>
      <Text style={[styles.status, styles[item.status]]}>{item.status}</Text>
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
      <Text style={styles.title}>My Trips</Text>
      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.empty}>No trips found</Text>}
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
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  Published: { color: '#4CAF50' },
  Full: { color: '#FF9800' },
  InProgress: { color: '#2196F3' },
  Completed: { color: '#9E9E9E' },
  Cancelled: { color: '#F44336' },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
  },
});

export default ViewTripsScreen;
