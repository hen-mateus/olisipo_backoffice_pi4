import React, { useEffect, useState, Fragment, memo } from 'react'
import axios from '../../../../views/dashboard/backoffice/axiosConfig';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CustomToggle from '../../../dropdowns'
import Cookies from 'js-cookie';
import { baseUrl } from '../../../../views/dashboard/backoffice/baseURL';

//img
import flag1 from '../../../../assets/images/Flag/flag001.png'
import flag2 from '../../../../assets/images/Flag/flag-02.png'
import flag3 from '../../../../assets/images/Flag/flag-03.png'
import flag4 from '../../../../assets/images/Flag/flag-04.png'
import flag5 from '../../../../assets/images/Flag/flag-05.png'
import flag6 from '../../../../assets/images/Flag/flag-06.png'
import shapes1 from '../../../../assets/images/shapes/01.png'
import shapes2 from '../../../../assets/images/shapes/02.png'
import shapes3 from '../../../../assets/images/shapes/03.png'
import shapes4 from '../../../../assets/images/shapes/04.png'
import shapes5 from '../../../../assets/images/shapes/05.png'
import avatars1 from '../../../../assets/images/avatars/01.png'
import avatars2 from '../../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../../assets/images/avatars/avtar_5.png'
// logo
import Logo from '../../components/logo'

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../../../store/setting/selectors'

const Header = memo((props) => {
    let history = useNavigate()

    const navbarHide = useSelector(SettingSelector.navbar_show); // array
    const headerNavbar = useSelector(SettingSelector.header_navbar)
    useEffect(() => {
        // navbarstylemode
        if (headerNavbar === 'navs-sticky' || headerNavbar === 'nav-glass') {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 50) {
                    document.getElementsByTagName('nav')[0].classList.add('menu-sticky')
                } else {
                    document.getElementsByTagName('nav')[0].classList.remove('menu-sticky')
                }
            }
        }

    })

    const [dataNotificacoes, setdataNotificacoes] = useState([]);

    const [campNomeUtilizador, setcampNomeUtilizador] = useState([]);
    const [campRoleUtilizador, setcampRoleUtilizador] = useState([]);

    useEffect(() => {
        LoadNotificacoes();
        LoadUtilizador()
    }, []);

    function LoadNotificacoes() {
        const url = baseUrl + "/notificacoes/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataNotificacoes(data);


                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });

    }


    function marcarNotificacoesComoLidas() {
        const url = baseUrl + "/notificacoes/marcarTodasComoLidas";

        axios.put(url)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message);
                    // Coloque aqui qualquer outra lógica que você queira executar após a atualização bem-sucedida
                } else {
                    alert("Erro ao marcar notificações como lidas");
                }
            })
            .catch(error => {
                alert("Erro: " + error);
            });
    }


    function Notificacoes() {
        return dataNotificacoes.map((data, index) => {
            let linkDestino;

            // Defina o destino do link com base no conteúdo de data.tipo_notificacao
            switch (data.tipo_notificacao) {
                case "Ajudas de Custo":
                    linkDestino = "/gestaodecustos";
                    break;
                case "Pedidos de Férias":
                    linkDestino = "/ferias";
                    break;
                case "Relatórios de Horas":
                    linkDestino = "/horas";
                    break;
                case "Alteração de Dados":
                    linkDestino = "/dadospessoais";
                    break;
                case "Reuniões":
                    linkDestino = "/reunioes";
                    break;
                case "Gastos em Viatura Própria":
                    linkDestino = "/gestaodecustos";
                    break;
                case "Recibos por submeter":
                    linkDestino = "/recibos";
                    break;
                default:
                    linkDestino = "#"; // Destino padrão se não houver correspondência
            }

            return (
                <Link to={linkDestino} className="iq-sub-card">
                    <div className="d-flex align-items-center">
                        <div className="ms-3 w-100">
                            <h6 className="mb-0 ">{data.tipo_notificacao}</h6>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0">{data.quantidade_nao_lida}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        });

    }

    function LoadUtilizador() {
        const url = baseUrl + "/pessoas/getId";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setcampNomeUtilizador(data.nome_pessoa);
                    setcampRoleUtilizador(data.tipo);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }

    function handleLogout() {
        const url = baseUrl + "/pessoas/logout/";
        axios.post(url)
            .then(response => {
                if (response.data.success === true) {
                    Cookies.remove('token');
                    history('/');
                } else {
                    alert("Erro Logout")
                }
            })
            .catch(error => {
                alert("Error 34 " + error)
            });
    }

    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }
    return (
        <Fragment>
            <Navbar expand="lg" variant="light" className={`nav iq-navbar ${headerNavbar} ${navbarHide.join(" ")}`}>
                <Container fluid className="navbar-inner">
                    <Link to="/dashboard" className="navbar-brand">
                        <Logo color={true} />
                        <h4 className="logo-title">Olisipon</h4>
                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                        <i className="icon">
                            <svg width="20px" height="20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </i>
                    </div>
                    <Navbar.Toggle aria-controls="navbarSupportedContent">
                        <span className="navbar-toggler-icon">
                            <span className="mt-2 navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center">
                            <Dropdown as="li" className="nav-item" >
                                <Dropdown.Toggle as={CustomToggle} href="#" variant="nav-link" id="notification-drop" data-bs-toggle="dropdown">
                                    {dataNotificacoes.reduce((total, data) => total + data.quantidade_nao_lida, 0) > 0 ? (
                                        <i className="fas fa-bell"></i>
                                    ) : (
                                        <i className="far fa-bell"></i>
                                    )}
                                    <span className="bg-danger dots"></span>
                                </Dropdown.Toggle>



                                <Dropdown.Menu className="p-0 sub-drop dropdown-menu-end" aria-labelledby="notification-drop">
                                    <div className="m-0 shadow-none card">
                                        <div className="py-3 card-header d-flex justify-content-between bg-primary">
                                            <div className="header-title">
                                                <h5 className="mb-0 text-white">Notificações</h5>
                                            </div>
                                        </div>
                                        <div className="p-0 card-body">
                                            {Notificacoes()}

                                        </div>
                                        <div className="card-footer  py-3">
                                            <button className="btn btn-light p-1" onClick={marcarNotificacoesComoLidas}>Marcar como lida</button>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={avatars1} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <div className="caption ms-3 d-none d-md-block ">
                                        <h6 className="mb-0 caption-title">{campNomeUtilizador}</h6>
                                        <p className="mb-0 caption-sub-title">{campRoleUtilizador}</p>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-profile">Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
})

export default Header
