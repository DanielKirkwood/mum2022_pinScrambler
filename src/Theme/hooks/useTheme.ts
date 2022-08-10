import Common from '../Common';
import Fonts from '../Fonts';
import Gutters from '../Gutters';
import Layout from '../Layout';
import {Theme} from '../theme.type';
import * as DefaultVariables from '../Variables';
import {ThemeCommon, ThemeVariables} from './../theme.type';

export default function () {
  const themeVariables = DefaultVariables as ThemeVariables;

  const baseTheme: Theme = {
    Fonts: Fonts(themeVariables),
    Gutters: Gutters(themeVariables),
    Layout: Layout(),
    Common: Common({
      ...themeVariables,
      Layout: Layout(),
      Gutters: Gutters(themeVariables),
    }) as ThemeCommon,
    ...themeVariables,
  };

  return baseTheme;
}
