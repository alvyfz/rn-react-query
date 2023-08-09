import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Main} from './navigation/Main';

const queryClient = new QueryClient();

export default function App() {
  return (
    <React.Fragment>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </NavigationContainer>
    </React.Fragment>
  );
}
