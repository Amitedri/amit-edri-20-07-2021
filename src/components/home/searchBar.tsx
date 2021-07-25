import React, { FC, ReactElement } from "react";
import { setCityProps, addCitiesList, setForcast, setErrorMessage } from "../../redux/reducers/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { mapAutoCompleteResults, handleAutoComplete, extractCitiesList, fetchForecast } from "../../core/";
import { AutoCompleteProps } from "../../interfaces";
import { useRef } from "react";
const SearchBar: FC = (): ReactElement => {
  const selector = useAppSelector((state) => state.dataReducer);
  const dispatch = useAppDispatch();
  const [query, setQuery] = React.useState<string>("");
  const ref = useRef(null);
  const autoCompleteProps: AutoCompleteProps = {
    citiesList: selector.cities,
    dispatch: dispatch,
    fetchForecast: fetchForecast,
    setCityProps: setCityProps,
    setForcase: setForcast,
    setQuery:setQuery,
    apiKey:selector.apiKey
  };
  
  return (
    <div className='inputWrapper'>
      <div className='searchIcon' />
      <input
        ref={ref}
        onChange={(e) => handleAutoComplete(e, extractCitiesList, dispatch, addCitiesList, setQuery, setErrorMessage,selector.apiKey)}
        type='search'
        lang='en'
        className='searchInput'
        placeholder='Search Location'
      />
      {query.length >= 1 && <div className='searchResult'>{mapAutoCompleteResults(autoCompleteProps)}</div>}
    </div>
  );
};

export default SearchBar;
