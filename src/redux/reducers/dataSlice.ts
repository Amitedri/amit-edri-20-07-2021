import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forcast, itemProps } from "../../interfaces";
import axios from "axios";
import { resolePromise, extractForecast, getetFavLocations, setFavLocations, extractCitiesList } from "../../core";
// Define a type for the slice state
interface dataState {
  apiKey: string;
  cities: any[];
  favourites: forcast[];
  weekForecast: forcast[];
  selectedCityProps: itemProps;
  isFahrenheit: Boolean;
  errorMessage: string;
}

// Define the initial state using that type
const initialState: dataState = {
  apiKey: "OSYovEk0Vxzh8rkpcDpW0C3sVxKyD2MR",
  cities: [],
  weekForecast: [],
  favourites: [],
  selectedCityProps: { country: "", id: "", name: "" },
  isFahrenheit: false,
  errorMessage: "",
};

export const dataSlice = createSlice({
  name: "dataSlice",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setForcast: (state, action: PayloadAction<any[]>) => {
      console.log(action.payload);
      state.weekForecast = [...action.payload];
    },
    setIsFahrenheit: (state, action: PayloadAction) => {
      state.isFahrenheit = !state.isFahrenheit;
    },
    addCitiesList: (state, action: PayloadAction<any[]>) => {
      state.cities = [...action.payload];
    },
    setCityProps: (state, action: PayloadAction<itemProps>) => {
      state.selectedCityProps = { ...action.payload };
    },
    addFavourite: (state, action: PayloadAction<forcast>) => {
      console.log(action.payload);
      state.favourites.push(action.payload);
      setFavLocations(state.favourites);
    },
    removeFavourite: (state, action: PayloadAction<any>) => {
      const newArr = state.favourites.filter((item) => item.countryCode !== action.payload);
      state.favourites = [...newArr];
      setFavLocations(state.favourites);
    },
    getFavorites: (state, action: PayloadAction<any>) => {
      const favourites = getetFavLocations();
      console.log(favourites);
      state.favourites = [...favourites];
    },
  },
});

export const { addCitiesList, addFavourite, removeFavourite, setCityProps, getFavorites, setForcast, setIsFahrenheit ,setErrorMessage } = dataSlice.actions;

export default dataSlice.reducer;
