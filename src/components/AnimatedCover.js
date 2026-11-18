import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, StyleSheet } from 'react-native';
import { PrintTexture } from './PrintTexture';

const travel = 36;

export function AnimatedCover() {
  const offset = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    let useInitialPreference = true;
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', value => {
      useInitialPreference = false;
      setReduceMotion(value);
    });
    AccessibilityInfo.isReduceMotionEnabled().then(value => {
      if (useInitialPreference) setReduceMotion(value);
    }, () => {});
    return () => {
      useInitialPreference = false;
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const glide = toValue => Animated.timing(offset, {
      toValue, duration: 6000, easing: Easing.inOut(Easing.sin),
      useNativeDriver: Platform.OS !== 'web', isInteraction: false
    });
    const animation = Animated.loop(Animated.sequence([glide(travel), glide(0)]));
    animation.start();
    return () => {
      animation.stop();
      offset.setValue(0);
    };
  }, [offset, reduceMotion]);

  if (reduceMotion) return <PrintTexture dark />;
  return (
    <Animated.View pointerEvents="none" style={[styles.layer, { transform: [{ translateX: offset }] }]}>
      <PrintTexture dark />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  layer: { ...StyleSheet.absoluteFillObject, left: -travel }
});
