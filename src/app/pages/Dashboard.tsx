import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../shared/configurations';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectStockData } from '../redux/stockDataSlice/stockDataSlice';
import { stockDataDataGridColumnConfig } from '../shared/dataGridConfig/dataGridConfig';
import { DataGrid } from '../components/dataGrid/DataGrid';
import { selectSignalRHubState } from '../redux/signalRHubSlice/signalRHubSlice';
import { HubConnectionState } from '@microsoft/signalr';

const IconFont = createFromIconfontCN({
  scriptUrl: iconFontUrl,
});

export const Dashboard = () => {
  const stockDataHub = useAppSelector(selectStockData);
  const hubState = useAppSelector(selectSignalRHubState);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');

  const antIcon = <IconFont type="icon-loadm" style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (hubState.signalRHubState.status === HubConnectionState.Connected) {
      setLoading(false);
    } else if (hubState.signalRHubState.status === HubConnectionState.Reconnecting) {
      setErrorText('Reconnecting. Please wait~');
    } else if (hubState.signalRHubState.status === HubConnectionState.Connecting) {
      setErrorText('Connecting. Please wait~');
    } else {
      setErrorText('Disconnected. Please try again~');
    }
  }, [hubState.signalRHubState.status]);

  return (
    <div className="dashboard-container">
      {
        loading ?
          <div className="loading-icon">
            <span>{errorText}</span><Spin indicator={antIcon} />
          </div> :
          <DataGrid columns={stockDataDataGridColumnConfig} rowData={stockDataHub.data}/>
      }
    </div>
  );
};