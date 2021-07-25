
export interface forcast {
  date: string;
  degCel: string;
  defFe: string;
  iconPhrase: string;
  countryCode:string;
  cityName:string;
  country:string;
  isFavourite:boolean;
}

export interface ForcastProps {
  data: forcast[];
}

export interface itemProps {
  id: string;
  name: string;
  country: string;
}
export interface LocationProps {
  cityName: string;
  country: string;
  degCel: string;
  degFe: string;
  iconPhrase: string;
  id:string;
}

export interface AutoCompleteProps {
  citiesList: itemProps[];
  dispatch: any;
  fetchForecast:Function;
  setCityProps?:Function;
  setForcase:Function;
  setQuery:any;
  apiKey:string;
}



export interface CoordinatesProp {
  cityName: string;
  country: string;
  countryCode: string;
}