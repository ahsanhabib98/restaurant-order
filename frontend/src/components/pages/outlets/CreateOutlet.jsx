import React, { Component } from "react"
import Header from "../../bases/Header"

import Sidebar from "../../bases/Sidebar"

import OutletCreateUpdate from './OutletCreateUpdate'

class CreateOutlet extends Component {
    render() {
        return (
            <div id="wrapper">
                <div className="navbar-nav">
                    <Sidebar />
                </div>
                <div className="d-flex flex-column content_area">
                    <header>
                        <Header />
                    </header>
                    <div className="main_content">
                        <div className="container-fluid">
                           <OutletCreateUpdate />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CreateOutlet
