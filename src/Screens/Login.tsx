import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button} from '../Components';
import {useTheme} from '../Hooks';
import {setUser} from '../Store/Pin';

function LoginScreen() {
  const {Common, Fonts, Gutters, Layout} = useTheme();

  const [userID, setUserID] = useState<number | null>(null);
  const dispatch = useDispatch();

  return (
    <View style={[Layout.colCenter, Layout.fullHeight]}>
      <View style={[Common.textInput, Gutters.largeHPadding]}>
        <TextInput
          autoFocus={true}
          keyboardType="numeric"
          placeholder="Type user ID here"
          onChangeText={uid => setUserID(Number(uid))}
          style={[Fonts.textRegular, Fonts.textCenter]}
        />
      </View>

      <Button
        title="Click to login"
        onPress={() => {
          dispatch(setUser(userID));
        }}
        textColor="black"
        bgColor="white"
      />
    </View>
  );
}

export default LoginScreen;