
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux";
import { ExperimentContainerType } from "../../../types/types";
import Experiment from "./Experiment";

const ExperimentContainer1: React.FC<ExperimentContainerType> = (props) => {
  return (
    <>
      <Experiment experiment={props.experiments} phases={props.phases} parameters={props.parameters} colors={props.colors}
        experimentNumber={3} />
    </>
  )
}

let mapStateToProps = (state: AppStateType) => {
  return {
    experiments: state.main.experiments[2],
    phases: state.main.experimentSEIQRPDPPhases,
    parameters: state.main.experimentSEIQRPDPParameteres,
    colors: state.main.experimentColors
  }
}

export default connect(mapStateToProps, {})(ExperimentContainer1);
