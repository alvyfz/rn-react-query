import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import usePost from '../hooks/usePost';
import {Text} from '../components/Text';
import colors from '../constants/colors';
import {Networks} from '../networks/factory';
import baseURL from '../networks/baseURL';
import {POST_ENDPOINT} from '../networks/endpoint';

export const Post = ({route}) => {
  const {post} = route && route.params;
  const {
    data: commentss,
    isSuccess: isSuccess2,
    isLoading: isLoading2,
  } = usePost(post.id);

  const service = Networks(baseURL);
  const {
    data: comments,
    isLoading,
    isSuccess,
  } = service.query(
    POST_ENDPOINT.GET.postDetail,
    ['getPostDetail', post.id],
    {},
    {
      params: {
        postId: post.id,
      },
    },
  );

  console.log(comments, '1 comments');
  // console.log(commentss, '2');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{post.title}</Text>
      <View style={styles.post}>
        <Text>{post.body}</Text>
      </View>
      {isLoading && <Text style={{textAlign: 'center'}}>Loading...</Text>}

      {isSuccess && (
        <React.Fragment>
          <Text style={styles.commentHeader}>Comments</Text>
          {comments?.map(comment => (
            <View key={comment.id} style={styles.post}>
              <Text>{comment.body}</Text>
              <Text>{comment.email}</Text>
            </View>
          ))}
        </React.Fragment>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 30,
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 40,
    color: colors.primary,
    paddingVertical: 10,
  },
  commentHeader: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.primary,
    paddingVertical: 30,
  },
  post: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
