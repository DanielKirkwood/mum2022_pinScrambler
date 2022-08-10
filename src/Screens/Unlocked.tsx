import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../Components';
import {RootStackParamList} from '../Navigators/utils';
import {RootState} from '../Store';
import type {SavedData} from '../Store/Pin';
import {clearAllData, resetPin, signUserOut, swapLayout} from '../Store/Pin';
import {useTheme} from '../Theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Unlocked'>;

const downloadCSV = async (filename: string, data: SavedData[]) => {
  // create csv string from data object
  // code from https://dev.to/samueldjones/convert-an-array-of-objects-to-csv-string-in-javascript-337d
  const csvString = [
    ['uid', 'pin', 'layout', 'timeToUnlock', 'numErrors'],
    ...data.map(item => [
      item.uid,
      item.pin,
      item.layout,
      item.timeToUnlock,
      item.numErrors,
    ]),
  ]
    .map(e => e.join(','))
    .join('\n');

  const path = `${RNFS.DownloadDirectoryPath}/${filename}.csv`;

  try {
    await RNFS.writeFile(path, csvString, 'utf8');

    return Alert.alert('Success', `Wrote file to ${path}`);
  } catch (error) {
    return Alert.alert('Error', 'An error occurred');
  }
};

const UnlockedScreen = ({navigation}: Props) => {
  const {Fonts, Layout} = useTheme();

  const dispatch = useDispatch();
  const layout = useSelector((state: RootState) => state.layout);
  const loggedInUser = useSelector((state: RootState) => state.uid);
  const currentPin = useSelector((state: RootState) => state.currentPin);
  const data = useSelector((state: RootState) => state.data);
  const isNormal = layout === 'normal';
  const buttonTitle = isNormal ? 'Random' : 'Normal';

  return (
    <View style={[Layout.colCenter, Layout.fullSize]}>
      <Text style={[Fonts.titleSmall, Fonts.textBlack]}>
        {`Unlocked - (uid ${loggedInUser})`}
      </Text>
      <View style={[Layout.row]}>
        <Button
          title="Lock"
          onPress={() => {
            navigation.navigate('Locked');
          }}
          textColor="blue"
          bgColor="transparent"
        />

        <Button
          title={currentPin === '' ? 'Set PIN' : 'Change PIN'}
          onPress={() => {
            dispatch(resetPin());
            navigation.navigate('Locked');
          }}
          textColor="blue"
          bgColor="transparent"
        />
      </View>
      <Button
        title={`Change Layout To ${buttonTitle}`}
        onPress={() => {
          dispatch(swapLayout());
          navigation.navigate('Locked');
        }}
        textColor="blue"
        bgColor="transparent"
      />
      <Button
        title="Download CSV"
        onPress={async () => {
          await downloadCSV('PinScrambler_Data', data);
        }}
        textColor="blue"
        bgColor="transparent"
      />

      <View style={[Layout.row]}>
        <Button
          title="Delete All Data"
          onPress={() => {
            dispatch(clearAllData());
          }}
          textColor="red"
          bgColor="transparent"
        />

        <Button
          title="Log Out"
          onPress={() => {
            dispatch(signUserOut());
          }}
          textColor="red"
          bgColor="transparent"
        />
      </View>
    </View>
  );
};

export default UnlockedScreen;
