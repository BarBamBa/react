import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom' //npm install react-router-dom@6
import data from './data';
import './App.css';

import React from 'react'

function App() {

  const [shoes, setShoes] = useState(data);

  return (
    <>    
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Main shoes={shoes} />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>

    </>
  )

}

const Main = (props) => {
  return (
    <>
      <div className='main-bg'></div>
      <Container>
        <Row>
          {props.shoes.map((item, i) => { return <Card shoes={props.shoes[i]} key={i} /> })}
        </Row>
      </Container>
    </>
  )
}

const Detail = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )

}

const Card = (props) => {
  return (
    <Col >
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width='80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  )
}
export default App
