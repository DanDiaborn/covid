
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux";
import { ExperimentContainerType } from "../../../types/types";
import Experiment from "./Experiment";

const ExperimentContainer2: React.FC<ExperimentContainerType> = (props) => {
  console.log(props.experiments);
  return (
    <>
      <Experiment experiment={props.experiments} phases={props.phases} parameters={props.parameters} colors={props.colors}
        experimentNumber={2} />
    </>
  )
}

let mapStateToProps = (state: AppStateType) => {
  return {
    experiments: state.main.experiments[1],
    phases: state.main.experimentSIRPhases,
    parameters: state.main.experimentSIRParameters,
    colors: state.main.experimentColors
  }
}

export default connect(mapStateToProps, {})(ExperimentContainer2);
