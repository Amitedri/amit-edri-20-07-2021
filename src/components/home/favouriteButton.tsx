import React, { useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getFavorites, addFavourite, setErrorMessage } from "../../redux/reducers/dataSlice";
interface CurrentCity {
  city: string;
}
const FavouriteButton: React.FC<CurrentCity> = (props): React.ReactElement => {
  const favouritesState = useAppSelector((state) => state.dataReducer.favourites);
  const currencFav = useAppSelector((state) => state.dataReducer?.weekForecast[0]);

  const [isFavourite, setIsFavourite] = React.useState<boolean>(false);
  const disptach = useAppDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (favouritesState[0]) {
      disptach(getFavorites(true));
      const arr = Object.values(favouritesState);
      const isExist = arr.find((item) => item.cityName === props.city);
      if (isExist) {
        setIsFavourite(() => true);
        buttonRef.current?.classList.add("isActive");
      }
      if (!isExist) {
        setIsFavourite(() => false);
      }
    }
  }, []);

  const handleClick = () => {
    let toput: boolean = false;
    const favourite = { ...currencFav };
    const arr = Object.values(favouritesState);
    let isExist = arr.find((item) => item.cityName === favourite.cityName);
    if (!isExist) {
      favourite.isFavourite = true;
      disptach(addFavourite(favourite));
      setIsFavourite(true);
    }
    if (isExist) {
      disptach(setErrorMessage("Item already in your favourites!"));
    }
  };

  return (
    <button ref={buttonRef} onClick={() => handleClick()} className='addFav'>
      {isFavourite ? "Already on favourites" : "Add to Favourites"}
    </button>
  );
};

export default FavouriteButton;
