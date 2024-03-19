import { Routes, Route, Link } from 'react-router-dom';
import SIDARTHEContainer from './components/MSEIR/SIDARTHEContainer';
import Navigation from './components/Navigation/Navigation';
import ExperimentContainer1 from './components/Practise/Experiment/ExperimentContainer1';
import ExperimentContainer2 from './components/Practise/Experiment/ExperimentContainer2';
import SEIRContainer from './components/SEIR/SEIRContainer';
import SEIRDContainer from './components/SEIRD/SEIRDContainer';
import SIRContainer from './components/SIR/SIRContainer';
import ExperimentContainer3 from './components/Practise/Experiment/ExperimentContainer3';
import NavigationContainer from './components/Navigation/NavigationContainer';
// import GraphContainer from './components/Graph/GraphContainer';

const App = () => {

  return (
    <div className="App">
      <div className="container">
        <NavigationContainer />
        <Routes >
          <Route path="/experiment1" element={<ExperimentContainer1 />} />
          <Route path="/experiment2" element={<ExperimentContainer2 />} />
          <Route path="/experiment3" element={<ExperimentContainer3 />} />
        </Routes>
        {/* <ExperimentContainer1 />
        <ExperimentContainer2 />
        <ExperimentContainer3 /> */}
      </div>
    </div>
  );
}

export default App;
