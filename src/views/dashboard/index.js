import React, { useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './backoffice/css/main.css';

//circular
import Circularprogressbar from "../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from "../../components/progress.js";
//img
import shapes1 from "../../assets/images/shapes/01.png";
import shapes2 from "../../assets/images/shapes/02.png";
import shapes3 from "../../assets/images/shapes/03.png";
import shapes4 from "../../assets/images/shapes/04.png";
import shapes5 from "../../assets/images/shapes/05.png";

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color);

  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
    };
  };
  const variableColors = getVariableColor();

  const colors = [variableColors.primary, variableColors.info];
  useEffect(() => {
    return () => colors;
  });

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });
  const chart1 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: colors,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "total",
        data: [94, 80, 94, 80, 94, 80, 94],
      },
      {
        name: "pipline",
        data: [72, 60, 84, 60, 74, 60, 78],
      },
    ],
  };

  //chart2
  const chart2 = {
    options: {
      colors: colors,
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "50%",
          },
          track: {
            margin: 10,
            strokeWidth: "50%",
          },
          dataLabels: {
            show: false,
          },
        },
      },
      labels: ["Apples", "Oranges"],
    },
    series: [55, 75],
  };
  const chart3 = {
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "28%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["S", "M", "T", "W", "T", "F", "S", "M", "T", "W"],
        labels: {
          minHeight: 20,
          maxHeight: 20,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
    series: [
      {
        name: "Successful deals",
        data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35],
      },
      {
        name: "Failed deals",
        data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55],
      },
    ],
  };
  return (
    <Fragment>
      <Row>
        <Col md="12" lg="12">
          <Row className="row-cols-1">
            <div className="overflow-hidden d-slider1 " data-aos="fade-up" data-aos-delay="800">
              <Swiper
                className="p-0 m-0 mb-2 list-inline "
                slidesPerView={5}
                spaceBetween={32}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  550: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1400: { slidesPerView: 3 },
                  1500: { slidesPerView: 4 },
                  1920: { slidesPerView: 4 },
                  2040: { slidesPerView: 7 },
                  2440: { slidesPerView: 8 }
                }}
              >

                <SwiperSlide className="card card-slide" style={{ width: '20%', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card-body" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src="green.jpg"
                      alt="Ícone"
                      className="background-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        margin: '0',
                        padding: '0',
                        display: 'block',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                    <p className="mb-2" style={{ position: 'center', color: 'white', textAlign: 'center', width: '100%', top: '50%', transform: 'translateY(-50%)' }}>Colaboradores</p>
                    <button className="button">Ver</button>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="card card-slide" style={{ width: '20%', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card-body" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src="green.jpg"
                      alt="Ícone"
                      className="background-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        margin: '0',
                        padding: '0',
                        display: 'block',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                    <p className="mb-2" style={{ position: 'center', color: 'white', textAlign: 'center', width: '100%', top: '50%', transform: 'translateY(-50%)' }}>Clientes</p>
                    <button className="button">Ver</button>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="card card-slide" style={{ width: '20%', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card-body" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src="green.jpg"
                      alt="Ícone"
                      className="background-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        margin: '0',
                        padding: '0',
                        display: 'block',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                    <p className="mb-2" style={{ position: 'center', color: 'white', textAlign: 'center', width: '100%', top: '50%', transform: 'translateY(-50%)' }}>Manager</p>
                    <button className="button">Ver</button>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="card card-slide" style={{ width: '20%', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="card-body" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src="green.jpg"
                      alt="Ícone"
                      className="background-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        margin: '0',
                        padding: '0',
                        display: 'block',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                      }}
                    />
                    <p className="mb-2" style={{ position: 'center', color: 'white', textAlign: 'center', width: '100%', top: '50%', transform: 'translateY(-50%)' }}>Parcerias</p>
                    <button className="button">Ver</button>
                  </div>
                </SwiperSlide>


              </Swiper>
            </div>
          </Row>
        </Col>
        <Col md="12" lg="8">
          <Row>
            <Col md="12">
              <div className="card" data-aos="fade-up" data-aos-delay="800">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Clientes e Parcerias</h4>
                    <p className="mb-0">Taxa de crescimento</p>
                  </div>
                  <div className="d-flex align-items-center align-self-center">
                    <div className="d-flex align-items-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <g>
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            fill="currentColor"
                          ></circle>
                        </g>
                      </svg>
                      <div className="ms-2">
                        <span className="text-gray">Clientes</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center ms-3 text-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <g>
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            fill="currentColor"
                          ></circle>
                        </g>
                      </svg>
                      <div className="ms-2">
                        <span className="text-gray">Parcerias</span>
                      </div>
                    </div>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      variant="text-gray"
                      type="button"
                      id="dropdownMenuButtonSM"
                    >
                      Esta Semana
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Esta Semana</Dropdown.Item>
                      <Dropdown.Item href="#">Este Mês</Dropdown.Item>
                      <Dropdown.Item href="#">Este Ano</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <Chart
                    options={chart1.options}
                    series={chart1.series}
                    type="area"
                    height="245"
                  />
                </div>
              </div>
            </Col>
            <Col md="12" xl="6">
              <div className="card" data-aos="fade-up" data-aos-delay="900">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Ganhos</h4>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      variant="text-gray"
                      type="button"
                      id="dropdownMenuButtonSM"
                    >
                      Esta Semana
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Esta Semana</Dropdown.Item>
                      <Dropdown.Item href="#">Este Mês</Dropdown.Item>
                      <Dropdown.Item href="#">Este Ano</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <div className="flex-wrap d-flex align-items-center justify-content-between">
                    <Chart
                      className="col-md-8 col-lg-8"
                      options={chart2.options}
                      series={chart2.series}
                      type="radialBar"
                      height="250"
                    />
                    <div className="d-grid gap col-md-4 col-lg-4">
                      <div className="d-flex align-items-start">
                        <svg
                          className="mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          viewBox="0 0 24 24"
                          fill="#3a57e8"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="#3a57e8"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-3">
                          <span className="text-gray">Fashion</span>
                          <h6>251K</h6>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <svg
                          className="mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          viewBox="0 0 24 24"
                          fill="#4bc7d2"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="#4bc7d2"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-3">
                          <span className="text-gray">Acessórios</span>
                          <h6>176K</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="12" xl="6">
              <div className="card" data-aos="fade-up" data-aos-delay="1000">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Conversões</h4>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      variant="text-gray"
                      type="button"
                      id="dropdownMenuButtonSM"
                    >
                      Esta Semana
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Esta Semana</Dropdown.Item>
                      <Dropdown.Item href="#">Este Mês</Dropdown.Item>
                      <Dropdown.Item href="#">Este Ano</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <Chart
                    className="d-activity"
                    options={chart3.options}
                    series={chart3.series}
                    type="bar"
                    height="230"
                  />
                </div>
              </div>
            </Col>
            <Col md="12" lg="12">
              <div
                className="overflow-hidden card"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Clientes Empresariais</h4>
                    <p className="mb-0">
                      <svg
                        className="me-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#3a57e8"
                          d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                      </svg>
                      15 novos adquiridos este mês
                    </p>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table
                      id="basic-table"
                      className="table mb-0 table-striped"
                      role="grid"
                    >
                      <thead>
                        <tr>
                          <th>EMPRESAS</th>
                          <th>CONTACTOS</th>
                          <th>ENCOMENDA</th>
                          <th>CONCLUSÃO</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes1}
                                alt="profile"
                              />
                              <h6>Roupas Esportivas Adidas</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$14,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>60%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={60}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes5}
                                alt="profile"
                              />
                              <h6>Plataformas de Streaming (Netflixer)</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$30,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>25%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={25}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes2}
                                alt="profile"
                              />
                              <h6>Lojas Shopify</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$8,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes3}
                                alt="profile"
                              />
                              <h6>Tecnologias Bootstrap</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$20,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes4}
                                alt="profile"
                              />
                              <h6>Comunidade Primeiro</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$9,800</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>75%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={75}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md="12" lg="4">
          <Row>
            <Col md="12" lg="12">
              <div
                className="card credit-card-widget" 
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="pb-4 border-0 card-header" style={{ background: 'linear-gradient(to , #4CAF50, #00C853)' }}
                >
                  <div className="p-4 border border-white rounded primary-gradient-card" >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="font-weight-bold">VISA </h5>
                        <p className="mb-0">CONTA PREMIUM</p>
                      </div>
                      <div className="master-card-content">
                        <svg
                          className="master-card-1"
                          width="60"
                          height="60"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                          />
                        </svg>
                        <svg
                          className="master-card-2"
                          width="60"
                          height="60"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="card-number">
                        <span className="fs-5 me-2">5789</span>
                        <span className="fs-5 me-2">****</span>
                        <span className="fs-5 me-2">****</span>
                        <span className="fs-5">2847</span>
                      </div>
                    </div>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <p className="mb-0">Titular do Cartão</p>
                      <p className="mb-0">Data de Expiração</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>Henrique de 9</h6>
                      <h6 className="ms-5">06/11</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="flex-wrap mb-4 d-flex align-itmes-center">
                    <div className="d-flex align-itmes-center me-0 me-md-4">
                      <div>
                        <div className="p-3 mb-2 rounded bg-soft-primary">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.9303 7C16.9621 6.92913 16.977 6.85189 16.9739 6.77432H17C16.8882 4.10591 14.6849 2 12.0049 2C9.325 2 7.12172 4.10591 7.00989 6.77432C6.9967 6.84898 6.9967 6.92535 7.00989 7H6.93171C5.65022 7 4.28034 7.84597 3.88264 10.1201L3.1049 16.3147C2.46858 20.8629 4.81062 22 7.86853 22H16.1585C19.2075 22 21.4789 20.3535 20.9133 16.3147L20.1444 10.1201C19.676 7.90964 18.3503 7 17.0865 7H16.9303ZM15.4932 7C15.4654 6.92794 15.4506 6.85153 15.4497 6.77432C15.4497 4.85682 13.8899 3.30238 11.9657 3.30238C10.0416 3.30238 8.48184 4.85682 8.48184 6.77432C8.49502 6.84898 8.49502 6.92535 8.48184 7H15.4932ZM9.097 12.1486C8.60889 12.1486 8.21321 11.7413 8.21321 11.2389C8.21321 10.7366 8.60889 10.3293 9.097 10.3293C9.5851 10.3293 9.98079 10.7366 9.98079 11.2389C9.98079 11.7413 9.5851 12.1486 9.097 12.1486ZM14.002 11.2389C14.002 11.7413 14.3977 12.1486 14.8858 12.1486C15.3739 12.1486 15.7696 11.7413 15.7696 11.2389C15.7696 10.7366 15.3739 10.3293 14.8858 10.3293C14.3977 10.3293 14.002 10.7366 14.002 11.2389Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ms-3">
                        <h5>1153</h5>
                        <small className="mb-0">Produtos</small>
                      </div>
                    </div>
                    <div className="d-flex align-itmes-center">
                      <div>
                        <div className="p-3 mb-2 rounded bg-soft-info">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ms-3">
                        <h5>81K</h5>
                        <small className="mb-0">Pedido Servido</small>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex-wrap d-flex justify-content-between">
                      <h2 className="mb-2">$405,012,300</h2>
                      <div>
                        <span className="badge bg-success rounded-pill">
                          YoY 24%
                        </span>
                      </div>
                    </div>
                    <p className="text-info">Vendas ao Longo da Vida</p>
                  </div>
                  <div className="grid-cols-2 d-grid gap">
                    <button className="btn btn-primary text-uppercase">
                    RESUMO
                    </button>
                    <button className="btn btn-info text-uppercase">
                    ANÁLISE
                    </button>
                  </div>
                </div>
              </div>
              <div className="card" data-aos="fade-up" data-aos-delay="500">
                <div className="text-center card-body d-flex justify-content-around">
                  <div>
                    <h2 className="mb-2">
                      750<small>K</small>
                    </h2>
                    <p className="mb-0 text-gray">Visitantes do Website</p>
                  </div>
                  <hr className="hr-vertial" />
                  <div>
                    <h2 className="mb-2">7,500</h2>
                    <p className="mb-0 text-gray">Novos Clientes</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="12">
              <div className="card" data-aos="fade-up" data-aos-delay="600">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Visão Geral da Atividade</h4>
                    <p className="mb-0">
                      <svg
                        className="me-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#17904b"
                          d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                        />
                      </svg>
                      16% neste mês
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">$2400, Compra</h6>
                      <span className="mb-0">11 JUL 8:10 PM</span>
                    </div>
                  </div>
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">Novo pedido #8744152</h6>
                      <span className="mb-0">11 JUL 11 PM</span>
                    </div>
                  </div>
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">Pagamento de Afiliado</h6>
                      <span className="mb-0">11 JUL 7:64 PM</span>
                    </div>
                  </div>
                  <div className="mb-2 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">Novo colaborador adicionado</h6>
                      <span className="mb-0">11 JUL 1:21 AM</span>
                    </div>
                  </div>
                  <div className="mb-1 d-flex profile-media align-items-top">
                    <div className="mt-1 profile-dots-pills border-primary"></div>
                    <div className="ms-4">
                      <h6 className="mb-1 ">Produto adicionado</h6>
                      <span className="mb-0">11 JUL 4:50 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
})

export default Index
