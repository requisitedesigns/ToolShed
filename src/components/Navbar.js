import React from 'react'
import {Button} from 'react-bootstrap'
import Me from '../imgs/Me.jpg'
import { Link } from 'react-router-dom'


function Navbar() {
    return (  
        <>
        <div className="appContainer">
            <div id="logoCol">
                <logo className="logo-main">
                    <h1 className="appTitle">ToolShed</h1>
                    <p className="subTitle">A Networking Resource</p>
                    <p className="subTitle">created by</p>
                    <img src={Me} className="logoImg"></img>
                </logo>
            </div>
            <div id="navCol">
                <h2 id="vendorChoice" className="appTitle">Choose Your Vendor:</h2>
                <ul>
                    <Button className="navLinks" variant="secondary" disabled><li>Juniper</li></Button>
                    <Link to="/vendor/fortigate"><Button className="navLinks" variant="info"><li>Fortigate</li></Button></Link>
                </ul>
                <ul>    
                    <Button className="navLinks" variant="secondary" disabled><li>Cisco</li></Button>
                    <Button className="navLinks" variant="secondary" disabled><li>Palo Alto</li></Button> 
                </ul>
            </div>
        </div>
        </>
    )
}

export default Navbar