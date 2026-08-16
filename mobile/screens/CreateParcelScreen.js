import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { parcelAPI } from '../services/api';

const CreateParcelScreen = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [weight, setWeight] = useState('');

  const handleCreateParcel = async () => {
    if (!pickupLocation || !destination || !receiverName || !receiverPhone || !weight) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await parcelAPI.createParcel({
        pickupLocation,
        destination,
        receiverName,
        receiverPhone,
        weight: parseFloat(weight),
      });
      Alert.alert('Success', 'Parcel created successfully');
      navigation.navigate('ViewMatchingTrips', { destination, parcelId: response.data._id });
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create parcel');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Parcel</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Location (e.g., Pune)"
        value={pickupLocation}
        onChangeText={setPickupLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination (e.g., Mumbai)"
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        style={styles.input}
        placeholder="Receiver Name"
        value={receiverName}
        onChangeText={setReceiverName}
      />

      <TextInput
        style={styles.input}
        placeholder="Receiver Phone"
        value={receiverPhone}
        onChangeText={setReceiverPhone}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Button title="Create Parcel" onPress={handleCreateParcel} />
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

export default CreateParcelScreen;
