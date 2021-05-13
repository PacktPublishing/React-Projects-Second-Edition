import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Profile() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
});
