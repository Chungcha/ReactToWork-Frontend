import React from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const CreateAccount = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create an Account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e)=>{props.handleSubmit(e)}}>
                <label>Username:<input type="text" placeholder="username" name="username"/></label>
                <label>Email:<input type="email" placeholder="email" name="email"/></label>
                <label>Zip Code:<input type="number" placeholder="zipCode" name="zipCode"/></label>
                <label>Bio:<textarea style={{rows:"4", cols:"50"}} name="bio"></textarea></label>
                <label>Password:<input type="password" placeholder="password" name="password"/></label>
                <label>Confirm Password:<input type="password" placeholder="password" name="confirmPassword"/></label>
                <input type="submit"/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );    
}

export default CreateAccount