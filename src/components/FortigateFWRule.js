import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"

function handleCopy(textArea) {
  navigator.clipboard.writeText(textArea)
}

function FortigateFWRule() {
  /* State Controls */
  var [showModal, setShow] = useState(true)
  var handleClose = () => setShow(false)
  var handleShow = () => setShow(true)
  var handleShowSettings = () => setShow(true)

  var [state, setState] = useState({
    portCreationReq: "",
    protocolList: "undefined",
    existingPorts: "",
    addServiceGroup: "undefined",
    portsList: "",
    multiVdomQuestion: "undefined",
    fwRuleName: "",
    allowOrDeny: "",
    srcIntfName: "",
    dstIntfName: "",
    newSrcObjReq: "",
    extSrcObjList: "",
    newSrcObjList: "",
    newSrcObjGrpReq: "",
    newDstObjReq: "",
    newDestIpList: "",
    extDestIpList: "",
    newDstObjGrpReq: "",
    ruleEnabled: "",
    ruleDescription: "",
  })

  var handleChange = (e) => {
    var value = e.target.value
    setState({
      ...state,
      [e.target.name]: value,
    })
  }
  /* End State Controls */

  return (
    <div id="fortigateFWrule" className="appContainer">
      <div>
        <h1 className="appTitle">FW Rule Generator</h1> <br />
        <p className="subTitle">This tool will generate the configuration necessary for Fortigate Firewall Policy creation. This will create a policy based on the variables provided in "Settings". </p>
        <br />
        <Button variant="info" className="navLinks" onClick={handleShow}>
          <li>FW Rule Gen</li>
        </Button>
      </div>

      <Modal id="fwRuleModal" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>FW Rule Generator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <form id="fwRuleForm">
              <label>
                <span style={{textDecoration: 'underline', fontSize: '1.2em',}}>FW Policy</span> 
              </label>
              <label>
                Will this be a multi-VDOM policy?
                <select name="multiVdomQuestion" value={state.multiVdomQuestion} onChange={handleChange}>
                  <option value="undefined">-- Please Choose</option>
                  <option value="multiVdomYes">Yes</option>
                  <option value="multiVdomNo">No</option>
                </select>
              </label>

            {(state.multiVdomQuestion === 'multiVdomYes' &&
                    <>
                    <label name="vdomTotal">
                      Please advise the total number of VDOMs required for the new policy.<input name="vdomTotal" onChange={handleChange} value={state.vdomTotal} type="text" placeholder="Example: 35"></input>
                    </label>
                    <label name="vdomName">
                      VDOM Name:<input name="vdomName" type="text" placeholder="Example: Customer-VDOM-355"></input>
                    </label>
                    </> 
                  ) || (<></>)}
            {(state.multiVdomQuestion !== 'undefined' &&               
              <label name="fwRuleName">
                Firewall Policy Name:<input name="fwRuleName" type="text" value={state.fwRuleName} onChange={handleChange} placeholder="Example: Windows-Update-Service"></input>
              </label>
              ) || (<></>)}

            {( state.fwRuleName !== '' && 
              <label name="allowOrDeny">
                  Please advise if this is to allow or deny traffic.
                <select name="allowOrDeny" value={state.allowOrDeny} onChange={handleChange}>
                  <option value="undefined">-- Please Choose</option>
                  <option value="allowRule">Allow</option>
                  <option value="denyRule">Deny</option>
                </select>
              </label>
            ) || (<></>)}
            
            {(state.allowOrDeny !== '' && 
                <label name="portCreationReqL">
                Do you require a new custom service port or port group?
                <select name="portCreationReq" value={state.portCreationReq} onChange={handleChange}>
                  <option value="undefined">-- Please Choose</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            ) || (<></>)}

              
             { (state.portCreationReq === 'false' &&                   
              <label name="existingPortsL">
                Please provide the name of the service group or port name you want to use:<input name="existingPorts" type="text" placeholder="Example: WSUS-Ports" value={state.existingPorts} onChange={handleChange}></input>
              </label> )
              
              ||
            
              (state.portCreationReq === 'true' &&
                  <label name="protocolListL">
                    TCP, UDP, or Both?
                    <select name="protocolList" value={state.protocolList} onChange={handleChange}>
                      <option value="undefined">-- Please Choose</option>
                      <option value="tcpTrue">TCP</option>
                      <option value="udpTrue">UDP</option>
                      <option value="bothTrue">Both</option>
                      <option value="mixedTrue">Mixed</option>
                    </select>
                  </label> )
                || ( <></> )}

                {(state.protocolList !== 'undefined' &&                  
                <label name="addServiceGroupL">
                  Would you like these ports to be added to a Service Group or as one individual service?
                    <select name="addServiceGroup" value={state.addServiceGroup} onChange={handleChange}>
                      <option value="undefined">-- Please Choose</option>
                      <option value="srvGrpYes">Group</option>
                      <option value="srvGrpNo">Individual</option>
                    </select>
                  </label>) || (<></>)}

                {(state.addServiceGroup !== 'undefined' && 
                <label name="portsListL">
                    Comma Separated Ports, Hyphen for Range:<input name="portsList" value={state.portsList} onChange={handleChange} type="text" placeholder="Example: 1550, 1650, 1300-1301, 20">
                    </input>
                </label> ) || (<></>)}
                  
              {(state.portCreationReq !== '' && 
                  <label name="srcIntfNameL">
                    What is the Source Interface Name? (srcintf):<input value={state.srcIntfName} onChange={handleChange} name="srcIntfName" type="text" placeholder="Example: Inside_Vlan"></input>
                  </label>            
              ) || (<></>)} 
              {(state.srcIntfName !== '' && 
                  <label name="dstIntfNameL">
                    What is the Destination Interface Name? (dstintf):<input value={state.dstIntfName} onChange={handleChange} name="dstIntfName" type="text" placeholder="Example: Outside_Vlan"></input>
                  </label>            
              ) || (<></>)}            
              {(state.dstIntfName !== '' &&
                <label name="newSrcObjReqL">
                  Do you require new Source IP Objects?
                <select name="newSrcObjReq" value={state.newSrcObjReq} onChange={handleChange}>
                  <option value="undefined">-- Please Choose</option>
                  <option value="srcYes">Yes</option>
                  <option value="srcNo">No</option>
                </select>
                </label>            
              ) || (<></>)}
              {(state.newSrcObjReq === 'srcNo' && 
                <label name="extSrcObjListL">
                  Please provide the name of the existing Source IP Object(s), Object-Groups (one per line w/quotes around them).
                <textarea className="textFields" value={state.extSrcObjList} onChange={handleChange} name="extSrcObjList"></textarea>
                </label>
                            
              ) || (state.newSrcObjReq === 'srcYes' && 
                <label name="newSrcObjListL">
                  Please provide the name of the new Source IP Object(s) (one per line w/quotes around them).
                <textarea className="textFields" value={state.newSrcObjList} onChange={handleChange} name="newSrcObjList"></textarea>
              </label>
              ) }
            {(state.newSrcObjReq === 'srcYes' && state.newSrcObjList !== '' && 
            <label name="newSrcObjGrpReqL">
              Would you like to create a new object group for the Source IPs?
              <select name="newSrcObjGrpReq" value={state.newSrcObjGrpReq} onChange={handleChange}>
                <option value="undefined">-- Please Choose</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>                    
            )}
              {(state.newSrcObjReq !== '' && 
              <label name="newDstObjReqL">
                Do you require new Destination IP Objects?
                <select name="newDstObjReq" value={state.newDstObjReq} onChange={handleChange}>
                  <option value="undefined">-- Please Choose</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>            
              )}
              {(state.newDstObjReq === 'false' && 
              <label name="extDestIpListL">
                Please provide the name of the existing Destination IP Object(s), Object-Groups (one per line w/quotes around them)?
                <textarea className="textFields" value={state.extDestIpList} onChange={handleChange} name="extDestIpList"></textarea>
              </label>            
              ) || (state.newDstObjReq === 'true' && 
              <label name="newDestIpListL">
                Please provide the name of the new Destination IP Object(s)(one per line w/quotes around them)?
                <textarea className="textFields" value={state.newDestIpList} onChange={handleChange} name="newDestIpList"></textarea>
              </label>                          
              )}
              {(state.newDestIpList !== '' && 
              <label name="newDstObjGrpReqL">
                Would you like to create a new object group for the Destination IPs?
                <select name="newDstObjGrpReq" value={state.newDestObjGrpReq} onChange={handleChange}>
                  <option value="undefined">-- Please Choose</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>            
              )}
            {(state.newDestIpList !== '' || state.extDestIpList !== '' && 
              <label name="ruleEnabledL">
                Would you like the rule enabled upon entry?
                <select name="ruleEnabled" value={state.ruleEnabled} onChange={handleChange}>
                  <option value="undefined">-- Please Choose</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>          
            )}              
            {(state.ruleEnabled !== '' && 
              <label name="ruleDescriptionL">
                Please provide a description of the rule under 28 characters:<input name="ruleDescription" value={state.ruleDescription} onChange={handleChange} type="text" placeholder="Example: WSUS Inside_Vlan to Outside_Vlan"></input>
              </label>          
            )}              
            {(state.ruleDescription !== '' && 
            <button className="info" style={{ width: '50%', backgroundColor: 'orange', color: 'black',}}>Submit</button>
            )}
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={handleCopy("")}>
            Copy to Clipboard
          </Button>
        </Modal.Footer>
      </Modal>
      <div id="backButton" className="backButton">
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

export default FortigateFWRule

/* 

Features To Be Created:

1. Create "Settings"
    Create a settings button that allows the user to provide input that will reflect in the config output.

2. Create a slider to push to multiple VDOMs

3. onClick submit for final option in form











===== ORIGINAL CODE =====
            <div class="col_2">
                <h2>Firewall Rule Skeleton</h2>
                <button onclick="parseConfigFW()">Create FW Rule</button>
                <textarea id="fscRuleSkeleton"></textarea>
            </div>


        function parseConfigFW() {

            if (rulePortTCPUDP == "TCP") {
                newPort = "\nconfig firewall service custom\nedit \"" + portName + "\"\nset comment \"" + portName + "\"\nset tcp-portrange " + rulePortRange + "\nend";
            } else if (rulePortTCPUDP == "UDP") {
                newPort = "\nconfig firewall service custom\nedit \"" + portName + "\"\nset comment \"" + portName + "\"\nset udp-portrange " + rulePortRange + "\nend";
            } else if (rulePortTCPUDP == "BOTH") {
                newPort = "\nconfig firewall service custom\nedit \"" + portName + "\"\nset comment \"" + portName + "\"\nset udp-portrange " + rulePortRange + "\nset tcp-portrange " + rulePortRange + "\nend";
            } else {
                newPort = prompt("Please enter TCP or UDP in caps only");
            }
            for (a = 1; a < 37; a++) {
                fscNumLoop = a;
                var fwRule = "edit vdom-000" + (fscNumLoop < 10 ? "0" : "") + fscNumLoop + newPort + "\nconfig firewall policy\n";
                fwRule = fwRule + "edit 0\nset name \"" + ruleName + "\"\nset srcintf \"VDOM-INT" + fscNumLoop + "_01\"\nset dstintf \"A_Zone\" \"B_Zone\"\nset srcaddr \"all\"\nset dstaddr \"all-2\"\nset action accept\nset schedule \"always\"\nset service \"" + portName + "\"\nset utm-status enable\nset status enable\nset comments \"" + ruleName + "\"\nend";
                console.log("fwRule = " + fwRule);
                pushOutputFWSkeleton.push(fwRule);
            }
            document.getElementById("fscRuleSkeleton").value = pushOutputFWSkeleton.join("\nnext\n");







*/
