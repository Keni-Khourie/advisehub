import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {

  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { setAuth, logout } from '../features/authSlice'
import { Mutex } from 'async-mutex'
import { RootState } from '../store'


const mutex = new Mutex()

interface refreshResponse {
 accessToken:string;
  refreshToken:string;
  profileId:number|null;
  userId:number;
  firstName:string;
  lastName:string;
  email:string;
  role:string;
}
const baseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,mode:"cors",credentials:"omit",prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    const isAuthenticated = (getState() as RootState).auth.isAuthenticated
    if (token  && isAuthenticated) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  } })
  const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();
  
    let result = await baseQuery(args, api, extraOptions);
    

    if (result.error && result.error.status === 403 && (result.error && "message" in (result.error.data as object) && (result.error.data as {message:string}).message.toLowerCase().includes("token")) ) {
      // Check whether the mutex is locked
      console.log({data:result.error.data})
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const state = api.getState() as RootState;
          const token = state.auth.refreshToken
          const refreshResult = await baseQuery(
            {
              url: 'v1/auth/refresh/',
              method: 'POST',
              headers:{
                "Authorization":`Bearer ${token}`
              }
            },
            api,
            extraOptions
          );
  
          if (refreshResult.data) {
            const refreshResponse = refreshResult.data as refreshResponse
            api.dispatch(setAuth({accessToken:refreshResponse.accessToken,refreshToken:refreshResponse.refreshToken}));
            result = await baseQuery(args, api, extraOptions);
          } else {
            
            api.dispatch(logout());
          
          }
        } finally {
         
          release();
        }
      } else {
        
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  
    return result;
  };
  export const ApiSlice=createApi({
    reducerPath:"api",
    baseQuery:baseQueryWithReauth,
    tagTypes:[],
    endpoints: () => ({}),
  })