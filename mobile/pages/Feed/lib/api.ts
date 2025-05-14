import { WithTokenApi } from "../../../store/with_token_api";

const feedApi = WithTokenApi.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<any, { offset: number; count: number; sort?: number }>({
            query: ({ offset, count, sort = 0 }) => ({
                url: 'posts/feed',
                params: { offset, count, sort },
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (newItems.items) {
                currentCache.items.push(...newItems.items);
                currentCache.count = newItems.count;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.offset !== previousArg?.offset;
            },
        }),
    }),
});

export const { useGetPostsQuery } = feedApi;
