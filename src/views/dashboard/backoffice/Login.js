import React, { useEffect, useState } from "react";
import { Row, Col, Image, Form, Button, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from './axiosConfig';
import { baseUrl } from './baseURL';
import Card from '../../../components/Card'
import Cookies from 'js-cookie';
import OlisipoLogo from '../../../assets/images/olisipo/Olisipo_LogoBlack.png';
import LoginFundo from '../../../assets/images/olisipo/login_fundo.png';

const Login = () => {
   let history = useNavigate()
   const [campEmail, setcampEmail] = useState([]);
   const [campPass, setcampPass] = useState([]);

   function handleLogin() {
      if (campEmail === "") {
         alert("Insira um e-mail!")
      }
      else if (campPass === "") {
         alert("Insira uma password!")
      }
      else {
         const url = baseUrl + "/pessoas/login/";
         const datapost = {
            email_param: campEmail,
            pass_param: campPass,
         }
         axios.post(url, datapost)
            .then(response => {
               if (response.data.success === true) {
                  const token = response.data.token;
                  Cookies.set('token', token, { expires: 7 });
                  history('/dashboard');
               } else {
                  alert("Erro Login")
               }
            })
            .catch(error => {
               alert("Error 34 " + error)
            });
      }
   }

   return (
      <>
         <section className="login-content">
         <div style={{ backgroundImage: `url(${LoginFundo})`, backgroundSize: 'cover', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Row className="mx-0 align-items-center vh-100 justify-content-center">
               <Col md="6">
                  <Card className="card-transparent bg-transparent shadow-none d-flex justify-content-center mb-0">
                     <Card.Body>
                     <Link to="/dashboard" className="navbar-brand d-flex align-items-center mb-4">
                           <Image src={OlisipoLogo} alt="Olisipo Logo" className="logo-image mx-auto mt-auto" height={100}/>
                        </Link>
                        <p className="mb-4 text-center text-dark">Entra para te manteres conectado</p>
                        <Form>
                           <Row>
                              <Col lg="12">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFor="email" className="text-dark">Email</Form.Label>
                                    <Form.Control type="email" className="" id="email" aria-describedby="email" placeholder=" " value={campEmail} onChange={(e) => setcampEmail(e.target.value)} />
                                 </Form.Group >
                              </Col>
                              <Col lg="12" className="">
                                 <Form.Group className="form-group">
                                    <Form.Label htmlFo r="password" className="text-dark">Palavra-Passe</Form.Label>
                                    <Form.Control type="password" className="" id="password" aria-describedby="password" placeholder=" " value={campPass} onChange={(e) => setcampPass(e.target.value)} />
                                 </Form.Group>
                              </Col>
                              <Col lg="12" className="d-flex justify-content-end mb-3 ">
                                 <Link to="/auth/recoverpw" className="text-dark">Esqueceu a sua palavra-passe?</Link>
                              </Col>
                           </Row>
                           <div className="d-flex justify-content-center">
                              <Button onClick={() => handleLogin()} type="button" variant="btn btn-primary">Entrar</Button>
                           </div>
                        </Form>
                     </Card.Body>
                  </Card>
                  <div><h3>Email: rui@email.com</h3><h3>Pass: rui</h3></div>
               </Col>
            </Row>
            </div>
         </section>
      </>
   )
}

export default Login
