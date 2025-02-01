import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  isAnswerLoading: boolean;
}

const initialState: InitialState = {
  isAnswerLoading: false,
};

export const Chat = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    setIsAnswerLoading: (state, action: PayloadAction<boolean>) => {
      state.isAnswerLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAnswerLoading } = Chat.actions;

export default Chat.reducer;
