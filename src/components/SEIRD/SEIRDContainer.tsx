
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux";
import { SEIRDContainerType } from "../../types/types";
import Model from "../Model/Model";
import { changeValue } from "../../redux/mainReducer";

// dSdt = -beta*S*I/N
// dEdt = beta*S*I/N - sigma*E
// dIdt = sigma*E - gamma*I - mu*I
// dRdt = gamma*I
// dDdt = mu*I

const SEIRDContainer: React.FC<SEIRDContainerType> = (props) => {

  let f1 = (t: any, phases: any, parameters: any, N: number) => {
    return -parameters.beta * phases.S * phases.I;
  }
  let f2 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.beta * phases.S * phases.I - parameters.sigma * phases.E;
  }
  let f3 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.sigma * phases.E - parameters.gamma * phases.I - parameters.mu * phases.I;
  }
  let f4 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.gamma * phases.I;
  }
  let f5 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.mu * phases.I;
  }

  let rk = (phases: any, t0: any, max_t: any, h: any, parameters: any, N: number) => {
    // debugger;
    // console.log(phases);
    let k1 = [5], k2 = [5], k3 = [5], k4 = [5];
    let vfunc = [f1, f2, f3, f4, f5];
    let t = t0;
    let max_iter = (max_t - t0) / h;
    let clone = Object.assign({}, phases);
    let result = [];

    for (let i = 0; i < max_iter; i++) {

      for (let j = 0; j < vfunc.length; ++j) {
        k1[j] = h * vfunc[j](t, phases, parameters, N);
      }
      // console.log(k1);
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k1[0];
        clone.E = phases.E + 0.5 * k1[1];
        clone.I = phases.I + 0.5 * k1[2];
        clone.R = phases.R + 0.5 * k1[3];
        clone.D = phases.D + 0.5 * k1[4];
        k2[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k2[0];
        clone.E = phases.E + 0.5 * k2[1];
        clone.I = phases.I + 0.5 * k2[2];
        clone.R = phases.R + 0.5 * k2[3];
        clone.D = phases.D + 0.5 * k2[4];
        k3[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k3[0];
        clone.E = phases.E + 0.5 * k3[1];
        clone.I = phases.I + 0.5 * k3[2];
        clone.R = phases.R + 0.5 * k3[3];
        clone.D = phases.D + 0.5 * k3[4];
        k4[j] = h * vfunc[j](t + h, clone, parameters, N);
      }
      phases.S += (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6.;
      phases.E += (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6.;
      phases.I += (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) / 6.;
      phases.R += (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]) / 6.;
      phases.D += (k1[4] + 2 * k2[4] + 2 * k3[4] + k4[4]) / 6.;

      result.push({ id: t, S: phases.S, E: phases.E, I: phases.I, R: phases.R, D: phases.D });
      t = t + h;
    }
    return result;

  }


  let clonePhases = Object.assign({}, props.phases);
  const [phases, updatePhases] = useState(clonePhases);
  const [result, updateResult] = useState([{ id: 0, S: 0, E: 0, I: 0, R: 0, D: 0 }]);



  useEffect(() => {
    updateResult(rk(phases, 0, 100, 1, props.parameters, 10));
  }, [props.phases])

  return <Model {...props} result={result} title='SEIRD' changeValue={props.changeValue} />
}

let mapStateToProps = (state: AppStateType) => {
  return {
    phases: state.main.SEIRDPhases,
    parameters: state.main.SEIRDParameters,
    colors: state.main.colors
  }
}

export default connect(mapStateToProps, { changeValue })(SEIRDContainer);
