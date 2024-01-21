import React, { useEffect, useState } from "react";
import { Row, Col, Image, Form, Button, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import axios from './axiosConfig';
import { baseUrl } from './baseURL';
import Card from '../../../components/Card'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import OlisipoLogo from '../../../assets/images/olisipo/Olisipo_LogoBlack_pequeno-01.png';
import LoginFundo from '../../../assets/images/olisipo/login_fundo.png';

const Login = () => {
   let history = useNavigate()
   const [campEmail, setcampEmail] = useState([]);
   const [campPass, setcampPass] = useState([]);

   function handleLogin() {
      if (campEmail === "") {
         alert("Insira um e-mail!");
      } else if (campPass === "") {
         alert("Insira uma password!");
      } else {
         const url = baseUrl + "/pessoas/login/";
         const datapost = {
            email_param: campEmail,
            pass_param: campPass,
         };

         axios.post(url, datapost)
            .then(response => {
               if (response.data.success === true) {
                  const token = response.data.token;
                  const decodedToken = jwtDecode(token);
                  console.log(decodedToken);

                  if (decodedToken.id_tipo == 2 || decodedToken.id_tipo == 3) {
                     Cookies.set('token', token, { expires: 7 });
                     history('/dashboard');
                  } else {
                     Swal.fire({
                        text: "Apenas administradores e managers são permitidos a entrar no backoffice.",
                        icon: "question",
                        width: '680px'
                     });
                  }
               } else {
                  alert("Erro Login");
               }
            })
            .catch(error => {
               Swal.fire({
                  text: "Verifique se todos os campos foram preenchidos corretamente.",
                  icon: "error",
                  width: '650px'
               });
            });
      }
   }

   return (
      <>
         <section className="login-content">
            <div style={{ backgroundImage: `url(${LoginFundo})`, backgroundSize: 'cover', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Row className="mx-0 align-items-center vh-100 justify-content-center">
                  <Col md="9">
                     <Card className="card-transparent bg-transparent shadow-none d-flex justify-content-center mb-0">
                        <Card.Body>
                           <Link to="/webpage" className="navbar-brand d-flex align-items-center mb-4">
                              <Image src={OlisipoLogo} alt="Olisipo Logo" className="logo-image mx-auto mt-auto" height={100} />
                           </Link>
                           <h5 className="mb-4 text-center text-dark">Entra para te manteres conectado</h5>
                           <Form>
                              <Row>
                                 <Col lg="12">
                                    <Form.Group className="form-group">
                                       <Form.Label htmlFor="email" className="text-dark">E-mail</Form.Label>
                                       <Form.Control type="email" className="" id="email" aria-describedby="email" placeholder=" " value={campEmail} onChange={(e) => setcampEmail(e.target.value)} />
                                    </Form.Group >
                                 </Col>
                                 <Col lg="12" className="">
                                    <Form.Group className="form-group">
                                       <Form.Label htmlFo r="password" className="text-dark">Palavra-Passe</Form.Label>
                                       <Form.Control type="password" className="" id="password" aria-describedby="password" placeholder=" " value={campPass} onChange={(e) => setcampPass(e.target.value)} />
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <div className="d-flex justify-content-center">
                                 <Button onClick={() => handleLogin()} type="button" variant="btn btn-primary">Entrar</Button>
                              </div>
                           </Form>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </div>
         </section>
      </>
   )
}

export default Login