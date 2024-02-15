import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import convert from "../../utils/converter";
import { RootState } from "../store";

export type ConverterSliceState = {
  value: string;
  currency: string; // 'BTC', 'ETH', 'TON'
  USDT: string;
  RUB: string;
  status: "success" | "loading" | "error";
};

const initialState: ConverterSliceState = {
  value: "1",
  currency: "BTC",
  USDT: "",
  RUB: "",
  status: "success",
};

export const convertValue = createAsyncThunk(
  "converter/convertValue",
  async (changed: string, thunkAPI) => {
    const { converter } = thunkAPI.getState() as RootState;
    await convert.ready();
    if (changed === "currency") {
      return {
        value: converter.value,
        USDT: convert[converter.currency].USDT(converter.value),
        RUB: convert[converter.currency].RUB(converter.value),
      };
    } else if (changed === "USDT") {
      return {
        value: convert.USDT[converter.currency](converter.USDT),
        USDT: converter.USDT,
        RUB: convert.USDT.RUB(converter.USDT),
      };
    } else if (changed === "RUB") {
      return {
        value: convert.RUB[converter.currency](converter.RUB),
        USDT: convert.RUB.USDT(converter.RUB),
        RUB: converter.RUB,
      };
    }
  },
);

const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    setUSDT(state, action) {
      state["USDT"] = action.payload;
    },
    setRUB(state, action) {
      state["RUB"] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertValue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(convertValue.fulfilled, (state, action: any) => {
        console.log(action.payload);
        state.status = "success";
        state.value = action.payload.value;
        state.RUB = action.payload.RUB;
        state.USDT = action.payload.USDT;
      })
      .addCase(convertValue.rejected, (state, action) => {
        state.status = "error";
        console.error(action.error.message);
      });
  },
});

export const { setCurrency, setValue, setUSDT, setRUB } =
  converterSlice.actions;
export default converterSlice.reducer;
