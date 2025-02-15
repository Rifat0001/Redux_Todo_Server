import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (priority) => {
                const params = new URLSearchParams();
                if (priority) {
                    params.append('priority', priority)
                }
                return {
                    url: `/tasks`,
                    method: 'GET',
                    params: { priority },
                };
            },
            providesTags: ['todo'],
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: '/task',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['todo'],
        }),
        updateTodo: builder.mutation({
            query: (options) => {
                console.log('i am update=>', options);
                return {
                    url: `/task/${options.id}`,
                    method: 'PUT',
                    body: options.data
                };
            },
            invalidatesTags: ['todo'],
        }),
        deleteTodo: builder.mutation({
            query: (options) => {
                console.log('inside ipi =>', options);
                return {
                    url: `/task/${options}`,
                    method: 'DELETE',
                    body: options
                };
            },
            invalidatesTags: ['todo'],
        })
    }),
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = baseApi;