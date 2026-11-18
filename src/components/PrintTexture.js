import { Image, StyleSheet, View } from 'react-native';

const paper = require('../assets/papel-lavanda.jpg');
const ink = require('../assets/tinta-ameixa.jpg');

export function PrintTexture({ dark = false }) {
  return (
    <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={StyleSheet.absoluteFill}>
      <Image accessible={false} source={dark ? ink : paper} resizeMode="cover" style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({ image: { width: '100%', height: '100%' } });
