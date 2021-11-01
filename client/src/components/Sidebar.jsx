//import useState hook to create menu collapse state
import React, { useState } from "react";
import {
  Link,
} from "react-router-dom";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  // SubMenu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiHome } from "react-icons/fi";
// import { VscWholeWord } from "react-icons/vsc";
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css"


const Sidebar = ({ sideNavExpanded, setSideNavExpanded }) => {
  const [menuCollapse, setMenuCollapse] = useState(true)
  // const [homeActive, setHomeActive] = useState(true)
  // const [modelActive, setModel] = useState(false)
  // const [trainActive, setTrain] = useState(false)

  const menuIconClick = () => {
    setSideNavExpanded(!sideNavExpanded);
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  }

  // const homeMenu = () => {
  //   setHomeActive(true)
  //   setModel(false)
  //   setTrain(false)
  // };

  // const model = () => {
  //   setHomeActive(false)
  //   setModel(true)
  //   setTrain(false)
  // }

  // const train = () => {
  //   setHomeActive(false)
  //   setModel(false)
  //   setTrain(true)
  // }

  if (localStorage.token) {
    return (
      <>
        <div id="header" style={{position : "fixed", display:"flex"}}>
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              {/* <div className="logotext"> */}
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div> */}
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {/* {menuCollapse ? (
                  <FiArrowRightCircle />
                ) : (
                  <FiArrowLeftCircle />
                )} */}
              </div>
            </SidebarHeader>
            <SidebarContent>
              {/* <Menu iconShape="square"> */}
              <Menu>
                <MenuItem icon={<FiHome size={50} />}>
                  <Link to="/">Home</Link>
                </MenuItem>

                {/* <SubMenu active={memberActive} title="API Tester" onClick={memberMenu} icon={<VscWholeWord />}>
                  <MenuItem><Link to="/add">Simple</Link></MenuItem>
                  <MenuItem><Link to="/file">Upload File</Link></MenuItem>
                </SubMenu> */}

                {/* <MenuItem icon={<AiFillCopy size={50}/>}>
                  <Link to="/test">Test Model</Link>
                </MenuItem>

                <MenuItem icon={<MdTrendingUp size={50}/>}>
                  <Link to="/train">Train Model</Link>
                </MenuItem> */}

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
