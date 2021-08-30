import React from 'react';
import { ReactQueryConfigProvider } from 'react-query';

const ReactQueryConfig = ({ children }) => {
  return (
    <ReactQueryConfigProvider
      config={{
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      }}
    >
      {children}
    </ReactQueryConfigProvider>
  );
};

export default ReactQueryConfig;
