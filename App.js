import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import config from './auth0-configuration';
import CreateConsumptionScreen from './screens/CreateConsumptionScreen';
import PayBillScreen from './screens/PayBillScreen';
import SelectConsumptionScreen from './screens/SelectConsumptionScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ListAccountsScreen from './screens/ListAccountsScreen';
import ListConsumptionsScreen from './screens/ListConsumptionsScreen';

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const { authorize, clearSession, user, error, getCredentials, isLoading } = useAuth0();
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          let creds = await getCredentials();
          setCredentials(creds);
          navigation.replace('Bienvenido');
        } catch (e) {
          console.log('Error al obtener credenciales:', e);
        }
      })();
    }
  }, [user]);

  const onLogin = async () => {
    try {
      await authorize({
        audience: 'https://dev-88x6n0ntfccbwhfp.us.auth0.com/api/v2/',  // Agregar esta línea
        scope: 'openid profile email',
      });
      let creds = await getCredentials();
      setCredentials(creds);
      Alert.alert('AccessToken: ' + creds.accessToken);
      navigation.replace('Bienvenido');
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
      setCredentials(null);
    } catch (e) {
      console.log('Log out cancelado');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6200ee', '#8e24aa']} style={styles.header}>
        <Text style={styles.headerText}>Bienvenido a Banco Seguro</Text>
      </LinearGradient>

      <View style={styles.mainContent}>
        {user ? <Text style={styles.welcomeText}>Bienvenido, {user.name}</Text> : <Text style={styles.loginPrompt}>Inicia sesión para continuar</Text>}
        {error && <Text style={styles.error}>{error.message}</Text>}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={credentials ? onLogout : onLogin}
        >
          <Text style={styles.loginButtonText}>{credentials ? 'Cerrar sesión' : 'Iniciar sesión'}</Text>
          <Icon name={credentials ? 'exit-to-app' : 'login'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Bienvenido" component={CreateConsumptionScreen} />
      <Stack.Screen name="SelectConsumptionScreen" component={SelectConsumptionScreen} />
      <Stack.Screen name="PayBill" component={PayBillScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="ListAccounts" component={ListAccountsScreen} />
      <Stack.Screen name="ListConsumption" component={ListConsumptionsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = () => (
  <Auth0Provider domain={config.domain} clientId={config.clientId}>
    <AppNavigator />
  </Auth0Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 18,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  loginPrompt: {
    fontSize: 16,
    color: '#6200ee',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default App;