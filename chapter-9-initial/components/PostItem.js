import React from 'react';
import { StyleSheet, Text, Dimensions, Image, View } from 'react-native';

const PostItem = ({ data }) => (
  <View style={styles.container}>
    <Image source={{ uri: data.imageUrl }} style={styles.thumbnail} />
    <View style={styles.details}>
      <Text>{data.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: '2%',
  },
  thumbnail: {
    width: Dimensions.get('window').width * 0.98,
    height: Dimensions.get('window').width * 0.98,
    margin: Dimensions.get('window').width * 0.01,
  },
  details: {
    width: '95%',
    margin: '2%',
  },
});

export default PostItem;
