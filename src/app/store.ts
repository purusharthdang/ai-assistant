import { configureStore } from "@reduxjs/toolkit";
import UploadFile from "../features/uploadSlice";
import Chat from "../features/chatSlice";

export const store = configureStore({
  reducer: {
    UploadFile,
    Chat,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
