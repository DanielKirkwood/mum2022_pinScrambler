import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type Props = {
  onPress: () => void;
  title: string;
  textColor: string;
  bgColor: string;
};

const Button = (props: Props) => {
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: props.bgColor,
        },
      ]}
      onPress={props.onPress}>
      <Text
        style={[
          styles.text,
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
