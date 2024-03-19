import { PractiseGraphType } from "../../types/types";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from "recharts";
const Graph: React.FC<PractiseGraphType> = (props) => {

  return (
    <div className="practiseGraph" >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={props.coordinates}>
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="0" stroke={props.colors[0]} />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="1" stroke={props.colors[1]} />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="2" stroke={props.colors[2]} />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="3" stroke={props.colors[3]} />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="4" stroke={props.colors[4]} />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="5" stroke={props.colors[5]} />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="A" stroke="#ff7f0e" />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="T" stroke="#d62728" />
          <Line type="monotone" dot={false} strokeWidth={2} dataKey="H" stroke="#9467bd" />
          <CartesianGrid stroke="#000" />
          <XAxis dataKey="id" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div >
  )
}

export default Graph;