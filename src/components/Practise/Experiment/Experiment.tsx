import { useEffect, useState } from "react";
import { ExperimentType } from "../../../types/types";
import PractiseSIR from "../PractiseSirModel/PractiseSir";
import PractiseSEIQRDP from "../PractiseSEIQRDPModel/PractiseSEIQRDP";
const Experiment: React.FC<ExperimentType> = (props) => {

  return (
    <>
      {props.experiment.map((el: any) =>
        (props.experimentNumber === 3) ?
          <PractiseSEIQRDP experimentArray={el} parameters={props.parameters} phases={props.phases} colors={props.colors}
            experimentNumber={props.experimentNumber} /> :
          <PractiseSIR experimentArray={el} parameters={props.parameters} phases={props.phases} colors={props.colors}
            experimentNumber={props.experimentNumber} />
      )}
    </>
  )
}

export default Experiment;