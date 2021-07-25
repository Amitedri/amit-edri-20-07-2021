import React from "react";
import "./css/home.css";
import ErrorModal from "./errorModal";

import CurrentWeatherDisplay from "./currentWeather";
import NextDaysForcast from "./nextDaysForcast";
import SearchBar from "./searchBar";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setErrorMessage, setForcast } from "../../redux/reducers/dataSlice";
import { fetchByCoordinates } from "../../core";
const Home: React.FC = (): React.ReactElement => {

  const selector = useAppSelector((state) => state.dataReducer);
  const dispatch = useAppDispatch();

  let currenct = selector?.weekForecast[0];
  let apiKey = selector.apiKey;
  console.warn = () => {};
  // console.error = () => {};
  React.useEffect(() => {
    if (!selector.weekForecast[0]) {
      fetchByCoordinates(32.109333, 34.855499, dispatch, setForcast, apiKey);
    }
    setTimeout(() => {
      if (!selector.weekForecast[0]) {
        dispatch(setErrorMessage("Connection error, please try again later"));
      }
    }, 1500);
  }, []);

  return (
    <div className='homeContainer'>
      <ErrorModal message={selector.errorMessage} />
      <SearchBar />
      <CurrentWeatherDisplay
        cityName={currenct?.cityName || "Loading"}
        country={currenct?.country || "Loading"}
        countryCode={currenct?.countryCode || "Loading"}
        date={currenct?.date || "Loading"}
        defFe={currenct?.defFe || "Loading"}
        degCel={currenct?.degCel || "Loading"}
        iconPhrase={currenct?.iconPhrase || "Loading"}
        isFavourite={currenct?.isFavourite}
      />
      <div className='forcastSmContainer'>
        <NextDaysForcast data={selector.weekForecast} />
      </div>
    </div>
  );
};

export default Home;
