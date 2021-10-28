import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import stockDataReducer from './stockDataSlice/stockDataSlice';
import signalRHubStateReducer from './signalRHubSlice/signalRHubSlice';

export const store = configureStore({
  reducer: {
    stockData: stockDataReducer,
    signalRHubState: signalRHubStateReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;