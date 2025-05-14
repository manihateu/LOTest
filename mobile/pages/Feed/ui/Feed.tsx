import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useGetPostsQuery } from '../lib/api';

const Feed = () => {
  const [offset, setOffset] = React.useState(0);
  const count = 20;

  const {
    data: postsData,
    isLoading,
    isFetching,
    error,
  } = useGetPostsQuery({ offset, count });

  const loadMore = () => {
    if (!isFetching && postsData && offset + count < postsData.count) {
      setOffset(offset + count);
    }
  };

  if (isLoading && offset === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Ошибка при загрузке постов</Text>
      </View>
    );
  }

  const posts = postsData?.items.map((item: any[]) => item[0]) || [];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: item.user.photo.xs }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>
          {item.user.firstName} {item.user.lastName}
        </Text>
      </View>
      <Text style={styles.postText}>{item.message}</Text>
      {item.photos?.length > 0 && (
        <Image
          source={{ uri: item.photos[0].photo.xs.src }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.postStats}>
        <Text style={styles.statItem}>❤️ {item.likes.count}</Text>
        <Text style={styles.statItem}>💬 {item.comments.count}</Text>
        <Text style={styles.statItem}>↪️ {item.reposts.count}</Text>
        <Text style={styles.statItem}>👀 {item.views.count}</Text>
      </View>
    </View>
  );

  return (
    <FlashList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      estimatedItemSize={200}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetching && offset > 0 ? (
          <ActivityIndicator size="small" style={styles.footerLoader} />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postText: {
    fontSize: 14,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    fontSize: 12,
    color: '#666',
  },
  footerLoader: {
    paddingVertical: 20,
  },
});

export default Feed;
