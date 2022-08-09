import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../Components';
import type {RootStackParamList} from '../Navigators/utils';
import {RootState} from '../Store';
import {addData, adminUnlock, setCurrentPin, unlockPin} from '../Store/Pin';

type Props = NativeStackScreenProps<RootStackParamList, 'Locked'>;

const LockedScreen = ({navigation}: Props) => {
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
        <View
          style={{
            flexDirection: 'row',
            margin: 0,
            padding: 0,
          }}>
          <View
            style={[styles.circleLine, numFilled >= 1 && styles.circleFill]}
          />
          <View
            style={[styles.circleLine, numFilled >= 2 && styles.circleFill]}
          />
          <View
            style={[styles.circleLine, numFilled >= 3 && styles.circleFill]}
          />
          <View
            style={[styles.circleLine, numFilled >= 4 && styles.circleFill]}
          />
        </View>
      </View>
    );
  };

  const renderPinButton = (number: string) => {
    return (
      <TouchableOpacity
        onPress={() => setUserPin(userPin + number)}
        style={styles.circleButton}>
        <Text style={styles.number}>{number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'column',
              margin: 0,
              padding: 30,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                paddingBottom: 15,
                fontSize: 20,
                color: 'white',
              }}>
              {status === 'not set' && 'Set PIN'}
              {status === 'error' && 'Incorrect PIN'}
              {status === 'ready' && 'Enter PIN'}
            </Text>
            {renderStepper(userPin.length)}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            margin: 0,
            padding: 0,
          }}>
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

        <View
          style={{
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', //Here is the trick
            bottom: 25,
            alignSelf: 'flex-start',
          }}>
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

        <View
          style={{
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', //Here is the trick
            bottom: 25,
            alignSelf: 'flex-end',
          }}>
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
  container: {
    flex: 1,
    backgroundColor: 'rgba(99,102,106, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  circleLine: {
    marginHorizontal: 15,
    height: 13,
    width: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  circleFill: {
    backgroundColor: 'white',
  },
  circleButton: {
    margin: 10,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 160,
    backgroundColor: 'rgb(128,128,128)',
  },
  number: {
    color: 'white',
    fontSize: 24,
  },
  twoButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LockedScreen;
