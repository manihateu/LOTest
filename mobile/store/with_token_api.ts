import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { storage } from '../storage/storage';


function getToken() {
  return storage.getString('x-token-access');
}

export const WithTokenApi = createApi({
  reducerPath: 'authorizeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.lo.ink/v1',
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log(token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
