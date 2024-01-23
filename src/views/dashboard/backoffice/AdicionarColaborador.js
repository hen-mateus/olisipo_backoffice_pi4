import axios from './axiosConfig';
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Image } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'
import { baseUrl } from './baseURL';

// img
import imgsuccess from '../../../assets/images/pages/img-success.png'
const AdicionarColaborador = () => {
    const [show, AccountShow] = useState('A');
    const [campManager, setcampManager] = useState("");
    const [campIdTipo, setcampIdTipo] = useState("");
    const [campNome, setcampNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campPassword, setcampPassword] = useState("");
    const [campCliente, setcampCliente] = useState("");
    const [campAtiva, setcampAtiva] = useState("");
    const [campDeleted, setcampDeleted] = useState("");
    const [campCurriculo, setcampCurriculo] = useState("");
    const [campNumColaborador, setcampNumColaborador] = useState("");
    const [campContribuinte, setcampContribuinte] = useState("");

    const [managers, setManagers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [ultimoNumColaborador, setUltimoNumColaborador] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(baseUrl + "/roles");
                setRoles(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar os roles:", error);
            }
        };
        const fetchManagers = async () => {
            try {
                const response = await axios.get(baseUrl + "/pessoas/managers");
                setManagers(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar os managers:", error);
            }
        };
        const fetchUltimoNumColaborador = async () => {
            try {
                const response = await axios.get(baseUrl + "/pessoas");
                const pessoas = response.data.data;

                if (pessoas.length > 0) {
                    const ultimoNumero = pessoas.reduce((max, pessoa) => {
                        return pessoa.numero_colaborador > max ? pessoa.numero_colaborador : max;
                    }, 0);
                    setUltimoNumColaborador(ultimoNumero);
                }
            } catch (error) {
                console.error("Erro ao buscar o último número de colaborador:", error);
            }
        };

        fetchUltimoNumColaborador();
        fetchRoles();
        fetchManagers();
    }, []);

    function countNumColaborador() {
        if (ultimoNumColaborador !== null) {
            return ultimoNumColaborador + 1;
        } else {
            return null;
        }
    }

    function SendSave() {
        if (campManager === "") {
            alert("Atribua um manager!")
        }
        else if (campIdTipo === "") {
            alert("Atribua um role!")
        }
        else if (campNome === "") {
            alert("Insira um nome!")
        }
        else if (campEmail === "") {
            alert("Insira um email!")
        }
        else if (campPassword === "") {
            alert("Insira uma password!")
        }
        else if (campCliente === "") {
            alert("Insira um cliente!")
        } else if (campContribuinte === "") {
            alert("Insira o numero de contribuinte!")
        }
        else {
            const url = baseUrl + "/pessoas/register"
            const datapost = {
                id_tipo_param: campIdTipo,
                nome_pessoa_param: campNome,
                email_param: campEmail,
                password_param: campPassword,
                cliente_param: campCliente,
                ativa_param: true,
                deleted_param: false,
                curriculo_param: campCurriculo,
                numero_colaborador_param: ultimoNumColaborador + 1,
                contribuinte_param: campContribuinte,
                pes_id_param: campManager
            }

            axios.post(url, datapost)
                .then(response => {

                    if (response.data.success === true) {
                        alert(response.data.message)
                        AccountShow('Image');
                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }

    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Adicionar Novo Colaborador</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form id="form-wizard1" className="text-center mt-3">
                                    <ul id="top-tab-list" className="p-0 row list-inline">
                                        <li className={` ${show === 'Image ' ? ' active  ' : ''} ${show === 'Personal' ? ' active  ' : ''} ${show === 'Account' ? ' active  ' : ''} ${show === 'A' ? 'active ' : ''} col-lg-3 col-md-6 text-start mb-2 active `} id="account">
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <span>Dados Pessoais</span>
                                            </Link>
                                        </li>
                                        <li id="personal" className={`${show === 'Personal' ? ' active' : ''} ${show === 'Image' ? ' active ' : ''} ${show === 'Account' ? 'active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <span>Empresa</span>
                                            </Link>
                                        </li>
                                        <li id="payment" className={`${show === 'Image' ? ' active ' : ''} ${show === 'Personal' ? 'active' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <span>Curriculo</span>
                                            </Link>
                                        </li>
                                        <li id="confirm" className={`${show === 'Image' ? ' active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span>Finalizado</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Informação da Conta: </h3>
                                                </div>
                                                <div className="col-5">
                                                    <h2 className="steps">Passo 1 - 4</h2>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" className="form-control" name="email" placeholder="Email" value={campEmail} onChange={value =>
                                                            setcampEmail(value.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Nome</label>
                                                        <input type="text" className="form-control" name="uname" placeholder="Nome completo" value={campNome} onChange={value =>
                                                            setcampNome(value.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Password</label>
                                                        <input type="password" className="form-control" name="pwd" placeholder="Password" value={campPassword} onChange={value =>
                                                            setcampPassword(value.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Cargo</label>
                                                        <select id="inputState" className="form-control" value={campIdTipo} onChange={value => setcampIdTipo(value.target.value)}>
                                                            <option value="" disabled>Escolha o cargo</option>
                                                            {roles.map(role => (
                                                                <option key={role.id_tipo} value={role.id_tipo}>{role.tipo}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Next" onClick={() => AccountShow('Account')} >Next</button>
                                    </fieldset>
                                    <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Dados Empresariais:</h3>
                                                </div>
                                                <div className="col-5">
                                                    <h2 className="steps">Passo 2 - 4</h2>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Contribuinte</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="fname"
                                                            placeholder="Contribuinte"
                                                            value={campContribuinte}
                                                            onChange={(event) => {
                                                                const numericValue = event.target.value.replace(/\D/g, '');
                                                                const truncatedValue = numericValue.slice(0, 9);
                                                                setcampContribuinte(truncatedValue);
                                                            }}
                                                            maxLength={9}
                                                            pattern="\d*"
                                                            title="Please enter only numbers"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Número de Colaborador</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="lname"
                                                            placeholder="Número de Colaborador"
                                                            value={countNumColaborador() || ""}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Manager</label>

                                                        <select id="inputState" className="form-control" value={campManager} onChange={value => setcampManager(value.target.value)}>
                                                            <option value="" disabled>Escolha o manager do colaborador</option>
                                                            {managers.map(manager => (
                                                                <option key={manager.id_pessoa} value={manager.id_pessoa}>{manager.nome_pessoa} - {manager.numero_colaborador}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Cliente</label>
                                                        <input type="text" className="form-control" name="lname" placeholder="Cliente" value={campCliente} onChange={value => setcampCliente(value.target.value)} />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Next" onClick={() => AccountShow('Personal')} >Next</button>
                                        <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('A')} >Previous</button>
                                    </fieldset>
                                    <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Upload Currículo</h3>
                                                </div>
                                                <div className="col-5">
                                                    <h2 className="steps">Passo 3 - 4</h2>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="file" className="form-control" name="pic" accept="image/*" value={campCurriculo} onChange={value => setcampCurriculo(value.target.value)} />
                                            </div>

                                        </div>
                                        <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Submit" onClick={() => {
                                            SendSave();
                                            ;
                                        }}>Criar Colaborador</button>
                                        <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('Account')} >Previous</button>
                                    </fieldset>
                                    <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4 text-left"></h3>
                                                </div>
                                                <div className="col-5">
                                                    <h2 className="steps">Passo 4 - 4</h2>
                                                </div>
                                            </div>
                                            <br /><br />
                                            <h2 className="text-success text-center"><strong>SUCCESSO!</strong></h2>
                                            <br />
                                            <br />
                                            <div className="row justify-content-center">
                                                <div className="col-7 text-center">
                                                    <h5 className="purple-text text-center">O colaborador foi adicionado com sucesso!</h5>
                                                    <br />
                                                    <h5 className="purple-text text-center">Foi enviado um e-mail com os dados para iniciar a sessão.</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AdicionarColaborador
