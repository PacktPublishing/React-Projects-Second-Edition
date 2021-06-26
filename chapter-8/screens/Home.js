import React, { useRef } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

export default function Home() {
  const navigation = useNavigation();
  const doubleTapRef = useRef(null);

  function onDoubleTap(e) {
    if (e.nativeEvent.state === State.ACTIVE) {
      navigation.navigate('Game');
    }
  }

  function onSingleTap(e) {
    if (e.nativeEvent.state === State.ACTIVE) {
      Alert.alert('Double tap to start the game');
    }
  }

  return (
    <View style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={onSingleTap}
        waitFor={doubleTapRef}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onDoubleTap}
          numberOfTaps={2}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Start game!</Text>
          </View>
        </TapGestureHandler>
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
