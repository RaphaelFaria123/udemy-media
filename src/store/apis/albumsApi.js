import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from "@faker-js/faker";

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        fetchFn: async (...args) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetch(...args);
        },
    }),
    tagTypes: ['Album'],
    endpoints: (builder) => ({
        fetchAlbums: builder.query({
            query: (user) => ({
                url: '/albums',
                method: 'GET',
                params: {
                    userId: user.id
                }
            }),
            providesTags: (result, error, user) => {
                const tags = result.map(({ id }) => ({ type: 'Album', id }));
                tags.push({ type: 'UsersAlbums', id: user.id });
                return tags;
            }
        }),
        addAlbum: builder.mutation({
            query: (user) => ({
                url: '/albums',
                method: 'POST',
                body: {
                    title: faker.commerce.productName(),
                    userId: user.id
                },
            }),
            invalidatesTags: (result, error, user) => [{ type: 'UsersAlbums', id: user.id }]
        }),
        deleteAlbum: builder.mutation({
            query: (album) => ({
                url: `/albums/${album.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, album) => [{ type: 'Album', id: album.id }]
        })
    }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } = albumsApi;
