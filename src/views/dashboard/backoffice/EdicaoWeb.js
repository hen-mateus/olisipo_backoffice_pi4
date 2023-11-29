import React, { useState, } from 'react'
// import { Link } from 'react-router-dom'
import { Accordion, Nav, Tab, Button, Form } from 'react-bootstrap'
import Card from '../../../components/Card'

const EdicaoWeb = () => {
    const [toggleState, setToggleState] = useState(true);

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
                                                        <Form.Label htmlFor="link1">Link 1:</Form.Label>
                                                        <Form.Control type="link1" id="link1" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="link2">Link 2:</Form.Label>
                                                        <Form.Control type="link2" id="link2" />
                                                    </Form.Group>
                                                    <Button type="button" variant="btn btn-primary">Upload</Button>
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Corpo</Accordion.Header>
                                            <Accordion.Body>
                                                <Form>
                                                    <div className="header-title">
                                                        <h5 className="card-title">Secção 1:</h5>
                                                    </div>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulos">Título:</Form.Label>
                                                        <Form.Control type="titulos" id="titulos1" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulo1s">Texto 1:</Form.Label>
                                                        <Form.Control type="titulo1s" id="titulo1s" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulo2s">Texto 2:</Form.Label>
                                                        <Form.Control type="titulo2s" id="titulo2s" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulo3s">Texto 3:</Form.Label>
                                                        <Form.Control type="titulo3s" id="titulo3s" />
                                                    </Form.Group>
                                                    <Button type="button" variant="btn btn-warning me-3">Criar Nova Secção</Button>
                                                    <Button type="button" variant="btn btn-primary">Upload</Button>
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>Footer</Accordion.Header>
                                            <Accordion.Body>
                                                <Form>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulof">Título:</Form.Label>
                                                        <Form.Control type="titulof" id="titulof1" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="titulot">Texto:</Form.Label>
                                                        <Form.Control type="titulot" id="titulot1" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="link1">Link 1:</Form.Label>
                                                        <Form.Control type="link1" id="link1" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="link2">Link 2:</Form.Label>
                                                        <Form.Control type="link2" id="link2" />
                                                    </Form.Group>
                                                    <Button type="button" variant="btn btn-primary">Upload</Button>
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className={toggleState === false ? 'active' : ''} id="content-accordion-code" role="tabpanel" aria-labelledby="typo-output">
                                <div className="section-block">
                                    <pre className="language-markup"><code className="language-markup">
                                        {`<div className="bd-example">
<Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
        This is the first item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
        This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
        <Accordion.Header>Accordion Item #3</Accordion.Header>
        <Accordion.Body>
        This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.
        </Accordion.Body>
    </Accordion.Item>
    </Accordion>
</div>
`}
                                    </code></pre>
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