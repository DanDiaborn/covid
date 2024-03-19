import { GraphType } from "../../types/types";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from "recharts";
const Graph: React.FC<GraphType> = (props) => {

  return (
    <div className="graph model__graph" >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={props.coordinates}>
          <Line type="monotone" dot={false} dataKey="M" stroke="#000  " />
          <Line type="monotone" dot={false} dataKey="S" stroke="#2533F5" />
          <Line type="monotone" dot={false} dataKey="I" stroke="#ff0000" />
          <Line type="monotone" dot={false} dataKey="E" stroke="#8c564b" />
          <Line type="monotone" dot={false} dataKey="R" stroke="#2ca02c" />
          <Line type="monotone" dot={false} dataKey="D" stroke="#1f77b4" />
          <Line type="monotone" dot={false} dataKey="A" stroke="#ff7f0e" />
          <Line type="monotone" dot={false} dataKey="T" stroke="#d62728" />
          <Line type="monotone" dot={false} dataKey="H" stroke="#9467bd" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="id" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div >
  )
}

export default Graph;