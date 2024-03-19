
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux";
import { ExperimentContainerType } from "../../../types/types";
import Experiment from "./Experiment";

const ExperimentContainer1: React.FC<ExperimentContainerType> = (props) => {
  return (
    <>
      <Experiment experiment={props.experiments} phases={props.phases} parameters={props.parameters} colors={props.colors}
        experimentNumber={1} />
    </>
  )
}

let mapStateToProps = (state: AppStateType) => {
  return {
    experiments: state.main.experiments[0],
    phases: state.main.experimentSIRPhases,
    parameters: state.main.experimentSIRParameters,
    colors: state.main.experimentColors
  }
}

export default connect(mapStateToProps, {})(ExperimentContainer1);
