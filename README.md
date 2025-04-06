# 📱 Aves de Chile - Banco Bice Lab

App hecha en React Native CLI + TypeScript que consume la API pública de aves chilenas de https://aves.ninjas.cl/api/birds.

Desarrollada por [Eduardo Saavedra](https://www.saavedratech.dev/) como parte del test técnico para Banco Bice.

La app permite visualizar una lista de aves chilenas con los siguientes requisitos técnicos:

- Lista de aves con nombre en español, inglés y latín, y su imagen miniatura.
- Scroll infinito de 10 ítems por carga.
- Pull-to-refresh para actualizar la lista desde la API.
- Swipe para eliminar aves, con persistencia en almacenamiento local.
- Pantalla de detalle con información extendida incluyendo:
  - Imagen principal del ave.
  - Mapa SVG del hábitat.
  - Estado de conservación IUCN.
  - Especie, orden, hábitat, medidas, y curiosidades.
- Modal para ver imagen en pantalla completa.
- Persistencia offline tanto para la lista de aves como para el detalle de cada ave.
- Test unitario mínimo incluido.
- Layout bloqueado en orientación portrait.
- README completo con instrucciones de instalación, ejecución y despliegue en dispositivos físicos.

## Estructura del proyecto
```bash
src/
├── api/                  ← llamadas HTTP a la API de aves y detalle
├── components/           ← componentes reutilizables (si se agregan)
├── domain/
│   └── models/           ← interfaces TypeScript (Bird, BirdDetail)
├── navigation/           ← stack de navegación (Home → Detail)
├── screens/              ← vistas principales (HomeScreen, DetailScreen)
├── tests/                ← test unitario para getBirdDetail
├── utils/                ← almacenamiento local (AsyncStorage)
```


Requisitos previos:

- Node.js ≥ 16
- npm o yarn
- React Native CLI (`npm install -g react-native-cli`)
- Android Studio con emulador o dispositivo Android
- Xcode (solo en macOS) para correr en iOS o en dispositivo iPhone

## Instalación del proyecto:

1. Clonar el repositorio:
```bash
git clone https://github.com/eduar766/ChallengeBk
cd ChallengeBk
```

2. Instalar las dependencias:
```bash
npm install
```

3. Instalar pods para iOS:
```bash
cd ios && pod install && cd ..
```

4. Para ejecutar
```bash
# Android
npm run android

# iOS
npm run ios
```

5. Instalación en dispositivo físico:

- Android:
  - Activar el modo desarrollador y la depuración USB en tu teléfono.
  - Conectarlo por USB.
  - Ejecutar:
```bash
npm run android
```

- Iphone:
  - Abrir el proyecto con Xcode:
```bash
open ios/ChallengeBk.xcworkspace
```
  - Seleccionar tu dispositivo físico.
  - En la sección Signing & Capabilities, seleccionar tu Apple ID.
  - Ejecutar con Cmd + R o el botón ▶.

6. Ejecutar los tests:
```bash
npm run test
```


## 🙏 Agradecimientos

Agradezco la oportunidad de participar en este proceso técnico. 

Quedo atento a cualquier observación o sugerencia. Muchas gracias por su tiempo y consideracion.