import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import UserContext from '../context/UserContext';
import Button from '../components/Button';

export default function Profile() {
  const { logoutUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          logoutUser();
        }}
        label='Logout'
      />
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
    justifyContent: 'center',
  },
});
