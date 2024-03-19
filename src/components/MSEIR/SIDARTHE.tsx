import { SIDARTHEType } from "../../types/types";
import Graph from "../Graph/Graph";
import img from '../../images/SIDARTHE.png';


const SIDARTHE: React.FC<SIDARTHEType> = (props) => {
  let parameters = [];
  let phases = [];
  for (let key in props.parameters) {
    parameters.push({ name: key, value: (props.parameters as any)[key] });
  }
  for (let key in props.phases) {
    phases.push({ name: key, value: (props.phases as any)[key] });
  }
  return (
    <div className="">
      <h2>SIDARTHE</h2>
      <img src={img} alt="" className="model__img" />
      {phases.map((key: any, index: any) => {
        return <div key={index} className="">
          {key.name}0: {key.value}
        </div>
      })}
      {parameters.map((key: any, index: any) => {
        return <div key={index} className="">
          {key.name}: {key.value}
        </div>
      })}
      <Graph coordinates={props.result} />
    </div>
  )
}

export default SIDARTHE;