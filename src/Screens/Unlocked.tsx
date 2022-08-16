import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, PermissionsAndroid, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../Components';
import {RootStackParamList} from '../Navigators/utils';
import {RootState} from '../Store';
import type {SavedData} from '../Store/Pin';
import {clearAllData, signUserOut} from '../Store/Pin';
import {useTheme} from '../Theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Unlocked'>;

const downloadCSV = async (filename: string, data: SavedData[]) => {
  // create csv string from data object
  // code from https://dev.to/samueldjones/convert-an-array-of-objects-to-csv-string-in-javascript-337d
  const csvString = [
    ['uid', 'pin', 'pinEntered', 'success', 'layout', 'timeToUnlock'],
    ...data.map(item => [
      item.uid,
      item.pin,
      item.pinEntered,
      item.success,
      item.layout,
      item.timeToUnlock,
    ]),
  ]
    .map(e => e.join(','))
    .join('\n');

  const path = `${RNFS.DownloadDirectoryPath}/${filename}.csv`;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'MUM2022 PinScrambler Permission',
        message: 'We need permission to download the data to your file system.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const fileExists = await RNFS.exists(path);

      if (fileExists) {
        await RNFS.unlink(path);
      }

      await RNFS.writeFile(path, csvString, 'utf8');

      return Alert.alert('Success', `Wrote file to ${path}`);
    } else {
      return Alert.alert('Error', 'Permission Denied');
    }
  } catch (error) {
    console.log(error);

    return Alert.alert('Error', 'An error occurred');
  }
};

const UnlockedScreen = ({navigation}: Props) => {
  const {Fonts, Layout} = useTheme();

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.uid);
  const taskCompletion = useSelector(
    (state: RootState) => state.taskCompletion,
  );
  const currentPin = useSelector((state: RootState) => state.currentPin);
  const data = useSelector((state: RootState) => state.data);

  return (
    <View style={[Layout.colCenter, Layout.fullSize]}>
      <Text style={[Fonts.titleSmall, Fonts.textBlack]}>
        {`Unlocked - (uid ${loggedInUser})`}
      </Text>
      {taskCompletion === 'incomplete' && (
        <Text
          style={[
            Fonts.textRegular,
            Fonts.textBlack,
          ]}>{`Next PIN - ${currentPin}`}</Text>
      )}
      {taskCompletion === 'complete' && (
        <Text style={[Fonts.textRegular, Fonts.textBlack]}>
          All Tasks Completed!!!
        </Text>
      )}

      <View style={[Layout.row]}>
        {taskCompletion === 'incomplete' && (
          <Button
            title="Lock"
            onPress={() => {
              navigation.navigate('Locked');
            }}
            textColor="blue"
            bgColor="transparent"
          />
        )}
        <Button
          title="Download CSV"
          onPress={async () => {
            await downloadCSV('PinScrambler_Data', data);
          }}
          textColor="blue"
          bgColor="transparent"
        />
      </View>
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
