import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Image,
    Modal,
    View,
    StyleSheet,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { BirdDetail } from '../domain/models/BirdDetail';
import { Card, Text, Title, Paragraph, Divider } from 'react-native-paper';
import { SvgCssUri } from 'react-native-svg/css';
import { getBirdDetail } from '../api/birdsApi';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const { width } = Dimensions.get('window');

export const DetailScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const { url } = route.params;

    const [bird, setBird] = useState<BirdDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const fetchBirdDetail = async () => {
        try {
          const data = await getBirdDetail(url);
          setBird(data);
        } catch (e) {
          console.error('Error al obtener detalles del ave:', e);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchBirdDetail();
    }, []);

    if (loading || !bird) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView style={{ padding: 16 }}>

            <Card style={{ marginBottom: 16 }} onPress={showModal} >
                <Card.Cover
                    source={{ uri: bird.images.main }}
                    resizeMode="contain"
                />
            </Card>

            <Card.Title
                title={bird.name.spanish}
                subtitle={`${bird.name.english} / ${bird.name.latin}`}
            />

            <Card style={{ marginVertical: 12 }}>

                <Card.Content>
                    <Title>🗺️ Ubicación</Title>
                    <View style={styles.mapContainer}>
                        {bird.map.image ? (
                            <SvgCssUri
                                uri={bird.map.image}
                                style={styles.mapImage}
                            />
                        ) : (
                            <Paragraph>Mapa no disponible.</Paragraph>
                        )}
                    </View>

                    <Paragraph>{bird.map.title}</Paragraph>
                </Card.Content>
            </Card>

            <Card style={{ marginBottom: 12 }}>
                <Card.Content>
                    <Title>🛡️ Estado de conservación</Title>
                    {bird.iucn.title ? (
                        <>
                            <Text variant="titleMedium">{bird.iucn.title}</Text>
                            <Paragraph>{bird.iucn.description}</Paragraph>
                        </>

                    ) : (
                        <Paragraph>No disponible.</Paragraph>
                    )}
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>
                    <Title>ℹ️ Información</Title>
                    <Divider style={{ marginVertical: 8 }} />
                    <Paragraph><Text variant="labelMedium">Especie:</Text> {bird.species}</Paragraph>
                    <Paragraph><Text variant="labelMedium">Orden:</Text> {bird.order}</Paragraph>
                    <Paragraph><Text variant="labelMedium">Hábitat:</Text> {bird.habitat}</Paragraph>
                    <Paragraph><Text variant="labelMedium">Tamaño:</Text> {bird.size}</Paragraph>
                    <Paragraph><Text variant="labelMedium">¿Sabías que?:</Text> {bird.didyouknow}</Paragraph>
                </Card.Content>
            </Card>

            <Modal visible={visible} onDismiss={hideModal} transparent>
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: bird.images.main }}
                        style={styles.fullImage}
                        resizeMode="contain"
                        onTouchEnd={hideModal}
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    fullImage: { width: '100%', height: '100%' },
    modalContainer: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
    mapContainer: {
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapImage: {
        width: '100%',
        height: width * 0.9,
        backgroundColor: 'transparent',
        resizeMode: 'cover',
    },
});
