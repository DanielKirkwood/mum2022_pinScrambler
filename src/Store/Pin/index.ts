import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {shuffle} from './utils';

export interface SavedData {
  uid: number | null;
  pin: string;
  pinEntered: string;
  success: boolean;
  layout: 'normal' | 'random';
  timeToUnlock: number;
}

export interface InformationData {
  uid: number | null;
  currentPin: string;
  layout: 'normal' | 'random';
  entryStatus: 'ready' | 'not set';
  order: string[];
  data: SavedData[];
}

const initialState: InformationData = {
  uid: null,
  currentPin: '',
  layout: 'normal',
  entryStatus: 'not set',
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

      if (state.layout === 'random') {
        state.order = shuffle(state.order);
      } else {
        state.order = ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'];
      }
    },
    unlockPin: (
      state,
      action: PayloadAction<{pinEntered: string; timeToUnlock: number}>,
    ) => {
      // check user entered pin with registered pin
      const isMatching = state.currentPin === action.payload.pinEntered;

      // create successful sign in data object
      const dataToAdd: SavedData = {
        uid: state.uid,
        pin: state.currentPin,
        pinEntered: action.payload.pinEntered,
        success: isMatching,
        layout: state.layout,
        timeToUnlock: action.payload.timeToUnlock,
      };
      state.data.push(dataToAdd);

      state.entryStatus = 'ready';

      // reshuffle
      if (state.layout === 'random') {
        state.order = shuffle(state.order);
      }
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
      state.order = ['1', '4', '7', '2', '5', '8', '3', '6', '9', '0'];
      state.data = [];
    },
    adminUnlock: state => {
      // reset metrics without adding to data
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
  resetPin,
  swapLayout,
  signUserOut,
  clearAllData,
  adminUnlock,
} = pinSlice.actions;
export default pinSlice.reducer;
