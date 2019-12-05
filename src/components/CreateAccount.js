import React from "react"
import Modal from 'react-bootstrap/Modal'


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
              <div className="container">
              <div className="row">
              <div className="col d-flex justify-content-center">
                <label>Username:<br></br><input type="text" placeholder="username" name="username"/></label>
               </div> 
               <div className="col d-flex justify-content-center">
                <label>Email:<br></br><input type="email" placeholder="email" name="email"/></label>
                </div>
                <div className="col d-flex justify-content-center">
                <label>Zip Code:<br></br><input type="number" placeholder="zipCode" name="zipCode"/></label>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                
                <label>Bio:<br></br><textarea className="bio-text"  name="bio"></textarea></label>
                
              </div>
              <div className="row">
              <div className="col d-flex justify-content-center">
                <label>Password:<br></br><input type="password" placeholder="password" name="password"/></label>
                </div>
                <div className="col d-flex justify-content-center">
                <label>Confirm Password:<br></br><input type="password" placeholder="password" name="confirmPassword"/></label>
                </div>
                </div>
                <hr></hr>
                <input className="btn btn-primary sign-up-submit" type="submit"/>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );    
}

export default CreateAccount