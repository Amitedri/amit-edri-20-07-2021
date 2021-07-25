import React, { useRef } from "react";
import { itemProps, forcast, AutoCompleteProps, LocationProps } from "../interfaces/";
import axios from "axios";
import { setForcast } from "../redux/reducers/dataSlice";

export const resolePromise = (data: any) => {
  return new Promise((resolve) => {
    resolve(data);
    return data;
  });
};
export const setFavLocations = (currencyFavs: any) => {
  const stinged = JSON.stringify(currencyFavs);
  window.sessionStorage.setItem("favs", stinged);
  return;
};
export const getetFavLocations = () => {
  const favs: any = window.sessionStorage.getItem("favs");
  const parsed: any = JSON.parse(favs);
  return parsed;
};
export const extractForecast = (arr: any[], countryCode: string, cityName: string, country: string) => {
  return arr.map((item, idx) => {
    let date = item.Date.substring(5, 10);
    let tempFe = `${item.Temperature.Minimum.Value * 1}°F - ${item.Temperature.Maximum.Value * 1}°F`;
    let iconPhrase = item.Day.IconPhrase;
    let tempCe = `${Math.round(item.Temperature.Minimum.Value / 1.8)}°C - ${Math.round(item.Temperature.Maximum.Value / 1.8)}°C`;
    let obj: forcast = {
      date: date,
      defFe: tempFe,
      degCel: tempCe,
      iconPhrase: iconPhrase,
      countryCode: countryCode,
      cityName: cityName,
      country: country,
      isFavourite: false,
    };
    return obj;
  });
};

export const handleDispatch = (dispatch: any, action: Function, payload: LocationProps) => {
  dispatch(action(payload));
  return;
};

const handleForcastRequest = async (data: any, fetchForcast: any, disptach: any, setCityProps: any, setForcast: any,setQuery:any,apiKey:string) => {
  disptach(setCityProps(data));
  fetchForecast(data, disptach, setForcast,apiKey);
  setQuery('')
};

export const mapAutoCompleteResults = (props: AutoCompleteProps) => {
  const { citiesList, dispatch, fetchForecast, setCityProps, setForcase,setQuery,apiKey } = props;
  if (citiesList.length >= 1) {
    return citiesList.map((item, idx) => {
      const cityProps: itemProps = {
        country: item.country,
        id: item.id,
        name: item.name,
      };
      return (
        <span
          className='autoCompleteLine'
          key={idx}
          id={item.id}
          onClick={() => handleForcastRequest(cityProps, fetchForecast, dispatch, setCityProps, setForcast,setQuery,apiKey)}
        >
          <span className='autoCompleteText'>{item.name}</span>
          <span className='autoCompleteText'>{item.country}</span>
        </span>
      );
    });
  }
};

export const fetchByCoordinates = async (lan: number, lat: number, disptach: any, setForcast: any,apiKey:string) => {
  let url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lan}%2C${lat}&details=true`;
  let request = await axios.get(url, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  var options: any = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  var prnDt = new Date().toLocaleTimeString("en-us", options);
  let splitted = prnDt.split(",");
  splitted.splice(3, 1);

  const promisified: any = await resolePromise(request);
  let coordinatesProp: itemProps = {
    name: promisified.data.AdministrativeArea.EnglishName,
    country: promisified.data.Country.EnglishName,
    id: promisified.data.Details.Key,
  };

  fetchForecast(coordinatesProp, disptach, setForcast,apiKey);
};
//zsNtXiFS7rupHERGRF4M1qeu0Co8lBci&q
export const fetchForecast = async (props: itemProps, disptach: any, fetchForecast: any,apiKey:string) => {
  const { country, id, name } = props;
  let url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${apiKey}&details=true`;
  let request = axios.get(url, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  const promisified: any = await resolePromise(request);
  const target = promisified.data.DailyForecasts;
  let items = extractForecast(target, id, name, country);
  disptach(setForcast(items));
};
export const extractCitiesList = (list: any[]) => {
  if (list) {
    const mappedCities = list.map((item) => {
      const { LocalizedName, Key } = item;
      const country = item.Country.LocalizedName;
      let obj: itemProps = {
        country: country,
        name: LocalizedName,
        id: Key,
      };
      return obj;
    });
    return mappedCities;
  }
  //error handling
  return;
};

export const handleAutoComplete = async (e: React.ChangeEvent<HTMLInputElement>, extractCitiesList: Function, dispatch: any, action: Function, setQuery: any, setErrorMessage: any,apiKey:string) => {
  const regex = /[A-Za-z]/;
  let query = e.currentTarget.value;

  if (!regex.test(query)) {
    dispatch(setErrorMessage("Typing is allowed in english only."));
    e.currentTarget.value = '';
    return;
  }
  setQuery(query);
  let url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;
  const request = await axios.get(url, {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  const promisified: any = await resolePromise(request);
  const mappedCities = extractCitiesList(promisified.data);
  if (mappedCities) {
    dispatch(action(mappedCities));
  }
};
