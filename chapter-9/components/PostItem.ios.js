import React from 'react';
import { StyleSheet, Text, Dimensions, Image, View } from 'react-native';

const PostItem = ({ data }) => (
  <View style={styles.container}>
    <View style={styles.details}>
      <Text>{data.description}</Text>
    </View>
    <Image source={{ uri: data.imageUrl }} style={styles.thumbnail} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    margin: '2%',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  thumbnail: {
    width: Dimensions.get('window').width * 0.94,
    height: Dimensions.get('window').width * 0.94,
    margin: Dimensions.get('window').width * 0.01,
  },
  details: {
    width: '95%',
    margin: '2%',
  },
});

export default PostItem;
