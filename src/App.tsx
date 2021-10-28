import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel } from '@microsoft/signalr';
import { DefaultLayout } from './app/layout/DefaultLayout';
import { stockDataHubUrl } from './app/shared/configurations';
import { useAppDispatch } from './app/redux/hooks';
import { addData } from './app/redux/stockDataSlice/stockDataSlice';
import { changeHubConnectionState } from './app/redux/signalRHubSlice/signalRHubSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  const [signalRHubConnection, setSignalRHubConnection] = useState<null | HubConnection>(null);

  // Create signalR connection once component did mount
  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(stockDataHubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    dispatch(changeHubConnectionState(HubConnectionState.Connecting));

    setSignalRHubConnection(hubConnection);
  }, []);

  // Establish connection to hub and listen
  useEffect(() => {
    if (signalRHubConnection) {

      let retryCount = 5;

      const startConnection = async () => {
        try {
          await signalRHubConnection.start();
          dispatch(changeHubConnectionState(HubConnectionState.Connected));

          signalRHubConnection.stream('GetData').subscribe({
            next: (item: any) => {
              dispatch(addData(item));
            },
            complete: () => {
              console.log('complete');
            },
            error: (err) => {
              console.log(err);
            }
          });
        } catch (err) {
          dispatch(changeHubConnectionState(HubConnectionState.Reconnecting));
          if (retryCount !== 0) {
            setTimeout(() => startConnection(), 5000);

            retryCount--;

            console.log(retryCount);
          } else {
            dispatch(changeHubConnectionState(HubConnectionState.Disconnected));
          }
        }
      };

      startConnection();
    }

    return () => {
      if (signalRHubConnection) {
        dispatch(changeHubConnectionState(HubConnectionState.Disconnected));
        signalRHubConnection.stop();
      }
    };
  }, [signalRHubConnection]);

  return (
    <>
      <Router>
        <Switch>
          <DefaultLayout />
        </Switch>
      </Router>
    </>
  );
};