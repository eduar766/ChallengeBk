import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, Card, Text, Avatar } from 'react-native-paper';
import { fetchBirds } from '../api/birdsApi';
import { Bird } from '../domain/models/Birds';

const PAGE_SIZE = 10;

export const HomeScreen = () => {
    const [birds, setBirds] = useState<Bird[]>([]);
    const [displayedBirds, setDisplayedBirds] = useState<Bird[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);

    const loadInitialData = useCallback(async () => {
        try {
            setRefreshing(true);
            const data = await fetchBirds();
            setBirds(data);
            setDisplayedBirds(data.slice(0, PAGE_SIZE));
            setPage(1);
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    }, []);

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

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    const renderItem = ({ item }: { item: Bird }) => (
        <Card style={{ margin: 8 }}>
            <Card.Title
                title={`${item.name.spanish}`}
                subtitle={`${item.name.english} / ${item.name.latin}`}
                left={(props) => <Avatar.Image {...props} source={{ uri: item.images.thumb }} />}
            />
        </Card>
    );

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
