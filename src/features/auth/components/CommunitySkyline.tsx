/**
 * Community Skyline Illustration (Native SVG)
 * Source of Truth: Stitch Screen 03_OTP_Verification
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Path,
} from 'react-native-svg';

export const CommunitySkyline: React.FC = () => {
  return (
    <View style={styles.container}>
      <Svg width="100%" height={110} viewBox="0 0 340 120" fill="none">
        <Defs>
          <LinearGradient id="orbitSkylineGrad" x1="170" y1="0" x2="170" y2="120" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#9FF1EB" stopOpacity="0.8" />
            <Stop offset="70%" stopColor="#AFEEE9" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#F7F9FF" stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="orbitBldgGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#276865" stopOpacity="0.18" />
            <Stop offset="100%" stopColor="#006B67" stopOpacity="0.04" />
          </LinearGradient>
        </Defs>

        {/* Ambient Sun Backdrop Arc */}
        <Circle cx="170" cy="80" r="54" fill="url(#orbitSkylineGrad)" />

        {/* Background Silhouettes */}
        <Rect x="52" y="55" width="22" height="48" rx="2" fill="#93D2CD" fillOpacity={0.4} />
        <Rect x="78" y="42" width="26" height="61" rx="2" fill="#93D2CD" fillOpacity={0.5} />
        <Rect x="238" y="48" width="24" height="55" rx="2" fill="#93D2CD" fillOpacity={0.4} />
        <Rect x="266" y="58" width="20" height="45" rx="2" fill="#93D2CD" fillOpacity={0.3} />

        {/* Left Building */}
        <Path d="M110 32H144V108H110V32Z" fill="url(#orbitBldgGrad)" />
        <Rect x="116" y="38" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="127" y="38" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="116" y="50" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="127" y="50" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="116" y="62" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="127" y="62" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="116" y="74" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="127" y="74" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />

        {/* Center Tower Landmark */}
        <Path d="M148 18H192V108H148V18Z" fill="#2C6C69" fillOpacity={0.14} />
        <Path d="M166 8L174 8L171 18L169 18Z" fill="#276865" fillOpacity={0.4} />
        <Rect x="156" y="24" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="168" y="24" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="180" y="24" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="156" y="38" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="168" y="38" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="180" y="38" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="156" y="52" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="168" y="52" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="180" y="52" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="156" y="66" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="168" y="66" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="180" y="66" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity={0.9} />

        {/* Right Building */}
        <Path d="M196 28H230V108H196V28Z" fill="url(#orbitBldgGrad)" />
        <Rect x="204" y="35" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="215" y="35" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="204" y="47" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="215" y="47" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="204" y="59" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="215" y="59" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="204" y="71" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
        <Rect x="215" y="71" width="5" height="7" rx="1" fill="#FFFFFF" fillOpacity={0.9} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.95,
  },
});
