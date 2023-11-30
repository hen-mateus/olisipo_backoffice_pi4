import React from "react";
import { Row, Col, Image, Table, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

//progressbar
import Progress from "../../../components/progress.js";

// img
import shap1 from "../../../assets/images/shapes/01.png";
import shap2 from "../../../assets/images/shapes/02.png";
import shap3 from "../../../assets/images/shapes/03.png";
import shap4 from "../../../assets/images/shapes/04.png";
import shap5 from "../../../assets/images/shapes/05.png";
import shap6 from "../../../assets/images/shapes/06.png";

const Recibos = () => {
  const handleSimClick = () => {
    // Lógica para lidar com o clique no botão "Sim"
  };

  const handleNaoClick = () => {
    // Lógica para lidar com o clique no botão "Não"
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Recibos de Vencimento</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className="mb-0" role="grid">
                  <thead>
                    <tr>
                      <th className="text-center">Utilizador</th>
                      <th className="text-center">Data</th>
                      <th className="text-center">Recibo</th>

                      <th className="text-center">Envio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <h6>Vera Alves</h6>
                      </td>
                      <td className="text-center">
                        <div>
                          <div>
                            Janeiro 2023
                          </div>
                        </div>
                      </td>

                      <td className="text-center">

                        <div>

                          <Button variant="light" onClick={handleSimClick}>
                            Upload
                          </Button>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          <Button variant="success" onClick={handleSimClick}>
                            Enviar
                          </Button>

                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Recibos;
