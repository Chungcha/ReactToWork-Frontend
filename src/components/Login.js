import React from "react"

const Login = (props) => {
    return (
        <form onSubmit={props.handleLogin}>
            <input 
                type="text" 
                name="username" 
                placeholder="username"
            />
            <input 
                type="password" 
                name="password" 
                placeholder="password"
            />
            <input type="submit"/>
        </form>
    )
}

export default Login