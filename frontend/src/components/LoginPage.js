import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { render } from 'react-dom'
import {
    Form,
    Container,
    Button,
    Alert
} from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function LoginPage(props){

    let history = useHistory()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [failure, setFailure] = useState(false)
    const [failureMessage, setFailureMessage] = useState("")
    const Login = () => {
        
        axios
        .post('http://localhost:5000/user/auth', {
                "username": username,
                "password":password
        })
        .then(function (response) {
            if(response.data["token"]){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            history.push({
                pathname: '/projects',
                
            })
            
        })
        .catch(function (error) {
            setFailure(true)
            if(error){
                setFailureMessage("Error logging in, please try again")
            }
            
        })

        
    }


    

    return(
        <div >
            <br />
            {failure && (
                    <Alert variant="danger">
                        {failureMessage}
                    </Alert>
            )}

            <p><b>Login User</b></p>
            
            <Form>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required
                        type="username" 
                        placeholder="Enter Username"
                        value={username}
                        onChange={(usernameValue) =>
                            setUserName(usernameValue.target.value)
                        }
                        
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type="password" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(passwordValue) =>
                            setPassword(passwordValue.target.value)
                        }
                    />
                </Form.Group>
                <Button variant="primary" onClick={Login}>
                    Login!
                </Button>
            </Form>
        </div>

    )
}

export default LoginPage
