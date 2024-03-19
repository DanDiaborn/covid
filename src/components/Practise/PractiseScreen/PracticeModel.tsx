import { useEffect, useState } from "react";
import { PractiseModelType } from "../../../types/types";
import PractiseGraph from "../../Graph/PractiseGraph";

const PractiseModel: React.FC<PractiseModelType> = (props) => {
  return (
    <div className="practiseModel">
      <div className="practiseModel__wrapper">
        <div className="practiseModel__graph">
          <PractiseGraph coordinates={props.result} colors={props.colors} />
        </div>
        <div className="practiseModel__text">
          <div className="practiseModel__span-container">
            {props.experimentArray[1].map((el: any, index: any) =>
              <div className="practiseModel__varuable practiseModel__span" style={{ color: props.colors[index] }}>
                {props.experimentArray[0].objectName}: {el}
              </div>
            )}
          </div>
          <div className="practiseModel__span-container">
            {props.experimentArray[2].map((el: any, index: any) =>
              <div className="practiseModel__Dmax practiseModel__span" style={{ color: props.colors[index] }}>
                DMax: {el}
              </div>
            )}
          </div>
          <div className="practiseModel__span-container">
            {props.experimentArray[3].map((el: any, index: any) =>
              <div className="practiseModel__Imax practiseModel__span" style={{ color: props.colors[index] }}>
                IMax: {el}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default PractiseModel;