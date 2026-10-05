import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateTripScreen from '../screens/CreateTripScreen';
import ViewTripsScreen from '../screens/ViewTripsScreen';
import CreateParcelScreen from '../screens/CreateParcelScreen';
import ViewMatchingTripsScreen from '../screens/ViewMatchingTripsScreen';
import MyDeliveriesScreen from '../screens/MyDeliveriesScreen';
import TravellerRequestsScreen from '../screens/TravellerRequestsScreen';
import DeliveryOtpScreen from '../screens/DeliveryOtpScreen';
import DesignFlowScreen, { flowScreens } from '../screens/DesignFlowScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Aapla Parcel' }} />
            <Stack.Screen name="CreateTrip" component={CreateTripScreen} options={{ title: 'Create Trip' }} />
            <Stack.Screen name="ViewTrips" component={ViewTripsScreen} options={{ title: 'My Trips' }} />
            <Stack.Screen name="CreateParcel" component={CreateParcelScreen} options={{ title: 'Create Parcel' }} />
            <Stack.Screen name="ViewMatchingTrips" component={ViewMatchingTripsScreen} options={{ title: 'Matching Trips' }} />
            <Stack.Screen name="MyDeliveries" component={MyDeliveriesScreen} options={{ title: 'My Deliveries' }} />
            <Stack.Screen name="TravellerRequests" component={TravellerRequestsScreen} options={{ title: 'Requests' }} />
            <Stack.Screen name="DeliveryOtp" component={DeliveryOtpScreen} options={{ title: 'Delivery OTP' }} />
          </>
        )}
        {Object.keys(flowScreens).map((name) => (
          <Stack.Screen key={name} name={name} component={DesignFlowScreen} options={{ title: flowScreens[name].title, headerShown: false }} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
