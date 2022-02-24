import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';

export default function AnimatedButton({ action, onPress }) {
  const opacity = useRef(new Animated.Value(1));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Animated.timing(opacity.current, {
          toValue: 0.2,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.linear(),  
        }).start(() => onPress());
      }}
    >
      <Animated.View
        style={[
          styles.button,
          action === 'higher' ? styles.buttonGreen : styles.buttonRed,
          { opacity: opacity.current },
        ]}
      >
        <Text style={styles.buttonText}>{action}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
    textTransform: 'capitalize',
  },
});
