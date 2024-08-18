import { Outlet } from "react-router-dom";
import NavMenu from "../Shared/NavMenu";

const Root = () => {
  return (
    <div>
      <NavMenu></NavMenu>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
