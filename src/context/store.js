import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // reducerlarni qo‘shasiz, masalan: user: userReducer
  },
});
