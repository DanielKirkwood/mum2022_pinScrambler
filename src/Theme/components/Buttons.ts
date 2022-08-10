import {StyleSheet} from 'react-native';
import {ThemeCommonParams} from './../theme.type';

export default function ({Colors, Gutters, Layout}: ThemeCommonParams) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  };
  const rounded = {
    ...base,
    borderRadius: 20,
  };

  const pinInput = {
    ...Layout.center,
    ...Layout.alignItemsCenter,
    ...Gutters.smallMargin,
    height: 80,
    width: 80,
    borderRadius: 160,
    backgroundColor: 'rgb(128,128,128)',
  };

  return StyleSheet.create({
    base,
    rounded,
    pinInput,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  });
}
