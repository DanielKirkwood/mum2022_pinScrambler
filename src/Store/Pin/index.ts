import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import shuffle from '../../Utilities/shuffle';

export interface SavedData {
  uid: number | null;
  pin: string;
  layout: 'normal' | 'random';
  timeToUnlock: number;
  numErrors: number;
}

export interface InformationData {
  uid: number | null;
  currentPin: string;
  layout: 'normal' | 'random';
  entryStatus: 'ready' | 'error' | 'not set' | 'success';
  currentAttempts: number;
  order: string[];
  data: SavedData[];
}

const initialState: InformationData = {
  uid: null,
  currentPin: '',
  layout: 'normal',
  entryStatus: 'not set',
  currentAttempts: 0,
  order: ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'],
  data: [],
};

export const pinSlice = createSlice({
  name: 'pin',
  initialState,
  reducers: {
    // set the given user in state
    setUser: (state, action: PayloadAction<number>) => {
      // log user in by setting them in state
      state.uid = action.payload;

      // reset the pin info
      state.currentAttempts = 0;
      state.entryStatus = 'not set';
      state.currentPin = '';

      // if user id even then give random layout by default
      const isEven = action.payload % 2 === 0;
      state.layout = isEven ? 'random' : 'normal';

      if (state.layout === 'random') {
        state.order = shuffle(state.order);
      } else {
        state.order = ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'];
      }
    },
    // set the given pin in state
    setCurrentPin: (state, action: PayloadAction<string>) => {
      state.currentPin = action.payload;
      state.entryStatus = 'ready';
      state.currentAttempts = 0;

      if (state.layout === 'random') {
        state.order = shuffle(state.order);
      } else {
        state.order = ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'];
      }
    },
    unlockPin: (state, action: PayloadAction<string>) => {
      // check user entered pin with registered pin
      const isMatching = state.currentPin === action.payload;

      // if not matching increase number of attempts
      if (!isMatching) {
        state.currentAttempts += 1;
      }

      // change the status if is matching
      state.entryStatus = isMatching ? 'success' : 'error';

      // reshuffle
      if (state.layout === 'random') {
        state.order = shuffle(state.order);
      }
    },
    // add to data list using currently signed in user, current pin and the given metrics
    addData: (
      state,
      action: PayloadAction<Pick<SavedData, 'timeToUnlock'>>,
    ) => {
      // create successful sign in data object
      const dataToAdd: SavedData = {
        uid: state.uid,
        pin: state.currentPin,
        layout: state.layout,
        timeToUnlock: action.payload.timeToUnlock,
        numErrors: state.currentAttempts,
      };
      state.data.push(dataToAdd);

      // reset metrics
      state.currentAttempts = 0;
      state.entryStatus = 'ready';
    },
    resetPin: state => {
      state.currentPin = '';
      state.entryStatus = 'not set';
    },
    // change the layout state
    swapLayout: state => {
      // if layout is normal, change to random, otherwise set to normal
      const isNormal = state.layout === 'normal';
      state.layout = isNormal ? 'random' : 'normal';

      if (state.layout === 'random') {
        state.order = shuffle(state.order);
      } else {
        state.order = ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'];
      }
    },
    // clear current signed in user data
    signUserOut: state => {
      state.uid = null;
      state.currentPin = '';
      state.layout = 'normal';
      state.order = ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'];
    },
    // clear all stored data
    clearAllData: state => {
      state.uid = null;
      state.currentPin = '';
      state.layout = 'normal';
      state.entryStatus = 'not set';
      state.currentAttempts = 0;
      state.order = ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'];
      state.data = [];
    },
    adminUnlock: state => {
      // reset metrics without adding to data
      state.currentAttempts = 0;
      state.entryStatus = 'ready';

      // reshuffle
      if (state.layout === 'random') {
        state.order = shuffle(state.order);
      }
    },
  },
});

export const {
  setUser,
  setCurrentPin,
  unlockPin,
  addData,
  resetPin,
  swapLayout,
  signUserOut,
  clearAllData,
  adminUnlock,
} = pinSlice.actions;
export default pinSlice.reducer;
