//import useState hook to create menu collapse state
import React, { useState } from "react";
import {
  Link,
} from "react-router-dom";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { VscWholeWord } from "react-icons/vsc";
import { FcFile } from "react-icons/fc";
// import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css"


const Sidebar = () => {
  const [menuCollapse, setMenuCollapse] = useState(true)
  const [homeActive, setHomeActive] = useState(true)
  const [memberActive, setMemberActive] = useState(false)
  // const [multipleActive, setMultipleActive] = useState(false)
  const [fileActive, setFileActive] = useState(false)

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  }

  const homeMenu = () => {
    setHomeActive(true)
    setMemberActive(false)
    // setMultipleActive(false)
    setFileActive(false)
  };

  const memberMenu = () => {
    setHomeActive(false)
    setMemberActive(true)
    // setMultipleActive(false)
    setFileActive(false)
  };

  // const multipleMenu = () => {
  //   setHomeActive(false)
  //   setMemberActive(false)
  //   setMultipleActive(true)
  //   setFileActive(false)
  // }

  const fileMenu = () => {
    setHomeActive(false)
    setMemberActive(false)
    // setMultipleActive(false)
    setFileActive(true)

  }
  if (localStorage.token) {
    return (
      <>
        <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              {/* <div className="logotext"> */}
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div> */}
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <FiArrowRightCircle />
                ) : (
                  <FiArrowLeftCircle />
                )}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem active={homeActive} onClick={homeMenu} icon={<FiHome />}>
                  <Link to="/">Home</Link>
                </MenuItem>

                <MenuItem active={memberActive} onClick={memberMenu} icon={<VscWholeWord />}>
                  <Link to="/add">API Tester</Link>
                </MenuItem>

                {/* <MenuItem active={multipleActive} onClick={multipleMenu} icon={<VscJson />}>
                  <Link to="/multiple">Input JSON</Link>
                </MenuItem> */}

                <MenuItem active={fileActive} onClick={fileMenu} icon={<FcFile />}>
                  <Link to="/file">Upload File</Link>
                </MenuItem>

                {/*<MenuItem icon={<BiCog />}>Settings</MenuItem> */}
              </Menu>
            </SidebarContent>
            {/* <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter> */}
          </ProSidebar>
        </div>
      </>
    )
  }
  else {
    return (
      <></>
    )
  }
}
export default Sidebar;
