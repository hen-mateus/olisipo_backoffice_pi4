import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";

const Feriasmap = [
  {
    name: "Aprovado",
    position: "Vera Alves",
    office: "10/10/23 a 13/10/23",
    age: "4 dias",
    startdate: "2023",
    salary: "✅ ➖ ❌",
  },
  {
    name: "Aprovado",
    position: "Manuel Pinto",
    office: "23/11/23 a 24/11/23",
    age: "2 dias",
    startdate: "2023",
    salary: "✅ ➖ ❌",
  },
  {
    name: "Recusado",
    position: "José Santos",
    office: "26/12/23 a 29/10/23",
    age: "4 dias",
    startdate: "2023",
    salary: "✅ ➖ ❌",
  },
  {
    name: "Pendente",
    position: "Beatriz Santos",
    office: "15/01/24 a 19/01/24",
    age: "5 dias",
    startdate: "2024",
    salary: "✅ ➖ ❌",
  },
];

const Ferias = () => {
  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Férias submetidas</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <p>
              <code>🔻</code> novas submissões submetidas{" "}
              </p>
              <div className="table-responsive border-bottom my-3">
                <Table
                  responsive
                  striped
                  id="datatable"
                  className=""
                  data-toggle="data-table"
                >
                  <thead>
                    <tr>
                      <th>Estado</th>
                      <th>Utilizador</th>
                      <th>Datas</th>
                      <th>Dias</th>
                      <th>Ano</th>
                      <th>Aprovação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Feriasmap.map((item) => (
                      <tr key={item.age}>
                        <td>{item.name}</td>
                        <td>{item.position}</td>
                        <td>{item.office}</td>
                        <td>{item.age}</td>
                        <td>{item.startdate}</td>
                        <td>{item.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row className="align-items-center">
                  <Col md="6">
                    <div
                      className="dataTables_info"
                      id="datatable_info"
                      role="status"
                      aria-live="polite"
                    >
                      Mostrar 1 a 10 de 57 entradas 
                    </div>
                  </Col>
                  <Col md="6">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="datatable_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className="paginate_button page-item previous disabled"
                          id="datatable_previous"
                        >
                          <Link
                            to="#"
                            aria-controls="datatable"
                            aria-disabled="true"
                            data-dt-idx="previous"
                            tabIndex="0"
                            className="page-link"
                          >
                            Anterior
                          </Link>
                        </li>
                        <li className="paginate_button page-item active">
                          <Link
                            to="#"
                            aria-controls="datatable"
                            aria-current="page"
                            data-dt-idx="0"
                            tabIndex="0"
                            className="page-link"
                          >
                            1
                          </Link>
                        </li>
                        <li className="paginate_button page-item ">
                          <Link
                            to="#"
                            aria-controls="datatable"
                            data-dt-idx="1"
                            tabIndex="0"
                            className="page-link"
                          >
                            2
                          </Link>
                        </li>
                        <li className="paginate_button page-item ">
                          <Link
                            to="#"
                            aria-controls="datatable"
                            data-dt-idx="2"
                            tabIndex="0"
                            className="page-link"
                          >
                            3
                          </Link>
                        </li>
                        <li className="paginate_button page-item ">
                          <Link
                            to="#"
                            aria-controls="datatable"
                            data-dt-idx="3"
                            tabIndex="0"
                            className="page-link"
                          >
                            4
                          </Link>
                        </li>
                        <li className="paginate_button page-item ">
                          <Link
                            to="#"
                            aria-controls="datatable"
                            data-dt-idx="4"
                            tabIndex="0"
                            className="page-link"
                          >
                            5
                          </Link>
                        </li>
                        <li className="paginate_button page-item ">
                          <Link
                            to="#"
                            aria-controls="datatable"
                            data-dt-idx="5"
                            tabIndex="0"
                            className="page-link"
                          >
                            6
                          </Link>
                        </li>
                        <li
                          className="paginate_button page-item next"
                          id="datatable_next"
                        >
                          <Link
                            to="#"
                            aria-controls="datatable"
                            data-dt-idx="next"
                            tabIndex="0"
                            className="page-link"
                          >
                            Próximo
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Ferias;
