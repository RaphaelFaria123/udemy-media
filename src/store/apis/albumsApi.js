import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from "@faker-js/faker";

export const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005"
    }),
    tagTypes: ['Albums'],
    endpoints: (builder) => ({
        fetchAlbums: builder.query({
            query: (user) => ({
                url: '/albums',
                method: 'GET',
                params: {
                    userId: user.id
                }
            }),
            providesTags: ['Albums']
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
            invalidatesTags: ['Albums']
        }),
        deleteAlbum: builder.mutation({
            query: (album) => ({
                url: `/albums`,
                params: {
                    id: album.id
                },
                method: 'DELETE'
            }),
            invalidatesTags: ['Albums']
        })
    }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } = albumsApi;
