import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Card, Text, Avatar, IconButton } from 'react-native-paper';
import { fetchBirds } from '../api/birdsApi';
import { Bird } from '../domain/models/Birds';
// Importing AsyncStorage for data persistence
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { getRemovedBirds, addRemovedBird } from '../utils/storage';

// Importing Navigation and types 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

const PAGE_SIZE = 10;

export const HomeScreen = () => {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [displayedBirds, setDisplayedBirds] = useState<Bird[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (bird: Bird) => {
    console.log('Bird pressed:', bird);
    navigation.navigate('Detail', { bird });
  };

  const filterRemoved = useCallback((data: Bird[], removed: string[]) => {
    return data.filter(bird => !removed.includes(bird.uid));
  }, []);

  const loadInitialData = useCallback(async () => {
    setRefreshing(true);
    try {
      const [data, removed] = await Promise.all([fetchBirds(), getRemovedBirds()]);
      setRemovedIds(removed);
      const valid = filterRemoved(data, removed);
      setBirds(valid);
      setDisplayedBirds(valid.slice(0, PAGE_SIZE));
      setPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [filterRemoved]);

  const loadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const nextItems = birds.slice(start, start + PAGE_SIZE);
    setDisplayedBirds(prev => [...prev, ...nextItems]);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const handleRemove = async (uid: string) => {
    await addRemovedBird(uid);
    setDisplayedBirds(prev => prev.filter(b => b.uid !== uid));
    setBirds(prev => prev.filter(b => b.uid !== uid));
  };

  const renderRightActions = (uid: string) => (
    <IconButton
      icon="delete"
      size={28}
      onPress={() => handleRemove(uid)}
      style={{ justifyContent: 'center', marginRight: 12 }}
    />
  );

  const renderItem = ({ item }: { item: Bird }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.uid)}>
      <Card style={{ margin: 8 }} onPress={() => handlePress(item)}>
        <Card.Title
          title={item.name.spanish}
          subtitle={`${item.name.english} / ${item.name.latin}`}
          left={(props) => <Avatar.Image {...props} source={{ uri: item.images.thumb }} />}
        />
      </Card>
    </Swipeable>
  );

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={displayedBirds}
        keyExtractor={(item) => item.uid}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadInitialData} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator animating /> : null}
      />
    </View>
  );
};
