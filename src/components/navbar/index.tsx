import React from "react";
import "./css/navbar.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const Navbar: React.FC = (): React.ReactElement => {
  let homeRef = useRef<HTMLHeadingElement>(null);
  let favRef = useRef<HTMLHeadingElement>(null);
  const [ref, setRef] = React.useState<string>("");
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
    sessionStorage.setItem("navItem", path);
    setRef(path);
  };

  React.useEffect(() => {
    let item = sessionStorage.getItem("navItem");
    if (item === "/") {
      favRef.current?.classList.remove("active");
      homeRef.current?.classList.add("active");
    }
    if (item === "/favourites") {
      homeRef.current?.classList.remove("active");
      favRef.current?.classList.add("active");
    }
  }, [ref]);

  return (
    <div className='navContainer'>
      <div ref={homeRef} className='navItem' onClick={() => navigateTo("/")}>
        Home
      </div>
      &nbsp;|
      <div ref={favRef} className='navItem' onClick={() => navigateTo("/favourites")}>
        Favourites
      </div>
    </div>
  );
};

export default Navbar;
