import {Common, DefaultVariables, Fonts, Gutters, Layout} from '../Theme';

export default function () {
  const baseTheme = {
    Fonts: Fonts(DefaultVariables),
    Gutters: Gutters(DefaultVariables),
    Layout: Layout(),
    Common: Common({
      ...DefaultVariables,
      Layout: Layout(),
      Gutters: Gutters(DefaultVariables),
    }),
    ...DefaultVariables,
  };

  return baseTheme;
}
