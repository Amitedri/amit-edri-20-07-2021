import React from "react";
import Piano from "./piano";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { forcast } from "../../interfaces";
import FavouriteButton from "./favouriteButton";

const CurrentWeatherDisplay: React.FC<forcast> = (props): React.ReactElement => {
  const selector = useAppSelector((state) => state.dataReducer);
  const isFahrenheit = selector.isFahrenheit;

  return (
    <section className='currentCityContainer'>
      <div className='weatherLocation'>
        <h1>{`${props.cityName || "Loading"}`}</h1>
        <h1>{`${props.country || "Loading"}`}</h1>
        <h2>{props.date || "Loading"}</h2>
        <div className='controllers'><FavouriteButton city={props.cityName}/> <Piano/></div>
      </div>
      <div className='currentWeatherContainer'>
        
        <div className='currentWeather'>
          <h3>{`${isFahrenheit? props.defFe : props.degCel || "Loading"}°`}</h3>
          <h4>{props.iconPhrase || "Loading"}</h4>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeatherDisplay;
