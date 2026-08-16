import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const { sendOtp, verifyOtp } = useAuth();

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const response = await sendOtp(phone);
      Alert.alert('Success', `OTP sent: ${response.devOtp}`);
      setShowOtp(true);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    try {
      await verifyOtp(phone, otp, name);
      Alert.alert('Success', 'Login successful');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to verify OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aapla Parcel</Text>
      <Text style={styles.subtitle}>Login with Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 10-digit phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={10}
        editable={!showOtp}
      />

      {showOtp && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your name (for new users)"
            value={name}
            onChangeText={setName}
          />
        </>
      )}

      {!showOtp ? (
        <Button title="Send OTP" onPress={handleSendOtp} />
      ) : (
        <Button title="Verify OTP" onPress={handleVerifyOtp} />
      )}
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007AFF',
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
  },
});

export default LoginScreen;
