import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button} from '../Components';
import {setUser} from '../Store/Pin';
import {useTheme} from '../Theme';

function LoginScreen() {
  const {Common, Fonts, Gutters, Layout, Colors} = useTheme();

  const [userID, setUserID] = useState<number>(100);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  return (
    <View style={[Layout.colCenter, Layout.fullHeight]}>
      <Text
        style={[
          Fonts.textSmall,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            color: 'red',
          },
        ]}>
        {error}
      </Text>
      <View style={[Common.textInput, Gutters.largeHPadding]}>
        <TextInput
          autoFocus={true}
          keyboardType="numeric"
          placeholder="Type user ID here"
          onChangeText={uid => setUserID(Number(uid))}
          style={[
            Fonts.textRegular,
            Fonts.textCenter,
            {
              color: Colors.black,
            },
          ]}
        />
      </View>

      <Button
        title="Click to login"
        onPress={() => {
          if (userID > 16 || userID <= 0) {
            setError('Please type a valid user ID');
            return;
          }
          dispatch(setUser(userID));
        }}
        textColor="black"
        bgColor="white"
      />
    </View>
  );
}

export default LoginScreen;
