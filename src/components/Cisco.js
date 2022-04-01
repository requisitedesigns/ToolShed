import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function Cisco() {
  return (
    <>
      <div className="appContainer">
        <div classNam="row">
          <div id="logoCol">
            <logo className="logo-main">
              <h1 className="appTitle">ToolShed</h1>
              <p className="subTitle">Current Tool Shed: Cisco</p>
            </logo>
          </div>
          <br />
          <div id="navCol" className="fortiCol">
            <ul className="navUL">
              <Button className="navLinks" variant="info">
                <Link to="/vendor/cisco/static-route/">
                  <li>Static Route</li>
                </Link>
              </Button>
              <Button className="navLinks" variant="secondary" disabled>
                <Link to="#">
                  <li>FW Rule</li>
                </Link>
              </Button>
              <Button className="navLinks" variant="secondary" disabled>
                <li>Prefix List</li>
              </Button>
              <Button className="navLinks" variant="secondary" disabled>
                <li>Whitelist</li>
              </Button>
            </ul>
            <ul className="navUL">
              <Button className="navLinks" variant="secondary" disabled>
                <li>VPN</li>
              </Button>
              <Button className="navLinks" variant="secondary" disabled>
                <li>IP Objects</li>
              </Button>
              <Button className="navLinks" variant="secondary" disabled>
                <li>BGP Peer</li>
              </Button>
              <Button className="navLinks" variant="secondary" disabled>
                <li>VDOM</li>
              </Button>
            </ul>
          </div>
        </div>
        <div>
          <Link to="/">
            <Button className="navLinks" variant="info">
              <li>Back</li>
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Cisco
