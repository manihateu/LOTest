import { Api } from '../../../store/api';

const loginApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ token }) => ({ url: 'identity/token', method: 'POST', body: {
                    grant_type: 'refresh_token',
                    client_id: '2',
                    refresh_token: token,
                },
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;
