import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, {user?.name || 'User'}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CreateParcel')}
        >
          <Text style={styles.cardTitle}>Send Parcel</Text>
          <Text style={styles.cardSubtitle}>Create a new parcel request</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PreferredDates')}>
          <Text style={styles.cardTitle}>Guided Parcel Request</Text>
          <Text style={styles.cardSubtitle}>Follow the complete parcel booking journey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('StartEarning')}
        >
          <Text style={styles.cardTitle}>Earn While Travelling</Text>
          <Text style={styles.cardSubtitle}>Create a trip and earn money</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('MyDeliveries')}
        >
          <Text style={styles.cardTitle}>My Deliveries</Text>
          <Text style={styles.cardSubtitle}>Track your parcel deliveries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ViewTrips')}
        >
          <Text style={styles.cardTitle}>My Trips</Text>
          <Text style={styles.cardSubtitle}>View your created trips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TravellerRequests')}
        >
          <Text style={styles.cardTitle}>Traveller Requests</Text>
          <Text style={styles.cardSubtitle}>View requests for your trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ParcelTracking')}>
          <Text style={styles.cardTitle}>Track a Parcel</Text>
          <Text style={styles.cardSubtitle}>Follow a parcel through every delivery step</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TodayTrip')}>
          <Text style={styles.cardTitle}>Today's Trip</Text>
          <Text style={styles.cardSubtitle}>Pick up parcels and complete your delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.cardTitle}>Profile & Verification</Text>
          <Text style={styles.cardSubtitle}>Manage your account and documents</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
