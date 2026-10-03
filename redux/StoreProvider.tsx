'use client';
import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, Appstore } from './store';
import { PersistGate } from "redux-persist/integration/react";
interface Props{
children:ReactNode
}

export default function StoreProvider({children}:Props) {
  const storeRef = useRef<Appstore | null>(null)
  if (storeRef.current==null) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider  store={storeRef.current}>
    <PersistGate loading={null} persistor={storeRef.current.__persistor}>
    {children}
    </PersistGate>
  </Provider>
}