import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import UserContext from '../context/UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, error, loginUser } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (user.token.length) {
      navigation.navigate('Home', { screen: 'Posts' });
    }
  }, [user.token]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {error.length ? (
          <Text style={styles.message}>Something went wrong</Text>
        ) : null}
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
        />
        <Button onPress={() => loginUser(username, password)} label='login' />
      </View>
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
  form: {
    width: '90%',
  },
  message: {
    fontSize: 20,
    color: 'red',
    marginBottom: 20,
  },
});
