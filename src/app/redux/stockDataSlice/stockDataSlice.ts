import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StockDataModel } from '../../shared/model/stockDataModel';

export interface StockDataState {
  data: StockDataModel[]
}

const initialState: StockDataState = {
  data: []
};

export const stockDataSlice = createSlice({
  name: 'stockDataState',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<StockDataModel[]>) => {
      action.payload.forEach((element: StockDataModel) => {
        state.data.push(element);
      });
    }
  },
});

export const { addData } = stockDataSlice.actions;

export const selectStockData = (state: RootState) => state.stockData;

export default stockDataSlice.reducer;