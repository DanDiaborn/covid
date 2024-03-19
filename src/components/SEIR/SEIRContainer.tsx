
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeValue } from "../../redux/mainReducer";
import { AppStateType } from "../../redux/redux";
import { SEIRContainerType } from "../../types/types";
import Model from "../Model/Model";

const SEIRContainer: React.FC<SEIRContainerType> = (props) => {

  let f1 = (t: any, phases: any, parameters: any, N: number) => {
    return -parameters.beta * phases.S * phases.I;
  }
  let f2 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.beta * phases.S * phases.I - parameters.kappa * phases.E;
  }
  let f3 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.kappa * phases.E - parameters.gamma * phases.I;
  }

  let f4 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.gamma * phases.I;
  }

  let rk = (phases: any, t0: any, max_t: any, h: any, parameters: any, N: number) => {
    // debugger;
    // console.log(phases);
    let k1 = [4], k2 = [4], k3 = [4], k4 = [4];
    let vfunc = [f1, f2, f3, f4];
    let t = t0;
    let max_iter = (max_t - t0) / h;
    let clone = Object.assign({}, phases);
    let result = [];

    for (let i = 0; i < max_iter; i++) {

      for (let j = 0; j < vfunc.length; ++j) {
        k1[j] = h * vfunc[j](t, phases, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k1[0];
        clone.E = phases.E + 0.5 * k1[1];
        clone.I = phases.I + 0.5 * k1[2];
        clone.R = phases.R + 0.5 * k1[3];
        k2[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k2[0];
        clone.E = phases.E + 0.5 * k2[1];
        clone.I = phases.I + 0.5 * k2[2];
        clone.R = phases.R + 0.5 * k2[3];
        k3[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k3[0];
        clone.E = phases.E + 0.5 * k3[1];
        clone.I = phases.I + 0.5 * k3[2];
        clone.R = phases.R + 0.5 * k3[3];
        k4[j] = h * vfunc[j](t + h, clone, parameters, N);
      }
      phases.S += (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6.;
      phases.E += (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6.;
      phases.I += (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) / 6.;
      phases.R += (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]) / 6.;

      result.push({ id: t, S: phases.S, E: phases.E, I: phases.I, R: phases.R });
      t = t + h;
    }
    return result;

  }


  let clonePhases = Object.assign({}, props.phases);
  const [phases, updatePhases] = useState(clonePhases);
  const [result, updateResult] = useState([{ id: 0, S: 0, E: 0, I: 0, R: 0 }]);



  useEffect(() => {
    updateResult(rk(phases, 0, 100, 1, props.parameters, 10));
  }, [props.phases])

  return <Model {...props} result={result} title='SEIR' changeValue={props.changeValue} />
}

let mapStateToProps = (state: AppStateType) => {
  return {
    phases: state.main.SEIRPhases,
    parameters: state.main.SEIRParameters,
    colors: state.main.colors
  }
}

export default connect(mapStateToProps, { changeValue })(SEIRContainer);
