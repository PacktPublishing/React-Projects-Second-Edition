import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import PostsContext from '../context/PostsContext';
import PostItem from '../components/PostItem';

export default function Posts() {
  const navigation = useNavigation();

  const { loading, error, posts, fetchPosts } = useContext(PostsContext);

  useEffect(() => {
    (!posts || !posts.length) && fetchPosts();
  }, [fetchPosts, posts]);

  return (
    <ScrollView style={styles.container}>
      {loading || error ? (
        <Text style={styles.message}>{error || 'Loading...'}</Text>
      ) : (
        posts &&
        posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() =>
              navigation.navigate('PostDetail', { postId: post.id })
            }
          >
            <PostItem key={post.id} data={post} />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  message: {
    fontSize: 20,
    color: 'black',
  },
  list: {
    width: '100%',
  },
});
