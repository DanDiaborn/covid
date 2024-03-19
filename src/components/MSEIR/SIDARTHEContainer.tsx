
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux";
import { SIDARTHEContainerType, SIDARTHEParametersType, SIDARTHEPhasesType } from "../../types/types";
import Model from "../Model/Model";
import { changeValue } from "../../redux/mainReducer";

const SIDARTHEContainer: React.FC<SIDARTHEContainerType> = (props) => {

  let f1 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return -phases.S * (parameters.alpha * phases.I + parameters.beta * phases.D
      + parameters.gamma * phases.A + parameters.delta * phases.R);
  }

  let f2 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return phases.S * (parameters.alpha * phases.I + parameters.beta * phases.D
      + parameters.gamma * phases.A + parameters.delta * phases.R)
      - (parameters.epsilon + parameters.zeta + parameters.lamda) * phases.I;
  }

  let f3 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return parameters.epsilon * phases.I - (parameters.eta + parameters.rho) * phases.D;
  }

  let f4 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return parameters.zeta * phases.I - (parameters.theta + parameters.mu + parameters.kappa) * phases.A;
  }

  let f5 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return parameters.eta * phases.D + parameters.theta * phases.A - (parameters.nu + parameters.xi) * phases.R;
  }

  let f6 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return parameters.mu * phases.A + parameters.nu * phases.R - (parameters.sigma + parameters.tau) * phases.T;
  }

  let f7 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return parameters.lamda * phases.I + parameters.rho * phases.D
      + parameters.kappa * phases.A + parameters.xi * phases.R + parameters.sigma * phases.T;
  }

  let f8 = (t: number, phases: SIDARTHEPhasesType, parameters: SIDARTHEParametersType, N: number) => {
    return parameters.tau * phases.T;
  }

  let rk = (phases: any, t0: any, max_t: any, h: any, parameters: any, N: number) => {
    // debugger;
    // console.log(phases.R);
    let k1 = [8], k2 = [8], k3 = [8], k4 = [8];
    let vfunc = [f1, f2, f3, f4, f5, f6, f7, f8];
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
        clone.I = phases.I + 0.5 * k1[1];
        clone.D = phases.D + 0.5 * k1[2];
        clone.A = phases.A + 0.5 * k1[3];
        clone.R = phases.R + 0.5 * k1[4];
        clone.T = phases.T + 0.5 * k1[5];
        clone.H = phases.H + 0.5 * k1[6];
        clone.E = phases.E + 0.5 * k1[7];
        k2[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k2[0];
        clone.I = phases.I + 0.5 * k2[1];
        clone.D = phases.D + 0.5 * k2[2];
        clone.A = phases.A + 0.5 * k2[3];
        clone.R = phases.R + 0.5 * k2[4];
        clone.T = phases.T + 0.5 * k2[5];
        clone.H = phases.H + 0.5 * k2[6];
        clone.E = phases.E + 0.5 * k2[7];
        k3[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k3[0];
        clone.I = phases.I + 0.5 * k3[1];
        clone.D = phases.D + 0.5 * k3[2];
        clone.A = phases.A + 0.5 * k3[3];
        clone.R = phases.R + 0.5 * k3[4];
        clone.T = phases.T + 0.5 * k3[5];
        clone.H = phases.H + 0.5 * k3[6];
        clone.E = phases.E + 0.5 * k3[7];
        k4[j] = h * vfunc[j](t + h, clone, parameters, N);
      }
      phases.S += (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6.;
      phases.I += (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6.;
      phases.D += (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) / 6.;
      phases.A += (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]) / 6.;
      phases.R += (k1[4] + 2 * k2[4] + 2 * k3[4] + k4[4]) / 6.;
      phases.T += (k1[5] + 2 * k2[5] + 2 * k3[5] + k4[5]) / 6.;
      phases.H += (k1[6] + 2 * k2[6] + 2 * k3[6] + k4[6]) / 6.;
      phases.E += (k1[7] + 2 * k2[7] + 2 * k3[7] + k4[7]) / 6.;
      result.push({ id: t, S: phases.S, I: phases.I, D: phases.D, A: phases.A, R: phases.R, T: phases.T, H: phases.H, E: phases.E });
      t = t + h;
    }
    return result;

  }


  let clonePhases = Object.assign({}, props.phases);
  const [phases, updatePhases] = useState(clonePhases);
  const [result, updateResult] = useState([{ id: 0, S: 0, I: 0, D: 0, A: 0, R: 0, T: 0, H: 0, E: 0 }]);



  useEffect(() => {
    updateResult(rk(phases, 0, 200, 1, props.parameters, 10));
  }, [props.phases])

  return <Model {...props} result={result} title='SIDARTHE' changeValue={props.changeValue} />
}

let mapStateToProps = (state: AppStateType) => {
  return {
    phases: state.main.SIDARTHEPhases,
    parameters: state.main.SIDARTHEParameters,
    colors: state.main.colors
  }
}

export default connect(mapStateToProps, { changeValue })(SIDARTHEContainer);
