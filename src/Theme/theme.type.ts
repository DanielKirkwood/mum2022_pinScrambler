import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type StyleType = TextStyle & ViewStyle & ImageStyle;

export type ThemeColors = {[key: string]: string};
export type ThemeFontSize = {[key: string]: number};
export type ThemeMetricsSizes = {[key: string]: number | string};

export type ThemeVariables = {
  Colors: ThemeColors;
  FontSize: ThemeFontSize;
  MetricsSizes: ThemeMetricsSizes;
};

export type ThemeFonts = {[key: string]: TextStyle};
export type ThemeLayout = {[key: string]: StyleType};
export type ThemeGutters = {[key: string]: StyleType};
export type ThemeCommon = {
  [key: string]: StyleType;
  button: {[key: string]: StyleType};
  stepper: {[key: string]: StyleType};
};

export type Theme = {
  Colors: ThemeColors;
  FontSize: ThemeFontSize;
  MetricsSizes: ThemeMetricsSizes;
  Fonts: ThemeFonts;
  Layout: ThemeLayout;
  Gutters: ThemeGutters;
  Common: ThemeCommon;
  Variables?: Partial<ThemeVariables>;
};

export interface ThemeCommonParams {
  Colors: ThemeColors;
  FontSize: ThemeFontSize;
  MetricsSizes: ThemeMetricsSizes;
  Fonts?: ThemeFonts;
  Layout: ThemeLayout;
  Gutters: ThemeGutters;
  Variables?: Partial<ThemeVariables>;
}
