import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HubConnectionState } from '@microsoft/signalr';

export interface SignalRHubState {
  status: HubConnectionState
}

const initialState: SignalRHubState = {
  status: HubConnectionState.Disconnected
};

export const signalRHubSlice = createSlice({
  name: 'stockDataState',
  initialState,
  reducers: {
    changeHubConnectionState: (state, action: PayloadAction<HubConnectionState>) => {
      state.status = action.payload;
    }
  },
});

export const { changeHubConnectionState } = signalRHubSlice.actions;

export const selectSignalRHubState = (state: RootState) => state;

export default signalRHubSlice.reducer;