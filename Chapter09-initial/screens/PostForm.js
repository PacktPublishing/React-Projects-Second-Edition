import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';
import FormInput from '../components/FormInput';
import PostsContext from '../context/PostsContext';

export default function PostForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const { addPost } = useContext(PostsContext);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <TouchableOpacity style={styles.imageButton}>
          <Text style={styles.imageButtonText}>+</Text>
        </TouchableOpacity>
        <FormInput
          onChangeText={setDescription}
          value={description}
          placeholder='Description'
          textContentType='none'
        />
        <Button
          onPress={() => {
            if (imageUrl.length && description.length) {
              addPost(imageUrl, description);
              navigation.navigate('Posts');
            }
          }}
          label='Add post'
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '90%',
  },
  imageButton: {
    width: '100%',
    height: '50%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButtonText: {
    fontSize: 40,
    color: '#ccc',
  },
});
