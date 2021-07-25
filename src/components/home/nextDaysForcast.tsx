import React from "react";
import { ForcastProps } from "../../interfaces";

const NextDaysForcast: React.FC<ForcastProps> = ({ data }): any => {
  return data.map((el,idx) => {
    return (
      <div className='forcastSm' key={idx}>
        <span>{el.date}</span>
        <span>{el.iconPhrase}</span>
        <span>{el.defFe}</span>
      </div>
    );
  });
};

export default NextDaysForcast;
