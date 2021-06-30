import React, { useState } from 'react'
// import {
//     Link,
// } from "react-router-dom";
import Sidebar from "react-sidebar";

export default function Navbar() {
    const [sidebarOpen, setsidebarOpen] = useState(false)
    return (
        <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={sidebarOpen}
        // onSetOpen={setsidebarOpen(false)}
        styles={{ sidebar: { background: "black" } }}
      >
        <button onClick={() => setsidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    )
    //admin login
    // if (localStorage.token) {
    //     return (
    //         <nav className="navbar is-black" role="navigation" aria-label="main navigation" style={{ position: 'sticky', top: 0 }}>
    //             <div className="navbar-brand">
    //                 <Link to="/" className="navbar-item"><p>Template App</p></Link>
    //             </div>

    //             <div id="navbarBasicExample" className="navbar-menu">
    //                 <div className="navbar-start">
    //                     <Link to="/" className="navbar-item"><p>Home</p></Link>
    //                 </div>
    //             </div>

    //             <div className="navbar-end">
    //                 <div className="navbar-item">
    //                     <div className="buttons" onClick={(e) => {
    //                         e.preventDefault()
    //                         localStorage.clear()
    //                         window.location.reload();
    //                     }}>
    //                         <p className="button is-dark"><strong>Logout</strong></p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </nav>
    //     )
    // }

    // //logout
    // else {
    //     return (
    //         <nav className="navbar is-black" role="navigation" aria-label="main navigation" style={{ position: 'sticky', top: 0 }}>
    //             <div className="navbar-brand">
    //                 <p className="navbar-item" href="https://bulma.io">Template App</p>
    //             </div>
    //         </nav>
    //     );
    // }
}
