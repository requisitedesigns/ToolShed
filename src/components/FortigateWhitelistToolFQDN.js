import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import ClipboardCopy from './ClipboardCopy'

function parseConfig2(fqdnArray) {
  var fqdnList = fqdnArray.split("\n")
  var ret = fqdnList
    .map((e) => {
      return 'edit 0\nset url "' + e + '"\nset type wildcard\nset action allow\nnext\n'
    })
    .join("")
  return 'config webfilter urlfilter\nedit 2\nset name "Environment_URL_Filter"\nconfig entries\n' + ret + "end"
  
}

function FortigateWhitelistToolFQDN() {
  var [showModal, setShow] = useState(true)
  var handleClose = () => setShow(false)
  var handleShow = () => setShow(true)
  var handleShowSettings = () => setShow(true)
  var [fqdnList, setFqdnList] = useState("")
  var [output, setOutput] = useState("")
  
  var handleChange = (e) => { 
    if (e.target.value) {
      setFqdnList(e.target.value);
      setOutput(parseConfig2(e.target.value));
    } else {
      setOutput("");
      setFqdnList("");
    }
  }

  
  var handleOutput = (e) => {
    // setOutput(parseConfig2(fqdnList))
  }

  return (
    <div className="appContainer">
      <div>
        <h1 className="appTitle">WhiteListing Tool</h1> <br />
        <p className="subTitle">This tool will generate the configuration input required to apply a new URL to an existing Fortigate Content Filter. Input a list of FQDN's on the left text area and the right will auto-populate with the template. Each FQDN must be on a line of its own.</p>
        <br />
        <Button variant="info" className="navLinks" onClick={handleShow}>
          <li>Whitelist</li>
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Whitelist Config Generator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>FQDN Input</label>
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
          <Button variant="info" disabled>
            Copy to Clipboard
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="backButton">
          <Button variant="secondary" className="navLinks" disabled>
            <li>Settings</li>
          </Button>
        <Link to="/vendor/fortigate">
          <Button className="navLinks" variant="info">
            <li>Back</li>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FortigateWhitelistToolFQDN
