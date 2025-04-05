import React from 'react';
import { ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { Card, Text, Title, Paragraph, Modal } from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export const DetailScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const { bird } = route.params;

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'transparent', padding: 20 };

    return (
        <>
            <ScrollView style={{ padding: 16 }}>
                <Card style={{ marginBottom: 16 }} onPress={showModal}>
                    <Card.Cover source={{ uri: bird.images.full }} resizeMode="contain" />
                    <Card.Title
                        title={bird.name.spanish}
                        subtitle={`${bird.name.english} / ${bird.name.latin}`} />
                </Card>

                <Card>
                    <Card.Content>
                        <Title>Información disponible</Title>
                        <Paragraph style={{ marginTop: 8 }}>
                            <Text variant="labelMedium">ID:</Text> {bird.uid}
                        </Paragraph>
                        <Paragraph>
                            <Text variant="labelMedium">Orden:</Text> {bird.sort}
                        </Paragraph>
                        <Paragraph>
                            <Text variant="labelMedium">Enlace:</Text> {bird._links.self}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>

            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Image
                    source={{ uri: bird.images.full }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                    onTouchEnd={hideModal}
                />
            </Modal>
        </>
    );
};
