import React from "react";
import "./favourites.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeFavourite, setForcast } from "../../redux/reducers/dataSlice";
import { itemProps } from "../../interfaces";
import { fetchForecast } from "../../core";
const Favourites: React.FC = (): React.ReactElement => {
  const favourites = useAppSelector((state) => state.dataReducer.favourites);
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.dataReducer);

  const handleRemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    dispatch(removeFavourite(id));
  };
  const handleFindLocation = (props: itemProps) => {
    fetchForecast(props, dispatch, setForcast, selector.apiKey);
  };
  const mapFavs = (favourites: any[]) => {
    if (favourites.length >= 1) {
      return favourites.map((item, idx) => {
        return (
          <div
            key={idx}
            className='favourite'
            id={item.countryCode}
            onClick={() => handleFindLocation({ id: item.countryCode, country: item.country, name: item.cityName })}
          >
            <div className='deleteButton' onClick={(e) => handleRemove(e, item.countryCode)}>
              <span>X</span>
            </div>
            <div className='location'>
              <span>{item.cityName}</span>
              <span>{item.country}</span>
            </div>
            <div className='temp'>
              <span>{item.degCel}</span>
            </div>
            <div className='forcastLocal'>{item.iconPhrase}</div>
          </div>
        );
      });
    }
  };

  return (
    <div className='favsContainer'>
      <div className='colorLayer'></div>
      <div className='favourites'>{favourites.length === 0 ? <div className='noFav'>Add some favourite city!</div> : mapFavs(favourites)}</div>
    </div>
  );
};

export default Favourites;
