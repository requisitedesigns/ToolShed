import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"

function parseConfig2(fqdnArray, nextHop) {
  var fqdnList = fqdnArray.split("\n")
  var nextHopIP = nextHop
  var ret = fqdnList
    .map((e) => {
      return 'ip route ' + e + " " + nextHopIP
    })
    .join("\n")
  return 'config terminal\n' + ret
}

function handleCopy(textArea) {
  navigator.clipboard.writeText(textArea)
}

function CiscoStaticRoute() {
  var [showModal, setShow] = useState(true)
  var handleClose = () => setShow(false)
  var handleShow = () => setShow(true)
  var handleShowSettings = () => setShow(true)
  var [fqdnList, setFqdnList] = useState("")
  var [output, setOutput] = useState("")
  var [nextHop, setNextHop] = useState("")
  var handleChange = (e) => {
    setFqdnList(e.target.value)
  }
  var handleNextHopChange = (e) => {
    setNextHop(e.target.value)
    setOutput(parseConfig2(fqdnList, nextHop))
  }


  var handleOutput = (e) => {
    setOutput(parseConfig2(fqdnList, nextHop))
  }

  return (
    <div className="appContainer">
      <div>
        <h1 className="appTitle">Static Route Generator</h1> <br />
        <p className="subTitle">This tool will generate the configuration input required to apply a list of IPs to the left text area and the right text area will produce the configuration dynamically.</p>
        <br />
        <Button variant="info" className="navLinks" onClick={handleShow}>
          <li>Static Route Generator</li>
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Static Route Config Generator</Modal.Title>
          <input name="nextHop" value={nextHop} onChange={handleNextHopChange} type="text" placeholder="Enter your next hop IP"></input>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>IP Subnet Input (no mask = /32)</label>
              <textarea className="textFields" value={fqdnList} onChange={handleChange}></textarea>
            </div>
            <div className="col-6">
              <label>Configuration</label>
              <textarea className="textFields" value={output} onChange={handleOutput}></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={handleCopy(output)}>
            Copy to Clipboard
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="backButton">
      <Link to="/vendor/cisco/CiscoStaticRoute/settings">
          <Button variant="info" className="navLinks" onClick={handleShowSettings}>
            <li>Settings</li>
          </Button>
        </Link>
        <Link to="/vendor/cisco">
          <Button className="navLinks" variant="info">
            <li>Back</li>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CiscoStaticRoute
