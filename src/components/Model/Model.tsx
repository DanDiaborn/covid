import { useEffect, useState } from "react";
import { ModelType } from "../../types/types";
import Graph from "../Graph/Graph";

type graphColorType = [string, string, string] | [string, string, string, string] | [string, string, string, string, string] |
[string, string, string, string, string, string, string, string]

const Model: React.FC<ModelType> = (props) => {

  let valueChanger = (name: string, e: any) => {
    // console.log(e);
    props.changeValue(props.title, name, e.target.value);
  }

  let [graphColors, updateGraphColors] = useState<graphColorType>(['', '', '']);
  let parameters = [];
  let phases = [];
  for (let key in props.parameters) {
    parameters.push({ name: key, value: (props.parameters as any)[key] });
  }
  for (let key in props.phases) {
    phases.push({ name: key, value: (props.phases as any)[key] });
  }

  useEffect(() => {
    switch (props.title) {
      case 'SIR':
        updateGraphColors([props.colors.S, props.colors.I, props.colors.R]);
        break;
      case 'SEIR':
        updateGraphColors([props.colors.S, props.colors.E, props.colors.I, props.colors.R]);
        break;
      case 'SEIRD':
        updateGraphColors([props.colors.S, props.colors.E, props.colors.I, props.colors.R, props.colors.D]);
        break;
      case 'SIDARTHE':
        updateGraphColors([props.colors.S, props.colors.I, props.colors.D,
        props.colors.A, props.colors.R, props.colors.T, props.colors.H, props.colors.E]);
        break;
    }
  }, [])
  return (
    <div className="model">
      <h2 className="model__title">{props.title}</h2>
      <div className="model__wrapper">
        <div className="model__top">
          <div className="model__left">
            <div className="model__wrapper">
              <div className="model__subtitle">Phases:</div>
              <div className="model__phases">
                {phases.map((key: any, index: any) => {
                  return <>
                    <div key={index} className="model__phase">
                      <div className="model__phase-item">{key.name}0: {
                        <textarea className="model__textarea" onChange={event => valueChanger(key.name, event)} value={key.value}></textarea>
                      }</div>
                      <div className="model__phase-color" style={{ backgroundColor: graphColors[index] }}></div>
                    </div>
                  </>
                })}
              </div>
            </div>
            <div className="model__wrapper">
              <div className="model__subtitle">Parameters:</div>
              <div className="model__parameters">
                {parameters.map((key: any, index: any) => {
                  return <div key={index} className="model__parameters-item">
                    {key.name}: {
                      <textarea className="model__textarea" onChange={event => valueChanger(key.name, event)} value={key.value}></textarea>
                    }
                  </div>
                })}
              </div>
            </div>
          </div>
          <div className="model__right">
            <img src={require(`../../images/${props.title}.png`)} alt="" className="model__img" />
          </div>
        </div>
        <Graph coordinates={props.result} />

      </div>
    </div>
  )
}

export default Model;
