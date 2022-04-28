import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedButton from '../components/AnimatedButton';

export default function Game() {
  const baseNumber = Math.floor(Math.random() * 100);
  const score = Math.floor(Math.random() * 100);
  const [choice, setChoice] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (choice) {
      const winner =
        (choice === 'higher' && score > baseNumber) ||
        (choice === 'lower' && baseNumber > score);

      navigation.navigate('Result', { winner });
    }
  }, [baseNumber, score, choice]);

  return (
    <View style={styles.container}>
      <Text style={styles.baseNumber}>Starting: {baseNumber}</Text>
      <AnimatedButton action='higher' onPress={() => setChoice('higher')} />
      <AnimatedButton action='lower' onPress={() => setChoice('lower')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseNumber: {
    fontSize: 48,
    marginBottom: 30,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    padding: 30,
    marginVertical: 15,
  },
  buttonRed: {
    backgroundColor: 'red',
  },
  buttonGreen: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});
