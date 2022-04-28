import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  LongPressGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';

export default function Home() {
  const navigation = useNavigation();

  function onLongPress(e) {
    if (e.nativeEvent.state === State.ACTIVE) {
      navigation.navigate('Game');
    }
  }

  function onTap(e) {
    if (e.nativeEvent.state === State.ACTIVE) {
      Alert.alert('Long press to start the game');
    }
  }

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onTap}>
        <LongPressGestureHandler
          onHandlerStateChange={onLongPress}
          minDurationMs={600}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Start game!</Text>
          </View>
        </LongPressGestureHandler>
      </TapGestureHandler>
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
  button: {
    width: 300,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 150,
    backgroundColor: 'purple',
  },
  buttonText: {
    color: 'white',
    fontSize: 48,
  },
});
