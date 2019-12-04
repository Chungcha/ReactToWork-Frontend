import React from "react"

const Login = (props) => {
    return (
        <div className="login-form d-inline"><form onSubmit={props.handleLogin}>
            <input className="login-input"
                type="text" 
                name="username" 
                placeholder="username"
            />
            <input className="login-input"
                type="password" 
                name="password" 
                placeholder="password"
            />
            <input className="submit-form" type="submit"/>
        </form>
    </div>
    )
}

export default Login