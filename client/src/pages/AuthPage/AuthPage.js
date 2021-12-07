import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AuthPage = () => {
    return (
        <div>
            This is Auth Page
            <Container  fluid
                className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <Row>
                    <Col className="d-flex flex-column justify-content-center align-items-center align-items-md-start">
                        <h1>Swapee</h1>
                        <p></p>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Card style={{ width: "30rem" }} className="p-3 box-shadow">
                            <Form className="d-flex flex-column justify-content-center align-content-center text-align-center">
                                <Form.Group controlId="email">
                                    <Form.Control
                                        type="email"
                    // onChange={onChange}
                                        placeholder="Email or Phone Number"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                    // onChange={onChange}
                                    />
                                </Form.Group>
                                <Button
                                    block
                                    type="submit"
                                    variant="primary"
                //   onClick={onLogin}
                                    className="font-weight-bold"
                                >
                                    Login
                                </Button>
                                <Form.Group
                                    className="mx-auto mt-3"
                                    controlId="formBasicPassword"
                                >
                                    <Link className="" to="#">
                                        Forgot Password?
                                    </Link>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="success" 
                //   onClick={onToggleModal}
                                    className="mx-auto w-50 font-weight-bold" 
                                >  
                                    Create an account
                                </Button>
                                <hr className="hr" />
                {/* <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}                
                  buttonText="Login With Google"             
                  onSuccess={responseGoogle}              
                  onFailure={responseGoogle}                
                  cookiePolicy={'single_host_origin'}               
                />        
                <FacebookLogin               
                  appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}               
                  autoLoad={true}                
                  fields="name,email,picture"                
                  callback={responseFacebook} /> */}
              </Form>
            </Card>
          </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default AuthPage
