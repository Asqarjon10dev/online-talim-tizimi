// src/context/authApi.js — PATCH
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    // LOGIN — /token (x-www-form-urlencoded)
    login: build.mutation({
      query: ({ username, password }) => {
        const form = new URLSearchParams();
        form.append("grant_type", "password");
        form.append("username", username.trim());
        form.append("password", password.trim());
        return {
          url: "/token",
          method: "POST",
          body: form, // header qo‘ymaymiz: brauzer o‘zi form-urlencoded qo‘yadi
        };
      },
    }),

    // ME — /get_my_user (Bearer token bilan)
    me: build.query({
      query: () => ({ url: "/get_my_user" }),
      providesTags: ["User"],
    }),

    // REFRESH — /refresh_token (JSON)
    refresh: build.mutation({
      query: ({ refresh_token }) => ({
        url: "/refresh_token",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token }), // 🔑 stringify
      }),
    }),

    // REGISTER — /create_user (JSON)
    register: build.mutation({
      query: ({ name, username, password, phone }) => ({
        url: "/create_user",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, phone }), // 🔑 stringify
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLazyMeQuery,
  useMeQuery,
  useRefreshMutation,
  useRegisterMutation,
} = authApi;
