import { CHANGE_URL, CHANGE_VALUE, GET_DATA, SETUP, TEST } from './../constants/constants';
import { actionCreatorType, coordinateType, request } from '../types/types';

type stateType = typeof initialState;

let N = 8 * Math.pow(Math.E, 6);
let SEIRDN = 1000;

export let initialState = {
  experimentColors: [
    'red',
    'green',
    'blue',
    'brown',
    'purple',
    'orange'
  ],
  experiments: [
    [
      [
        {
          objectName: 'I0'
        },
        [
          1,
          200,
          400,
          600,
          800,
          1000
        ],
        [
          30,
          20,
          19,
          18,
          18,
          17
        ],
        [
          751398,
          752703,
          752743,
          752630,
          752092,
          752370
        ]
      ],
      [
        {
          objectName: 'N'
        },
        [
          1000000,
          1250000,
          1500000,
          1750000,
          2000000
        ],
        [
          24,
          25,
          25,
          25,
          25
        ],
        [

          752476,
          939758,
          1129150,
          1316865,
          1502699,
        ]
      ],
      [
        {
          objectName: 'beta'
        },
        [
          0.2,
          0.4,
          0.6,
          0.8,
          1
        ],
        [
          63,
          30,
          20,
          15,
          12
        ],
        [
          478024,
          669707,
          752703,
          799752,
          830157
        ]
      ],
      [
        {
          objectName: 'gamma'
        },
        [
          0.02,
          0.04,
          0.06,
          0.08,
          0.1
        ],
        [
          21,
          20,
          20,
          20,
          21
        ],
        [
          852687,
          752703,
          669707,
          597550,
          532761
        ]
      ]
    ],
    [
      [
        {
          objectName: 'I0'
        },
        [
          1,
          20,
          200,
          2000,
          20000
        ],
        [
          30,
          24,
          20,
          16,
          12,
        ],
        [
          751398,
          752476,
          752703,
          752924,
          754063,
        ]
      ],
      [
        {
          objectName: 'N'
        },
        [
          10000,
          100000,
          1000000,
          10000000,
          100000000
        ],
        [
          16,
          20,
          24,
          28,
          32,
        ],
        [
          7529,
          75270,
          752476,
          7521410,
          75168212
        ]
      ],
      [
        {
          objectName: 'beta'
        },
        [
          0.006,
          0.06,
          0.6,
        ],
        [
          0,
          180,
          32
        ],
        [
          200,
          7467,
          751682125
        ]
      ],
      [
        {
          objectName: 'gamma'
        },
        [
          0.003,
          0.03,
          0.3
        ],
        [
          35,
          32,
          51
        ],
        [
          968381850,
          799541690,
          153208305
        ]
      ]
    ],
    [
      [
        {
          objectName: 'alpha'
        },
        [
          0.085,
          0.105,
          0.125,
          0.145,
          0.165,
          0.185
        ],
        [
          24,
          20,
          17,
          15,
          13,
          12,
        ],
        [
          2048,
          1352,
          1015,
          822,
          699,
          615,
        ]
      ],
      [
        {
          objectName: 'beta'
        },
        [
          0.5,
          0.6,
          0.7,
          0.8,
          0.9,
          1
        ],
        [
          14,
          15,
          15,
          17,
          18,
          19,
        ],
        [
          463,
          619,
          818,
          1070,
          1387,
          1780,
        ]
      ],
      [
        {
          objectName: 'lamda'
        },
        [
          0.1,
          0.15,
          0.2,
          0.25,
          0.3,
          0.35
        ],
        [
          19,
          18,
          17,
          17,
          16,
          16,
        ],
        [
          570,
          802,
          1015,
          1212,
          1397,
          1572,
        ]
      ],
      [
        {
          objectName: 'delta'
        },
        [
          0.08,
          0.1,
          0.12,
          0.14,
          0.16,
          0.18
        ],
        [
          21,
          19,
          17,
          16,
          14,
          13,
        ],
        [
          1693,
          1291,
          1015,
          816,
          670,
          560,
        ]
      ]
    ]
  ],
  currentURL: '',
  colors: {
    M: '#000',
    S: '#2533F5',
    I: '#ff0000',
    E: '#8c564b',
    R: '#2ca02c',
    D: '#1f77b4',
    A: '#ff7f0e',
    T: '#d62728',
    H: '#9467bd'
  },
  N: 1000,
  SIRPhases: {
    S: 997 / 1000 as number,
    I: 3 / 1000 as number,
    R: 0 / 1000 as number
  },
  SIRParameters: {
    beta: 0.4 as number,
    gamma: 0.04 as number
  } as any,
  experimentSIRPhases: {
    S: 1000000 - 1 as number,
    I: 1 as number,
    R: 0 as number
  },
  experimentSIRParameters: {
    beta: 0.6 as number,
    gamma: 0.04 as number
  } as any,
  experimentSEIQRPDPPhases: {
    S: 1000000 - 280,
    E: 0,
    I: 280,
    Q: 0,
    R: 0,
    D: 0,
    P: 0
  },
  experimentSEIQRPDPParameteres: {
    beta: 0.78,
    lamda: 0.2,
    delta: 0.12,
    gamma: 0.3,
    kappa: 0.025,
    alpha: 0.125
  },
  SEIRPhases: {
    S: 1 - 1 / 1000 as number,
    E: 1 / 1000 as number,
    I: 0 as number,
    R: 0 as number
  },
  SEIRParameters: {
    beta: 4 / 1 / 3.3 as number,
    gamma: 1 / 3.3 as number,
    kappa: 1 / 5.1 as number
  } as any,
  SEIRDPhases: {
    S: 1 - 1 / 1000 as number,
    E: 1 / 1000 as number,
    I: 0 as number,
    R: 0 as number,
    D: 0 as number
  },
  SEIRDParameters: {
    beta: 1.38 as number,
    sigma: 0.19 as number,
    gamma: 0.34 as number,
    mu: 0.03 as number
  } as any,
  SIDARTHEPhases: {
    I: 200 / N as number,
    D: 20 / N as number,
    A: 1 / N as number,
    R: 2 / N as number,
    T: 0.00 as number,
    H: 0.00 as number,
    E: 0.00 as number,
    S: 1 - 200 / N - 20 / N - 1 / N - 2 / N as number
  },
  SIDARTHEParameters: {
    alpha: 0.57 as number,
    beta: 0.0011 as number,
    delta: 0.0011 as number,
    gamma: 0.456 as number,
    epsilon: 0.171 as number,
    zeta: 0.125 as number,
    lamda: 0.034 as number,
    eta: 0.125 as number,
    rho: 0.034 as number,
    theta: 0.371 as number,
    mu: 0.0171 as number,
    kappa: 0.017 as number,
    nu: 0.027 as number,
    xi: 0.017 as number,
    sigma: 0.017 as number,
    tau: 0.01 as number
  } as any,
  // SIDARTHEPhases: {
  //   N: N,
  //   I: 20 / N,
  //   D: 9 / N,
  //   A: 1 / N,
  //   R: 2 / N,
  //   T: 0.00,
  //   H: 0.00,
  //   E: 0.00,
  //   S: 1 - 20 / N - 9 / N - 1 / N - 2 / N
  // },
  // SIDARTHEParameters: {
  //   alpha: 0.23,
  //   beta: 0.0114,
  //   delta: 0.0114,
  //   gamma: 0.456,
  //   epsilon: 0.171,
  //   zeta: 0.1254,
  //   lamda: 0.0342,
  //   eta: 0.1254,
  //   rho: 0.0342,
  //   theta: 0.3705,
  //   mu: 0.0171,
  //   kappa: 0.00171,
  //   nu: 0.0274,
  //   xi: 0.00171,
  //   sigma: 0.00171,
  //   tau: 0.0001
  // } as any,
  // testCoordinates: [
  //   { id: 1, confirmed: 0, date: '12.12.12' },
  //   { id: 2, confirmed: 3, date: '12' },
  //   { id: 3, confirmed: 4, date: '15' },
  //   { id: 4, confirmed: 22, date: '115-15-1' }
  // ] as coordinateType,
  // N: 60 * Math.pow(Math.E, 6),
  // phases: { S: 0, I: 0, D: 0, H: 0, A: 0, R: 0, T: 0, E: 0, },
  // parameters: { alpha: 0.570, beta: 0.011, delta: 0.011, gamma: 0.456, epsilon: 0.171, theta: 0.371, zeta: 0.125, eta: 0.125, mu: 0.017, nu: 0.027, tau: 0.01, lambda: 0.034, rho: 0.034, kappa: 0.017, xi: 0.017, sigma: 0.017 },
  // beg_time: 0,
  // max_time: 31,
  // step: 0.1
}

// initialState.phases = { S: 0, I: 200 / initialState.N, D: 20 / initialState.N, H: 0, A: 1 / initialState.N, R: 2 / initialState.N, T: 0, E: 0, }
// initialState.phases.S = 1 - initialState.phases.I - initialState.phases.D - initialState.phases.H - initialState.phases.A - initialState.phases.R - initialState.phases.T - initialState.phases.E;

const MainReducer = (state: stateType = initialState, action: actionCreatorType): stateType => {
  switch (action.type) {
    case CHANGE_URL:
      return {
        ...state,
        currentURL: action.newURL
      }
    case CHANGE_VALUE:
      // console.log(action);
      let newSIRPhases: any = Object.assign([], state.SIRPhases);
      let newSIRParameters: any = Object.assign([], state.SIRParameters);
      if (action.model = 'SIR') {
        for (let key in newSIRPhases) {
          if (key === action.name) {
            newSIRPhases[key] = Number(action.newValue);
          }
        }
        for (let key in newSIRParameters) {
          if (key === action.name) {
            newSIRParameters[key] = Number(action.newValue);
          }
        }
      }
      return {
        ...state,
        SIRPhases: newSIRPhases,
        SIRParameters: newSIRParameters
      }
    default:
      return state;
  }
}

export const changeURL = (newURL: string): actionCreatorType => {
  return { type: CHANGE_URL, newURL }
}

export const changeValue = (model: string, name: string, newValue: number): actionCreatorType => {
  return { type: CHANGE_VALUE, model, name, newValue }
}

export default MainReducer;