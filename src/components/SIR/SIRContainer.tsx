
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux";
import { SIRContainerType } from "../../types/types";
import { changeValue } from "../../redux/mainReducer";
import Model from "../Model/Model";

const SIRContainer: React.FC<SIRContainerType> = (props) => {

  let f1 = (t: any, phases: any, parameters: any, N: number) => {
    return (-parameters.beta * phases.S * phases.I);
  }
  let f2 = (t: any, phases: any, parameters: any, N: number) => {
    return (parameters.beta * phases.S * phases.I) - parameters.gamma * phases.I;
  }
  let f3 = (t: any, phases: any, parameters: any, N: number) => {
    return parameters.gamma * phases.I;
  }

  let rk = (phases: any, t0: any, max_t: any, h: any, parameters: any, N: number) => {
    // debugger;
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

  const [phases, updatePhases] = useState(Object.assign({}, props.phases));
  const [result, updateResult] = useState([{ id: 0, S: 0, I: 0, R: 0 }]);



  // useEffect(() => {
  //   const rk4 = require("ode-rk4");
  //   function copy(x: any) {
  //     return Object.assign({}, x)
  //   }
  //   function simulate(f: any, t0: any, y0: any, step: any, tmax: any) {
  //     var integrator = rk4(y0, f, t0, step)
  //     var t = t0
  //     var y = y0
  //     var ta = []
  //     var ya = []
  //     ta.push(t0)
  //     ya.push(copy(y))
  //     while (true) {
  //       t = t + step
  //       if (t > tmax) break
  //       integrator = integrator.step()
  //       ya.push(copy(integrator.y))
  //       ta.push(t)
  //     }
  //     return { t: ta, y: ya };
  //   }
  //   function sir(dydt: any, y: any, t: any) {
  //     dydt[0] = -b * y[0] * y[1];
  //     dydt[1] = b * y[0] * y[1] - g * y[1];
  //     dydt[2] = g * y[1];
  //   }
  //   const b = 0.1;
  //   const g = 0.05;
  //   const I0 = 0.01;
  //   const step = 1;
  //   const tmax = 100.0;
  //   var sir_sol = simulate(sir, 0, [997 / 1000, 3 / 1000, 0.0], step, tmax)
  //   console.log(sir_sol);
  // })





  useEffect(() => {
    updatePhases(Object.assign({}, props.phases));
    updateResult(rk(phases, 0, 100, 1, props.parameters, 10));
  }, [props.phases, props.parameters])

  console.log(result[50]);
  return <Model {...props} result={result} title='SIR' changeValue={props.changeValue} />
}

let mapStateToProps = (state: AppStateType) => {
  return {
    phases: state.main.SIRPhases,
    parameters: state.main.SIRParameters,
    colors: state.main.colors
  }
}

export default connect(mapStateToProps, { changeValue })(SIRContainer);
