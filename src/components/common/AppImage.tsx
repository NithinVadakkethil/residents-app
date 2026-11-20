/**
 * Reusable AppImage Component
 * Handles remote URLs, network failures, and fallback gracefully
 */

import React, { useState } from 'react';
import {
  Image,
  ImageProps,
  View,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { BuildingIcon } from './Icons';
import { colors } from '../../theme';

interface AppImageProps extends Omit<ImageProps, 'source'> {
  uri?: string | null;
  fallbackIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  style?: ImageStyle;
}

export const AppImage: React.FC<AppImageProps> = ({
  uri,
  fallbackIcon,
  containerStyle,
  style,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(uri));

  const shouldShowFallback = !uri || hasError;

  return (
    <View style={[styles.container, containerStyle]}>
      {!shouldShowFallback ? (
        <>
          <Image
            source={{ uri }}
            style={[styles.image, style]}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            {...rest}
          />
          {isLoading && (
            <View style={[styles.loadingOverlay, style]}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          )}
        </>
      ) : (
        <View style={[styles.fallbackContainer, style]}>
          {fallbackIcon || <BuildingIcon size={24} color={colors.primary} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerLow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryContainer,
  },
});
