import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Option} from "@/types";
export const API_BASE_URL = import.meta.env?.VITE_API_URL ?? process.env.VITE_API_URL!;

export interface ServerMessage { message: string; }

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
            baseUrl: API_BASE_URL
        }),
    tagTypes: ["Options"],
    endpoints: (builder) => ({
        getOptions: builder.query<Option[], void>({
            query: () => "options",
            // если сервер вдруг вернёт null / объект — считаем ошибкой
            transformResponse: (response: unknown): Option[] => {
                return Array.isArray(response) ? response : [];
            },
            providesTags: ["Options"]
        }),

        /** POST /selected/option {"value":"123"} → {message:"…"} */
        sendSelected: builder.mutation<ServerMessage, string>({
            query: (value) => ({
                url: "selected/option",
                method: "POST",
                body: { value }
            })
        })
    })
});

export const {
    useGetOptionsQuery,
    useSendSelectedMutation
} = api;
