import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { tripAPI } from '../services/api';

const CreateTripScreen = ({ navigation }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');
  const [ETA, setETA] = useState('');

  const handleCreateTrip = async () => {
    if (!source || !destination || !departureDate || !departureTime || !vehicleType || !totalCapacity || !ETA) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await tripAPI.createTrip({
        source,
        destination,
        departureDate,
        departureTime,
        vehicleType,
        totalCapacity: parseFloat(totalCapacity),
        ETA,
      });
      Alert.alert('Success', 'Trip created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create trip');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Trip</Text>

      <TextInput
        style={styles.input}
        placeholder="Source (e.g., Pune)"
        value={source}
        onChangeText={setSource}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination (e.g., Mumbai)"
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        style={styles.input}
        placeholder="Departure Date (YYYY-MM-DD)"
        value={departureDate}
        onChangeText={setDepartureDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Departure Time (e.g., 10:00 AM)"
        value={departureTime}
        onChangeText={setDepartureTime}
      />

      <TextInput
        style={styles.input}
        placeholder="Vehicle Type (e.g., Car, Bike)"
        value={vehicleType}
        onChangeText={setVehicleType}
      />

      <TextInput
        style={styles.input}
        placeholder="Total Capacity (kg)"
        value={totalCapacity}
        onChangeText={setTotalCapacity}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="ETA (e.g., 2 hours)"
        value={ETA}
        onChangeText={setETA}
      />

      <Button title="Create Trip" onPress={handleCreateTrip} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default CreateTripScreen;
