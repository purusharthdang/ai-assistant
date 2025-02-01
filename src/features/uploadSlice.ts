import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  pdfId: string | null;
  loading: boolean;
}

const initialState: InitialState = {
  pdfId: null,
  loading: false,
};

export const UploadFile = createSlice({
  name: "UploadFile",
  initialState,
  reducers: {
    setPdfId: (state, action: PayloadAction<string | null>) => {
      state.pdfId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPdfId, setLoading } = UploadFile.actions;

export default UploadFile.reducer;
