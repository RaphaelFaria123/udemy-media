import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from "@faker-js/faker";

export const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        fetchFn: async (...args) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetch(...args);
        },
    }),
    tagTypes: ['Photo'],
    endpoints: (builder) => ({
        fetchPhotos: builder.query({
            query: (album) => ({
                url: '/photos',
                method: 'GET',
                params: {
                    albumId: album.id
                }
            }),
            providesTags: (result, error, album) => {
                const tags = result.map(({ id }) => ({ type: 'Photo', id }));
                tags.push({ type: 'AlbumPhoto', id: album.id });
                return tags;
            }
        }),
        addPhoto: builder.mutation({
            query: (album) => ({
                url: '/photos',
                method: 'POST',
                body: {
                    albumId: album.id,
                    url: faker.image.url(150, 150, true)
                },
            }),
            invalidatesTags: (result, error, album) => [{ type: 'AlbumPhoto', id: album.id }]
        }),
        deletePhoto: builder.mutation({
            query: (photo) => ({
                url: `/photos/${photo.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, photo) => [{ type: 'Photo', id: photo.id }]
        })
    }),
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photosApi;
