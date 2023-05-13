import { StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LensProvider, Theme } from '@lens-protocol/react-native-lens-ui-kit';
import BottomTabs from './BottomTabs'
import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


import Profiles from './Profiles'
import ViewProfile from './ViewProfile'
import ViewComments from './ViewComments'
import ViewFollowing from './ViewFollowing'

const Stack = createNativeStackNavigator()

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: "c8097de6-c043-49ce-b778-f988faf421b3" }),
});

const client = new ApolloClient({
  uri: "https://api.lens.dev",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <LensProvider theme={Theme.dark}>
      <NavigationContainer theme={DarkTheme}>
      <LivepeerConfig client={livepeerClient}>
        <ApolloProvider client={client}>
        <Stack.Navigator>
        {/* <Stack.Navigator screenOptions={{
            headerShown: false
          }}> */}
          {/* <Stack.Screen name="BottomTabs" component={BottomTabs} /> */}
          <Stack.Screen name="Home" component={Profiles}  />
          <Stack.Screen name="ViewProfile" component={ViewProfile} />
          <Stack.Screen name="ViewComments" component={ViewComments} />
          <Stack.Screen name="ViewFollowing" component={ViewFollowing} />
        </Stack.Navigator>
        </ApolloProvider>
         </LivepeerConfig>
      </NavigationContainer>
    </LensProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
