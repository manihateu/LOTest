import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useLazyGetPostsQuery } from '../lib/api';

const Feed = () => {
  const [offset, setOffset] = React.useState(0);
  const count = 20;

  const [trigger, {isFetching, data: postsData, isLoading, isError, error}] = useLazyGetPostsQuery();

  useEffect(() => {
    const update = async () => {
        try {
            await trigger({ offset, count });
        } catch (error) {
            console.log(error)
        }
    };
    update();
  }, [offset, trigger]);

  const loadMore = () => {
    console.log("trigger")
    if (!isFetching && postsData && offset + count < postsData.data.count) {
      setOffset(offset + count);
    }
  };

  console.log(offset)

  if (isLoading && offset === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    console.log(error);
    return (

      <View style={styles.center}>
        <Text>Ошибка при загрузке постов</Text>
      </View>
    );
  }
  console.log(postsData);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>

        <Text style={styles.userName}>
          {item.user.firstName} {item.user.lastName}
        </Text>
      </View>
      <Text style={styles.postText}>{item.message}</Text>
      {/* {item.photos?.length > 0 && (
        <Image
          source={{ uri: item.photos[0].photo.xs.src }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )} */}
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
      data={postsData?.data.items}
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
