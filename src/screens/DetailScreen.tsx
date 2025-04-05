import React from 'react';
import { ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { Card, Text, Title, Paragraph } from 'react-native-paper';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const { bird } = route.params;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Cover source={{ uri: bird.images.full }} resizeMode="cover"/>
        <Card.Title
          title={bird.name.spanish}
          subtitle={`${bird.name.english} / ${bird.name.latin}`}
        />
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
  );
};
