import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';

export default function Result() {
  const route = useRoute();
  const { winner } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.message}>You've {winner ? 'won' : 'lost'}</Text>
      {winner && (
        <LottieView
          autoPlay
          style={{
            width: 300,
            height: 300,
          }}
          source={require('../assets/winner.json')}
        />
      )}
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
  message: {
    fontSize: 48,
  },
});
