import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classnames from "classnames";

const SideDrawer = props => {
  const className = classnames(classes.SideDrawer, classes.Close, {
    [classes.Open]: props.open
  });
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={className}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
