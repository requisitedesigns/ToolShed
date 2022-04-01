import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import ClipboardCopy from './ClipboardCopy'
import { Link } from 'react-router-dom'
import GetMask from './GetMask'


function parseConfig2(array) {
    var y = array.split("\n");
    var z = [];
    var h = y.map((e) => {
      var mask2 = GetMask(e);
      var subnet = e.split("/");
      var t = "config firewall address\nedit \"" + subnet[0] + "-CustNet\"\nset subnet " + subnet[0] + " " + mask2 + "\nset comment \"" + subnet[0] + "-CustNet\"\nnext\nend\n";
      z.push(" \"" + subnet[0] + "-CustNet\"")
      return t;
    })
    return h.join("") + 'config firewall addrgrp\nedit \"CustList\"\nappend member' + z.join("") + "\nend";
    }

    
  

function FortigateIPObjects() {
    var [showModal, setShow] = useState(true)
    var handleClose = () => setShow(false)
    var handleShow = () => setShow(true)
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
    
    return (
        <div className="appContainer">
        <div>
          <h1 className="appTitle">IP Object & Group Tool</h1> <br />
          <p className="subTitle">This tool will generate the configuration input required to create new IP objects and insert them to a group. Input a list of IP's on the left text area with CIDR and the right will auto-populate with the template. Each IP must be on a line of its own.</p>
          <br />
          <Button variant="info" className="navLinks" onClick={handleShow}>
            <li>IP Obj Generator</li>
          </Button>
        </div>
  
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>IP Object Generator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6">
                <label>IP Input</label>
                <textarea className="textFields" value={fqdnList} onChange={handleChange}></textarea>
              </div>
              <div className="col-6">
                <label>Object Config</label>
                <textarea className="textFields" value={output}></textarea>
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

export default FortigateIPObjects;