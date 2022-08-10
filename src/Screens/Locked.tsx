import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../Components';
import type {RootStackParamList} from '../Navigators/utils';
import {RootState} from '../Store';
import {addData, adminUnlock, setCurrentPin, unlockPin} from '../Store/Pin';
import {useTheme} from '../Theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Locked'>;

const LockedScreen = ({navigation}: Props) => {
  const {Common, Fonts, Colors, Layout, Gutters} = useTheme();

  // data required from store
  const status = useSelector((state: RootState) => state.entryStatus);
  const order = useSelector((state: RootState) => state.order);

  const attempts = useSelector((state: RootState) => state.currentAttempts);
  const dispatch = useDispatch();

  // update userPin as user enters it
  const [userPin, setUserPin] = useState<string>('');

  // store first input button click
  const [firstTime, setFirstTime] = useState<number>();

  useEffect(() => {
    // when user enters pin, set it as currentPin or attempt unlock
    if (userPin.length === 4) {
      if (status === 'not set') {
        dispatch(setCurrentPin(userPin));
      } else {
        dispatch(unlockPin(userPin));
      }

      // clear user input
      setUserPin('');
    }

    // if it is the users first attempt at entering their pin, save the time
    if (userPin.length === 1 && attempts === 0 && status !== 'not set') {
      setFirstTime(Date.now());
    }
    // if user successfully signs in
    if (status === 'success') {
      // measure time between first button click and now
      const lastTime: number = Date.now();

      if (firstTime !== undefined && lastTime !== undefined) {
        let time: number = lastTime - firstTime;

        // add user data to state
        dispatch(addData({timeToUnlock: time}));
        navigation.navigate('Unlocked');
      }
    }

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPin]);

  const renderStepper = (numFilled: number) => {
    return (
      <View>
        <View style={[Layout.row]}>
          <View
            style={[
              numFilled >= 1 ? Common.stepper.filled : Common.stepper.outline,
            ]}
          />
          <View
            style={[
              numFilled >= 2 ? Common.stepper.filled : Common.stepper.outline,
            ]}
          />
          <View
            style={[
              numFilled >= 3 ? Common.stepper.filled : Common.stepper.outline,
            ]}
          />
          <View
            style={[
              numFilled >= 4 ? Common.stepper.filled : Common.stepper.outline,
            ]}
          />
        </View>
      </View>
    );
  };

  const renderPinButton = (number: string) => {
    return (
      <TouchableOpacity
        onPress={() => setUserPin(userPin + number)}
        style={[Common.button.pinInput]}>
        <Text style={[Fonts.textRegular]}>{number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        Layout.fullSize,
        Layout.alignItemsCenter,
        Layout.justifyContentCenter,
        Gutters.smallPadding,
        {
          backgroundColor: Colors.backgroundColor,
        },
      ]}>
      <View
        style={[
          Layout.fullSize,
          Layout.alignItemsCenter,
          Layout.justifyContentCenter,
        ]}>
        <View>
          <View
            style={[
              Layout.alignItemsCenter,
              Layout.column,
              Gutters.zeroMargin,
              Gutters.largePadding,
            ]}>
            <Text style={[Fonts.textRegular, Gutters.smallBPadding]}>
              {status === 'not set' && 'Set PIN'}
              {status === 'error' && 'Incorrect PIN'}
              {status === 'ready' && 'Enter PIN'}
            </Text>
            {renderStepper(userPin.length)}
          </View>
        </View>

        <View style={[Layout.row]}>
          <View>
            <View>{renderPinButton(order[0])}</View>
            <View>{renderPinButton(order[1])}</View>
            <View>{renderPinButton(order[2])}</View>
          </View>
          <View>
            <View>{renderPinButton(order[3])}</View>
            <View>{renderPinButton(order[4])}</View>
            <View>{renderPinButton(order[5])}</View>
          </View>
          <View>
            <View>{renderPinButton(order[6])}</View>
            <View>{renderPinButton(order[7])}</View>
            <View>{renderPinButton(order[8])}</View>
          </View>
        </View>
        <View>
          <View>{renderPinButton(order[9])}</View>
        </View>

        <View style={styles.positionBottomLeft}>
          <Button
            title="Unlock"
            onPress={() => {
              setUserPin('');
              dispatch(adminUnlock());
              navigation.navigate('Unlocked');
            }}
            textColor="white"
            bgColor="transparent"
          />
        </View>

        <View style={styles.positionBottomRight}>
          <Button
            title="Delete"
            onPress={() => setUserPin(userPin.substring(0, userPin.length - 1))}
            textColor="white"
            bgColor="transparent"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  positionBottomRight: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    alignSelf: 'flex-end',
  },
  positionBottomLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    alignSelf: 'flex-start',
  },
});

export default LockedScreen;
