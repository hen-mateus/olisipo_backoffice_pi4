import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { baseUrl } from './baseURL';
import axios from './axiosConfig';
import '../../../assets/images/olisipo/micro_site_images/estilos.css';
import PlayStore from '../../../assets/images/olisipo/micro_site_images/playstore.png';
import AppStore from '../../../assets/images/olisipo/micro_site_images/appstore.png';
import Num1 from '../../../assets/images/olisipo/micro_site_images/1-01.png';
import Num2 from '../../../assets/images/olisipo/micro_site_images/2-02.png';
import Num3 from '../../../assets/images/olisipo/micro_site_images/3-03.png';

const MicroSite = () => {
    const [dataConteudoWeb, setdataConteudoWeb] = useState([]);
    const [dataHeaderWeb, setdataHeaderWeb] = useState([]);
    const [dataFooterWeb, setdataFooterWeb] = useState([]);


    useEffect(() => {
        LoadConteudoWeb();
        LoadHeaderWeb();
        LoadFooterWeb();
    }, []);

    function LoadConteudoWeb() {
        const url = baseUrl + "/conteudowebsite/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataConteudoWeb(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function LoadHeaderWeb() {
        const url = baseUrl + "/conteudowebsite/header/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataHeaderWeb(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function LoadFooterWeb() {
        const url = baseUrl + "/conteudowebsite/footer/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataFooterWeb(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    function SecçõesConteudoWebsite() {
        return dataConteudoWeb.map((data, index) => {
            const isEven = index % 2 === 0;

            const sectionClassName = isEven ? 'seccao1' : 'seccao2';
            const titleClassName = isEven ? 'titulos' : 'titulosV';
            const divClassName = isEven ? 'seccao1-div' : 'seccao2-div';
            const stakeholdersIconClassName = isEven ? 'stakeholders-icon' : 'stakeholders-icon2';
            const stakeholdersImageClassName = isEven ? 'stakeholders-image' : 'stakeholders-image2';

            return (
                <section className={sectionClassName} key={index}>
                    <h2 className={titleClassName}>{data.titulo_seccao}</h2>
                    <div className={divClassName}>
                        <figure className={stakeholdersIconClassName}>
                            <Image src={Num1} className={stakeholdersImageClassName} alt={`Step ${index + 1}`} />
                        </figure>
                        <p>{data.texto1}</p>
                    </div>
                    <div className={divClassName}>
                        <figure className={stakeholdersIconClassName}>
                            <Image src={Num2} className={stakeholdersImageClassName} alt={`Step ${index + 2}`} />
                        </figure>
                        <p>{data.texto2}</p>
                    </div>
                    <div className={divClassName}>
                        <figure className={stakeholdersIconClassName}>
                            <Image src={Num3} className={stakeholdersImageClassName} alt={`Step ${index + 3}`} />
                        </figure>
                        <p>{data.texto3}</p>
                    </div>
                </section>
            );
        });
    }

    function SecçãoHeaderWebsite() {
        return dataHeaderWeb.map((data, index) => {
            return (
                <header className="header-background" key={index}>
                    <div className="header-content">
                        <div className="slogan">
                            <p>{data.titulo_header}</p>
                        </div>
                        <div className="texto">
                            <p>Faça já o download e comece a usufruir!</p>
                        </div>
                        <div className="div_button">
                            <a href={data.link1} target="_blank" rel="noopener noreferrer">
                                <button>
                                    <Image src={PlayStore} alt="Google Play Store" />
                                    GOOGLE PLAY
                                </button>
                            </a>
                            <a href={data.link2} target="_blank" rel="noopener noreferrer">
                                <button>
                                    <Image src={AppStore} alt="App Store" />
                                    APP STORE
                                </button>
                            </a>
                        </div>
                    </div>
                    <Link to="/">
                        <button className="login-button">Entrar no Backoffice</button>
                    </Link>
                </header>
            );
        });
    }

    function SecçãoFooterWebsite() {
        return dataFooterWeb.map((data, index) => {
            return (
                <section className="Footer">
                    <h2 className="titulos">{data.titulo_footer}</h2>
                    <div className="footer-div">
                        <div className="contacto-texto">
                            <h5>{data.texto_footer}</h5>
                        </div>
                    </div>
                    <div className="div_button2">
                        <a href={data.link1} target="_blank" rel="noopener noreferrer">
                            <button>
                                <Image src={PlayStore} alt="Google Play Store" />
                                GOOGLE PLAY
                            </button>
                        </a>
                        <a href={data.link2} target="_blank" rel="noopener noreferrer">
                            <button>
                                <Image src={AppStore} alt="App Store" />
                                APP STORE
                            </button>
                        </a>
                    </div>
                    <a href="#inicio">
                        <div id="setainicio" className="seta-inicio-button hide">
                            <i className="fa fa-solid fa-arrow-up seta-inicio-icon"></i>
                        </div>
                    </a>
                </section>
            );
        });
    }

    return (
        <div>
            {SecçãoHeaderWebsite()}
            <main>
                {SecçõesConteudoWebsite()}
                {SecçãoFooterWebsite()}
            </main>
            <script src="../../../assets/images/micro_site_images/script.js" async></script>
        </div>
    );
};

export default MicroSite;
