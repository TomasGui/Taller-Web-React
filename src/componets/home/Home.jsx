import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel variant="light">
      <Carousel.Item interval={1200}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2018/04/19/18/40/finance-3333928_1280.jpg"
          alt="Compra y venta" />
        <Carousel.Caption className="fondo_blanco centro">
          <h2>Bienvenido a Crypto!</h2>
          <p className="p-5">Realiza Compras y Ventas de Crypto Monedas</p>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item interval={1200}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2018/02/06/14/08/bitcoin-3134829_1280.jpg"
          alt="Compra y Venta"
        />
        <Carousel.Caption className="fondo_blanco centro">
          <h2>Mantente Actualizado</h2>
          <p className='p-5'>Nuestras graficas te mantendran constantemente actualizado</p>
        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item interval={1200}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2017/08/15/08/53/bitcoin-2643159_1280.jpg"
          alt="Inteligencia Artificial"
        />
        <Carousel.Caption className="fondo_blanco centro">
          <h2>Inteligencia Artificial</h2>
          <p className='p-5'>
            Utiliza nuestra inteligencia artificial para asegurar ganancia!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;