import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom' //npm install react-router-dom@6
import data from './data';
import Detail from './Routes/Detail';
import './App.css';

import React from 'react'

function App() {

  const [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 Hook함수

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Detail</Nav.Link>
            <div><a href="/detail">Detail</a></div>
            <Link to="/detail">Detail2</Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail2</Nav.Link>
            <Nav.Link onClick={() => { navigate(-1) }}>뒤로가기</Nav.Link>
            <Nav.Link onClick={() => { navigate(1) }}>앞으로가기</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Main shoes={shoes} />} />
        <Route path='/detail' element={<Detail />} />

        {/* <Route path='/about' element={<About />} />
        <Route path='/about/member' element={<About />} />
        <Route path='/about/location' element={<About />} /> */}

        {/* 위의 nested Route */}
        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>멤버정보임</div>} />  {/* /about/member */}
          <Route path='location' element={<div>위치정보임</div>} />  {/* /about/location */}
        </Route>

        <Route path='*' element={<div>없는 페이지예요</div>} />{/* 404페이지 구현방법 */}

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

const Card = (props) => {
  return (
    <Col >
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width='80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

const About = () => {
  let navigate = useNavigate();
  return (
    <div>
      <div>상세페이지</div>
      <Outlet></Outlet>
      <Button onClick={() => { navigate('member') }}>Member</Button> {/* /를 빼고 입력해야한다 */}
      <Button onClick={() => { navigate('location') }}>Location</Button>
      {/* nested Route 들이 보여질 곳을 정해줌 */}
    </div>

  )
}

export default App
