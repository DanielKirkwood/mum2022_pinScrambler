import React from 'react';
import {Pressable, Text} from 'react-native';
import {useTheme} from '../Hooks';

type Props = {
  onPress: () => void;
  title: string;
  textColor: string;
  bgColor: string;
};

const Button = (props: Props) => {
  const {Common, Fonts, Gutters} = useTheme();

  return (
    <Pressable
      style={[
        Common.button.rounded,
        Gutters.regularTMargin,
        {
          backgroundColor: props.bgColor,
        },
      ]}
      onPress={props.onPress}>
      <Text
        style={[
          Fonts.textRegular,
          {
            color: props.textColor,
          },
        ]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default Button;
