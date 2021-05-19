import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import PostsContext from '../context/PostsContext';
import PostItem from '../components/PostItem.ios';

export default function Posts() {
  const navigation = useNavigation();

  const { loading, error, posts, fetchPosts } = useContext(PostsContext);

  useEffect(() => {
    (!posts || !posts.length) && fetchPosts();
  }, [fetchPosts, posts]);

  return (
    <View style={styles.container}>
      {loading || error ? (
        <Text style={styles.message}>{error || 'Loading...'}</Text>
      ) : (
        posts && (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PostDetail', { postId: item.id })
                }
              >
                <PostItem data={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      )}
    </View>
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
});
