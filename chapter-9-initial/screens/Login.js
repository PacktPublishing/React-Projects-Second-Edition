import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import FormInput from '../components/FormInput';
import UserContext from '../context/UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { error, loginUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      {error.length ? <Text style={styles.message}>Something went wrong</Text> : null}
      <FormInput
        onChangeText={setUsername}
        value={username}
        placeholder='Your username'
        textContentType='username'
      />
      <FormInput
        onChangeText={setPassword}
        value={password}
        placeholder='Your password'
        textContentType='password'
        secureTextEntry
      />
      <TouchableOpacity onPress={() => loginUser(username, password)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 20,
  },
  message: {
    fontSize: 20,
    color: 'red',
    marginBottom: 20,
  },
  button: {
    width: 300,
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
