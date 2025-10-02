// src/context/api.js — QOLDIR
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://96d754169f5b.ngrok-free.app",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("ngrok-skip-browser-warning", "true");
      return headers; // ❌ Content-Type qo‘ymaymiz
    },
    credentials: "include",
  }),
  tagTypes: ["Courses", "User"],
  endpoints: () => ({}),
});
