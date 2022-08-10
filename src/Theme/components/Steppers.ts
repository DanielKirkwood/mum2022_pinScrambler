import {StyleSheet} from 'react-native';
import {ThemeCommonParams} from './../theme.type';

export default function ({Colors, Gutters, Layout}: ThemeCommonParams) {
  const outline = {
    ...Layout.alignItemsCenter,
    ...Layout.justifyContentCenter,
    ...Gutters.regularHMargin,
    borderColor: Colors.white,
    borderRadius: 30,
    borderWidth: 2,
    height: 13,
    width: 13,
  };

  return StyleSheet.create({
    outline,
    filled: {
      ...outline,
      backgroundColor: Colors.white,
    },
  });
}
