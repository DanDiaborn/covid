
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux";
import { PractiseSIRType } from "../../../types/types";
import { changeValue } from "../../../redux/mainReducer";
import PractiseModel from "../PractiseScreen/PracticeModel";

const PractiseSIR: React.FC<PractiseSIRType> = (props) => {

  let f1 = (t: any, phases: any, parameters: any, N: number) => {
    return (-parameters.beta * phases.S * phases.I) / N;
  }
  let f2 = (t: any, phases: any, parameters: any, N: number) => {
    return (parameters.beta * phases.S * phases.I) / N - parameters.gamma * phases.I;
  }
  let f3 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.gamma * phases.I;
  }

  let rk = (phases: any, t0: any, max_t: any, h: any, parameters: any, N: number) => {
    let k1 = [3], k2 = [3], k3 = [3], k4 = [3];
    let vfunc = [f1, f2, f3];
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
        clone.R = phases.R + 0.5 * k1[2];
        k2[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k2[0];
        clone.I = phases.I + 0.5 * k2[1];
        clone.R = phases.R + 0.5 * k2[2];
        k3[j] = h * vfunc[j](t + 0.5 * h, clone, parameters, N);
      }
      for (let j = 0; j < vfunc.length; ++j) {
        clone.S = phases.S + 0.5 * k3[0];
        clone.I = phases.I + 0.5 * k3[1];
        clone.R = phases.R + 0.5 * k3[2];
        k4[j] = h * vfunc[j](t + h, clone, parameters, N);
      }
      phases.S += (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6.;
      phases.I += (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6.;
      phases.R += (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) / 6.;

      result.push({ id: t, S: phases.S, I: phases.I, R: phases.R });
      t = t + h;
    }
    return result;

  }

  // const [phases, updatePhases] = useState(Object.assign({}, props.phases));
  const [result, updateResult] = useState([[{ id: 0, S: 0, I: 0, R: 0 }]]);
  useEffect(() => {
    let newResult: any = [];
    let phases: any;
    let parameters: any;
    let N = 1000000;

    for (let i = 0; i < props.experimentArray[1].length; i++) {
      phases = Object.assign({}, props.phases);
      parameters = Object.assign({}, props.parameters);
      ///////////Experiment var////////////
      switch (props.experimentArray[0].objectName) {
        case 'I0':
          phases.I = props.experimentArray[1][i];
          phases.S = N - 1;
          break;
        case 'N':
          N = props.experimentArray[1][i];
          phases.S = props.experimentArray[1][i] - 1;
          break;
        case 'beta':
          parameters.beta = props.experimentArray[1][i];
          if (props.experimentNumber === 2) {
            N = 1000000000;
            phases.I = 200;
          }
          phases.S = N - 1;
          break;
        case 'gamma':
          if (props.experimentNumber === 2) {
            N = 1000000000;
            phases.I = 200;
          }
          parameters.gamma = props.experimentArray[1][i];
          phases.S = N - 1;
          break;
        case 'alpha':
          if (props.experimentNumber === 2) {
            N = 1000000000;
            phases.I = 200;
          }
          parameters.alpha = props.experimentArray[1][i];
          phases.S = N - 1;
          break;
        case 'lamda':
          if (props.experimentNumber === 2) {
            N = 1000000000;
            phases.I = 200;
          }
          parameters.lamda = props.experimentArray[1][i];
          phases.S = N - 1;
          break;
        case 'delta':
          if (props.experimentNumber === 2) {
            N = 1000000000;
            phases.I = 200;
          }
          parameters.delta = props.experimentArray[1][i];
          phases.S = N - 1;
          break;
      }
      newResult.push(rk(phases, 0, 180, 1, parameters, N));
    }
    for (let i = 0; i < newResult.length; i++) {
      for (let j = 0; j < newResult[i].length; j++) {
        delete newResult[i][j].S;
        delete newResult[i][j].R;
      }
    }
    let lastMassive: any = [];
    for (let i = 0; i < 180; i++) {
      if (newResult.length === 6) {
        lastMassive[i] = { id: i, '0': newResult[0][i].I, '1': newResult[1][i].I, '2': newResult[2][i].I, '3': newResult[3][i].I, '4': newResult[4][i].I, '5': newResult[5][i].I };
      }
      if (newResult.length === 5) {
        lastMassive[i] = { id: i, '0': newResult[0][i].I, '1': newResult[1][i].I, '2': newResult[2][i].I, '3': newResult[3][i].I, '4': newResult[4][i].I };
      }
      if (newResult.length === 4) {
        lastMassive[i] = { id: i, '0': newResult[0][i].I, '1': newResult[1][i].I, '2': newResult[2][i].I, '3': newResult[3][i].I };
      }
      if (newResult.length === 3) {
        lastMassive[i] = { id: i, '0': newResult[0][i].I, '1': newResult[1][i].I, '2': newResult[2][i].I };
      }
    }

    updateResult(lastMassive);
  }, [props.phases, props.parameters])
  return <PractiseModel {...props} result={result} />
}

export default PractiseSIR;
