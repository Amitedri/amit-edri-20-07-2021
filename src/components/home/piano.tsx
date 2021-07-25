import React, { FC, ReactElement } from "react";
import { setForcast, setIsFahrenheit } from "../../redux/reducers/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchByCoordinates } from "../../core";
import Location from "../../Assets/icons//map.png";
import Degrees from "../../Assets/icons/celsius.png";

const Piano: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.dataReducer);
  const [currenctLocation, setCurrenctLocation] = React.useState<any>("");

  const getCurrentLocation = (): any => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos: any) => {
      setCurrenctLocation({ lan: pos.coords?.longitude, lat: pos.coords?.latitude });
      fetchByCoordinates(pos.coords?.latitude, pos.coords?.longitude, dispatch, setForcast,selector.apiKey);
    };
    const error = (err: any) => {
      console.log(err);
    };
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    if (currenctLocation) {
    }
  };

  const setDegress = () => {
    dispatch(setIsFahrenheit());
  };

  const getRandomCountry = () => {};
  return (
    <div className='pianoContainer'>
      <button className='pianoButton' onClick={() => getCurrentLocation()}>
        Finy my location!
      </button>
      <button className='pianoButton' onClick={() => setDegress()}>
        Fe/Ce
      </button>
    </div>
  );
};

export default Piano;
