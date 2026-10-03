import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import { combineReducers } from "redux";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "./features/authSlice"
//import userReducer from "./features/userSlice"
//import profileReducer from "./features/profileSlice"
import { ApiSlice } from './services/apiSlice'

const rootReducer = combineReducers({
    [ApiSlice.reducerPath]:ApiSlice.reducer,
    auth:authReducer,
   // user:userReducer,
   // profile:profileReducer,
  
});
const persistConfig = {
    key: "root", // The key to store everything under in storage
    storage:storageSession,
  };
  const makeConfiguredStore = () =>
    configureStore({
      reducer: rootReducer,
    })
 
  export const makeStore = () => {
    const isServer = typeof window === 'undefined'
    if (isServer) {
      return makeConfiguredStore()
    } else {
      const persistedReducer = persistReducer(persistConfig, rootReducer)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const store:any = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }).concat([ApiSlice.middleware])
      })
      store.__persistor = persistStore(store)
      return store
    }
  }
  

export const persistor = persistStore(makeStore());
export type Appstore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']