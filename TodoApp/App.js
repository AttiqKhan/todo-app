import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/homeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{ title: 'Welcome' }}
          // options={{
          //   headerTitle: () => null,
          //   headerLeft: (props) => null,
          //   headerStyle: { height: 0, shadowOpacity: 0, elevation: 0 }
          // }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}