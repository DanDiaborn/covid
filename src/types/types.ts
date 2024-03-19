import { changeValue } from './../redux/mainReducer';
import { CHANGE_URL, CHANGE_VALUE, GET_DATA, SETUP, TEST } from './../constants/constants';

type coordinates = { id: number, S: number, I: number, R: number } | { id: number, S: number, E: number, I: number, R: number }
  | { id: number, S: number, I: number, D: number, A: number, R: number, T: number, H: number, E: number }

export type request = {
  Active: number,
  City: string,
  CityCode: string,
  Comment: string,
  Confirmed: number,
  Country: number,
  CountryCode: string,
  Date: string,
  Deaths: number,
  Lat: string,
  Lon: string,
  Province: string,
  Recovered: number
}

export type coordinateType = Array<coordinates>;

export type ExperimentContainerType = {
  experiments: any,
  phases: object,
  parameters: object,
  colors: string[]
}

export type ExperimentType = {
  experiment: any,
  phases: object,
  parameters: object,
  colors: string[],
  experimentNumber: number
}

export type PractiseSIRType = {
  phases: object,
  parameters: object,
  experimentArray: any,
  colors: string[],
  experimentNumber: number
}

export type PractiseSIEQRTPType = {
  phases: object,
  parameters: object,
  experimentArray: any,
  colors: string[],
  experimentNumber: number
}

export type PractiseModelType = {
  phases: object,
  parameters: object,
  experimentArray: any,
  result: any,
  colors: string[],
  experimentNumber: number
}

export type PractiseGraphType = {
  coordinates: coordinateType,
  colors: string[]
}






///////////////////////////////////////////


export type NavigationContainerType = {
  // currentURL: string
}

export type NavigationType = {
  // currentURL: string,
  // changeURL: (newURL: string) => void
}

export type ModelType = {
  phases: object,
  parameters: object,
  result: any,
  title: string,
  colors: any,
  changeValue: (model: string, name: string, newValue: number) => void
}

export type SIRType = {
  phases: object,
  parameters: object,
  result: any
}

export type SIRContainerType = {
  phases: object,
  parameters: object,
  colors: any,
  changeValue: (model: string, name: string, newValue: number) => void
}

export type SEIRContainerType = {
  phases: object,
  parameters: object,
  colors: any,
  changeValue: (model: string, name: string, newValue: number) => void

}

export type SEIRType = {
  phases: object,
  parameters: object,
  result: any
}

export type SEIRDContainerType = {
  phases: object,
  parameters: object,
  colors: any,
  changeValue: (model: string, name: string, newValue: number) => void
}

export type SEIRDType = {
  phases: object,
  parameters: object,
  result: any
}

export type SIDARTHEType = {
  phases: object,
  parameters: object,
  result: any
}

export type SIDARTHEContainerType = {
  phases: object,
  parameters: object,
  colors: any,
  changeValue: (model: string, name: string, newValue: number) => void
}

export type SIDARTHEPhasesType = {
  N: number,
  I: number,
  D: number,
  A: number,
  R: number,
  T: number,
  H: number,
  E: number,
  S: number
}

export type SIDARTHEParametersType = {
  alpha: number,
  beta: number,
  delta: number,
  gamma: number,
  epsilon: number,
  zeta: number,
  lamda: number,
  eta: number,
  rho: number,
  theta: number,
  mu: number,
  kappa: number,
  nu: number,
  xi: number,
  sigma: number,
  tau: number
}

export type GraphType = {
  coordinates: coordinateType
}

type getData = {
  type: typeof GET_DATA,
  request: request[]
}

type test = {
  type: typeof TEST
}

type setup = {
  type: typeof SETUP
}

type changeURL = {
  type: typeof CHANGE_URL
  newURL: string
}

type changeValue = {
  type: typeof CHANGE_VALUE
  model: string,
  name: string,
  newValue: number
}

export type actionCreatorType = getData | test | setup | changeURL | changeValue;