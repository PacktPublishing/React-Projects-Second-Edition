import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const PostContent = ({ data }) => (
  <View>
    <Image source={{ uri: data.imageUrl }} style={styles.thumbnail} />
    <View style={styles.details}>
      <Text>{data.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
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

export default PostContent;
