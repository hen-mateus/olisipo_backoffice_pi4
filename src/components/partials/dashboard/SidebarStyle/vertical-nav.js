import React, { useState, useContext, memo, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faGlobe, faUser, faUmbrella, faChartBar, faClock, faNewspaper, faHandshake, faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const managerNavigation = (location) => (
    <>
    <li className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-item `}>
            <Link className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboard" onClick={() => { }}>
                <i className="icon">
                    <FontAwesomeIcon icon={faHome} />
                </i>
                <span className="item-name">Dashboard</span>
            </Link>
        </li>
        <li><hr className="hr-horizontal" /></li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/reunioes' ? 'active' : ''} nav-link`} to="/reunioes">
                <i className="icon">
                    <FontAwesomeIcon icon={faUsers} />
                </i>
                <span className="item-name">Reuniões</span>
            </Link>
        </li>
    </>
);

const adminNavigation = (location) => (
    <>
        <li className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-item `}>
            <Link className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboard" onClick={() => { }}>
                <i className="icon">
                    <FontAwesomeIcon icon={faHome} />
                </i>
                <span className="item-name">Dashboard</span>
            </Link>
        </li>
        <li><hr className="hr-horizontal" /></li>
        <li className="nav-item static-item">
            <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                <span className="default-icon">Páginas</span>
                <span className="mini-icon">-</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/adicionarcolaborador' ? 'active' : ''} nav-link`} to="/adicionarcolaborador">
                <i className="icon">
                    <FontAwesomeIcon icon={faUserPlus} />
                </i>
                <span className="item-name">Adicionar Colaborador</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/edicaoweb' ? 'active' : ''} nav-link`} to="/edicaoweb">
                <i className="icon">
                    <FontAwesomeIcon icon={faGlobe} />
                </i>
                <span className="item-name">Edição Web</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/dadospessoais' ? 'active' : ''} nav-link`} to="/dadospessoais">
                <i className="icon">
                    <FontAwesomeIcon icon={faUser} />
                </i>
                <span className="item-name">Dados Pessoais</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/ferias' ? 'active' : ''} nav-link`} to="/ferias">
                <i className="icon">
                    <FontAwesomeIcon icon={faUmbrella} />
                </i>
                <span className="item-name">Férias</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/gestaodecustos' ? 'active' : ''} nav-link`} to="/gestaodecustos">
                <i className="icon">
                    <FontAwesomeIcon icon={faChartBar} />
                </i>
                <span className="item-name">Gestão de Custos</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/horas' ? 'active' : ''} nav-link`} to="/horas">
                <i className="icon">
                    <FontAwesomeIcon icon={faClock} />
                </i>
                <span className="item-name">Horas</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/noticias' ? 'active' : ''} nav-link`} to="/noticias">
                <i className="icon">
                    <FontAwesomeIcon icon={faNewspaper} />
                </i>
                <span className="item-name">Notícias</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/parcerias' ? 'active' : ''} nav-link`} to="/parcerias">
                <i className="icon">
                    <FontAwesomeIcon icon={faHandshake} />
                </i>
                <span className="item-name">Parcerias</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/recibos' ? 'active' : ''} nav-link`} to="/recibos">
                <i className="icon">
                    <FontAwesomeIcon icon={faFileAlt} />
                </i>
                <span className="item-name">Recibos</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`${location.pathname === '/reunioes' ? 'active' : ''} nav-link`} to="/reunioes">
                <i className="icon">
                    <FontAwesomeIcon icon={faUsers} />
                </i>
                <span className="item-name">Reuniões</span>
            </Link>
        </li>
        <li><hr className="hr-horizontal" /></li>
    </>
);

const VerticalNav = memo((props) => {
    let location = useLocation();
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const idTipo = decodedToken.id_tipo;
    return (
        <Fragment>
            <Accordion as="ul" className="navbar-nav iq-main-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Página Inicial</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>
                {idTipo === 2 && managerNavigation(location)}
                {idTipo === 3 && adminNavigation(location)}
            </Accordion>
        </Fragment>
    )
})

export default VerticalNav
