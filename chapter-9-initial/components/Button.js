import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function Button({ onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
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
