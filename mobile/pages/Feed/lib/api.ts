import { WithTokenApi } from "../../../store/with_token_api";

const feedApi = WithTokenApi.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<any, { offset: number; count: number; sort?: number, space?: number, content?: any }>({
            query: ({ offset, count, sort = 0, space = null, content = null }) => ({
                url: `posts/feed?cursor=${offset}&count=${count}`,
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (newItems.data.items) {
                    currentCache.data.items.push(...newItems.data.items);
                    currentCache.data.count = newItems.data.count;
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.offset !== previousArg?.offset;
            },
        }),
    }),
});

export const { useLazyGetPostsQuery } = feedApi;
