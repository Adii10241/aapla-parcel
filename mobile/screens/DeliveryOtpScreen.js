import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { parcelAPI } from '../services/api';

const DeliveryOtpScreen = ({ route }) => {
  const { parcelId, type } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    try {
      if (type === 'pickup') {
        await parcelAPI.verifyPickupOtp(parcelId, otp);
        Alert.alert('Success', 'Pickup verified successfully');
      } else if (type === 'delivery') {
        await parcelAPI.verifyDeliveryOtp(parcelId, otp);
        Alert.alert('Success', 'Delivery verified successfully');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to verify OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'pickup' ? 'Verify Pickup OTP' : 'Verify Delivery OTP'}
      </Text>
      <Text style={styles.subtitle}>
        Enter the {type === 'pickup' ? 'pickup' : 'delivery'} OTP provided by the sender
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
      />

      <Button title="Verify OTP" onPress={handleVerifyOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 5,
  },
});

export default DeliveryOtpScreen;
