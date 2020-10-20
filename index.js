import React, { useEffect  } from 'react';

import { WebSocketClass } from '../sockets/';

const useHookWithWebsocket = (providedHook, initialState, channelName) => {
  const [visible, setVisible] = providedHook(initialState);

  const socket = new WebSocketClass();
  const channel = socket.initialize(channelName);

  const handler = (e) => {
    setVisible(e)
  };

  useEffect(()=> {
    socket.addListener(channel, handler)
  }, []);

  useEffect(() => {
    socket.sendMessage(channel, visible)
  }, [visible]);

  return [visible, setVisible]
};

export default useHookWithWebsocket;
