
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux";
import { NavigationContainerType } from "../../types/types";
import Navigation from "./Navigation";

const NavigationContainer: React.FC<NavigationContainerType> = (props) => {

  return <Navigation {...props} />
}

let mapStateToProps = (state: AppStateType) => {
  return {
    // currentURL: state.main.currentURL
  }
}

export default connect(mapStateToProps, {})(NavigationContainer);
