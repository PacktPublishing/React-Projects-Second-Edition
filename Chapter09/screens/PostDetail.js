import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PostsContext from '../context/PostsContext';
import PostItem from '../components/PostItem';

const PostDetail = () => {
  const route = useRoute();
  const { postId } = route.params;

  const { loading, error, post, fetchPost } = useContext(PostsContext);

  useEffect(() => {
    postId && !post.id && fetchPost(postId);
  }, [postId]);

  return (
    <View style={styles.container}>
      {loading || error ? (
        <Text style={styles.message}>{error || 'Loading...'}</Text>
      ) : (
        post && <PostItem data={post} />
      )}
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  message: {
    fontSize: 20,
    color: 'black',
  },
});
