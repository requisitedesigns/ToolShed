import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Fortigate from "./components/Fortigate"
import FortigateWhitelistToolFQDN from "./components/FortigateWhitelistToolFQDN"
import FortigateFWRule from "./components/FortigateFWRule"
import FortigateIPObjects from './components/FortigateIPObjects'
import Cisco from './components/Cisco'
import CiscoStaticRoute from './components/CiscoStaticRoute'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/vendor/fortigate" element={<Fortigate />} />
        <Route exact path="/vendor/fortigate/whitelist-tool/" element={<FortigateWhitelistToolFQDN />} />
        <Route exact path="/vendor/fortigate/fw-rule-gen/" element={<FortigateFWRule />} />
        <Route exact path="/vendor/fortigate/ip-objects/" element={<FortigateIPObjects />} />
        <Route exact path="/vendor/cisco" element={<Cisco />} />
        <Route exact path="/vendor/cisco/static-route/" element={<CiscoStaticRoute />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
