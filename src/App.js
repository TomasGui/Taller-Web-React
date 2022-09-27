import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alta_transaccion from './componets/alta_transaccion/Alta_transaccion';
import Login from './componets/login/Login';
import Registro from './componets/registro/Registro';
import Dashboard from './componets/dashboard/Dashboard';
import Lista from './componets/lista/Lista';
import Monto_final from './componets/monto_final/Monto_final';
import Graficas_compras from './componets/graficas_compras/Graficas_compras';
import Grafico_ventas from './componets/graficas_ventas/Grafico_ventas';
import Grafico_por_moneda from './componets/graficos_por_moneda/Grafico_por_moneda';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Card, Col, Row } from "react-bootstrap";
import Home from './componets/home/Home';
import IA_operaciones from './componets/iA_operaciones/IA_operaciones';


const App = () => {

  return (
    <div className="container m-5 mx-auto ">
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/" element={<Dashboard />}>
                      <Route index element={<Home />} />
                      <Route path="Alta_transaccion" element={<Alta_transaccion />} />
                      <Route path="Lista" element={<Lista />} />
                      <Route path="MontoFinal" element={<Monto_final />} />
                      <Route path="IA" element={<IA_operaciones />} />
                      <Route path="GraficarCompras" element={<Graficas_compras />} />
                      <Route path="GraficarVentas" element={<Grafico_ventas />} />
                      <Route path="GraficarPorMonedas" element={<Grafico_por_moneda />} />
                    </Route>
                    <Route
                      path="*"
                      element={<Navigate replace to={"/"}></Navigate>}
                    />
                  </Routes>
                </BrowserRouter>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div >
  );

}

export default App;
