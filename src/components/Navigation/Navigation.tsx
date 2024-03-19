import { NavigationType } from "../../types/types";
import { NavLink, useLocation } from 'react-router-dom';


const Navigation: React.FC<NavigationType> = (props) => {

  const location = useLocation().pathname;
  let fSize = [16, 16, 16];

  switch (location) {
    case '/experiment1':
      fSize = [22, 18, 18];
      break;
    case '/experiment2':
      fSize = [18, 22, 18];
      break;
    case '/experiment3':
      fSize = [18, 18, 22];
      break;
    default:
      fSize = [18, 18, 18];
      break;
  }

  //location.pathname
  return <nav className="navigation">
    <div className="navigation__wrapper">
      <NavLink to='/experiment1'><div className="navigation__item" style={{ fontSize: fSize[0] }}>Experiment 1</div></NavLink>
      <NavLink to='/experiment2'><div className="navigation__item" style={{ fontSize: fSize[1] }}>Experiment 2</div></NavLink>
      <NavLink to='/experiment3'><div className="navigation__item" style={{ fontSize: fSize[2] }}>Experiment 3</div></NavLink>
    </div >
  </nav >
}



// export default Navigation;
export default Navigation;
