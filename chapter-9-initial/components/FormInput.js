import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function FormInput({ onChange, ...props }) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={(text) => onChange(text)}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
});
