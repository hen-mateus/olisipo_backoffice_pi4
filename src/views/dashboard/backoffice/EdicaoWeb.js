import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom'
import axios from 'axios';
import { Accordion, Nav, Tab, Button, Form } from 'react-bootstrap'
import Card from '../../../components/Card'
import { baseUrl } from './baseURL';
import { useParams } from "react-router-dom";
import Index from "..";

const EdicaoWeb = () => {
    const [toggleState, setToggleState] = useState(true);
    const [dataWebHeader, setdataWebHeader] = useState("");
    const [dataWebSeccao, setdataWebSeccao] = useState([]);
    const [campTituloHeader, setcampTituloHeader] = useState("");
    const [campLink1, setcampLink1] = useState("");
    const [campLink2, setcampLink2] = useState("");
    const [campImagemHeader, setcampImagemHeader] = useState("");
    const [campTituloFooter, setcampTituloFooter] = useState("");
    const [campTextoFooter, setcampTextoFooter] = useState("");
    const [campTituloSeccao, setcampTituloSeccao] = useState("");
    const [campTexto1, setcampTexto1] = useState("");
    const [campTexto2, setcampTexto2] = useState("");
    const [campTexto3, setcampTexto3] = useState("");
    const [campImagemSeccao, setcampImagemSeccao] = useState("");
    const [campIDsecção, setcampIDsecção] = useState("");


    useEffect(() => {
        LoadWebHeader();
        LoadWebFooter();
        LoadWebSeccao();
    }, []);

    function LoadWebHeader() {
        const url = baseUrl + "/conteudowebsite/" + 1;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataWebHeader(data);
                    setcampTituloHeader(data.titulo_header);
                    setcampLink1(data.link1);
                    setcampLink2(data.link2);
                    setcampImagemHeader(data.imagem_header);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }

    function LoadWebFooter() {
        const url = baseUrl + "/conteudowebsite/" + 2;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataWebHeader(data);
                    setcampTituloFooter(data.titulo_footer);
                    setcampTextoFooter(data.texto_footer);
                    setcampLink1(data.link1);
                    setcampLink2(data.link2);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }

    function LoadWebSeccao() {
        const url = baseUrl + "/conteudowebsite/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataWebSeccao(data);

                    setcampTituloSeccao(data.titulo_seccao);
                    setcampTexto1(data.texto1);
                    setcampTexto2(data.texto2);
                    setcampTexto3(data.texto3);
                    setcampImagemSeccao(data.imagem_seccao);
                    setcampIDsecção(data.id_conteudo);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }

    function updateHeader() {
        const url = baseUrl + "/conteudowebsite/updateheader/" + 1
        const dataput = {
            novo_titulo_header_param: campTituloHeader,
            nova_imagem_header_param: campImagemHeader,
            novo_link1_param: campLink1,
            novo_link2_param: campLink2
        }
        axios.put(url, dataput)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

    function updateFooter() {
        const url = baseUrl + "/conteudowebsite/updatefooter/" + 2
        const dataput = {
            novo_titulo_footer_param: campTituloFooter,
            novo_texto_footer_param: campTextoFooter,
            novo_link1_param: campLink1,
            novo_link2_param: campLink2
        }
        axios.put(url, dataput)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

    function updateSeccao(seccaoID) {

        console.log('seccaoID:', seccaoID);
        const url = baseUrl + `/conteudowebsite/updateseccao/${seccaoID}`;
        const dataput = {
            novo_tituloseccao_param: campTituloSeccao,
            novo_texto1_param: campTexto1,
            novo_texto2_param: campTexto2,
            novo_texto3_param: campTexto3,
            novo_imagemseccao_param: campImagemSeccao
        }
        axios.put(url, dataput)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }


    function conteudowebSeccao() {
        return dataWebSeccao.map((data, index) => {
            return (
                <Accordion.Body>
                    <Form name={`Form-${index}`} >
                        <div className="header-title">
                            <h5 className="card-title">Secção {index + 1}:</h5>
                        </div>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="titulos">Título:</Form.Label>
                            <Form.Control type="titulos" name={`titulos-${index}`} id={`titulos-${index}`} value={data.titulo_seccao}
                                onChange={(e) => setcampTituloSeccao(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="titulo1s">Texto 1:</Form.Label>
                            <Form.Control type="titulo1s"name={`texto1-${index}`} id={`titulo1s-${index}`} value={campTexto1}
                                onChange={(e) => setcampTexto1(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="titulo2s">Texto 2:</Form.Label>
                            <Form.Control type="titulo2s" id={`titulo2s-${index}`} value={data.texto2}
                                onChange={(e) => setcampTexto2(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="titulo3s">Texto 3:</Form.Label>
                            <Form.Control type="titulo3s" id={`titulo3s-${index}`} value={data.texto3}
                                onChange={(e) => setcampTexto3(e.target.value)} />
                        </Form.Group>
                        <Button type="button" id={`btn1-${index}`} variant="warning me-3">Criar Nova Secção</Button>
                        <Button type="button" id={`btn2-${index}`} variant="primary" onClick={() => updateSeccao(data.id_conteudo)}>Atualizar</Button>

                    </Form>
                </Accordion.Body>
            );
        });
    }

    return (
        <>
            <article id="accordion">
                <div className="bd-heading sticky-xl-top align-self-start">
                    <Card>
                        <Card.Body>
                            <h5>Edição da Página Web</h5>
                        </Card.Body>
                    </Card>
                </div>
                <Card className="iq-document-card iq-doc-head">
                    <Tab.Container defaultActiveKey="first">
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className={toggleState === true ? 'active' : ''} id="content-accordion-prv" role="tabpanel" aria-labelledby="typo-output">
                                <div className="bd-example">
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Header</Accordion.Header>
                                            <Accordion.Body>
                                                <Form>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="tituloh">Título:</Form.Label>
                                                        <Form.Control type="tituloh" id="tituloh" value={campTituloHeader}
                                                            onChange={(e) => setcampTituloHeader(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="link1">Link 1:</Form.Label>
                                                        <Form.Control type="link1" id="link1" value={campLink1}
                                                            onChange={(e) => setcampLink1(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="link2">Link 2:</Form.Label>
                                                        <Form.Control type="link2" id="link2" value={campLink2}
                                                            onChange={(e) => setcampLink2(e.target.value)} />
                                                    </Form.Group>
                                                    <Button type="button" variant="btn btn-primary" onClick={() => updateHeader()}>Atualizar</Button>
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Corpo</Accordion.Header>
                                            {conteudowebSeccao()}
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>Footer</Accordion.Header>
                                            <Accordion.Body>
                                                <Form>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulof">Título:</Form.Label>
                                                        <Form.Control type="titulof" id="titulof1" value={campTituloFooter}
                                                            onChange={(e) => setcampTituloFooter(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulot">Texto:</Form.Label>
                                                        <Form.Control type="titulot" id="titulot1" value={campTextoFooter}
                                                            onChange={(e) => setcampTextoFooter(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="link1">Link 1:</Form.Label>
                                                        <Form.Control type="link1" id="link1" value={campLink1}
                                                            onChange={(e) => setcampLink1(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="link2">Link 2:</Form.Label>
                                                        <Form.Control type="link2" id="link2" value={campLink2}
                                                            onChange={(e) => setcampLink2(e.target.value)} />
                                                    </Form.Group>
                                                    <Button type="button" variant="btn btn-primary" onClick={() => updateFooter()}>Atualizar</Button>
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Card>
            </article>
        </>
    )
}
export default EdicaoWeb;