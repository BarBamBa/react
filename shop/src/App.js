import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom' //npm install react-router-dom@6
import data from './data';
import Detail from './Routes/Detail';
import './App.css';

import React from 'react'

function App() {
  console.log(process.env.PUBLIC_URL);
  const [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 Hook함수

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className='bar'>
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}><img src={process.env.PUBLIC_URL + '/img/icon.png'} /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            {/* href로 이동을 하게되면 state가 초기화된다 */}
            {/* <Nav.Link href="/detail/0">Detail</Nav.Link>
            <Link to="/detail/0">Detail2</Link> */}
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate(-1) }}>뒤로가기</Nav.Link>
            <Nav.Link onClick={() => { navigate(1) }}>앞으로가기</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Main shoes={shoes} />} />
        {/* url 파라미터  :작명  으로 쓴다 */}
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />

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
  let navigate = useNavigate();
  console.log(props);
  return (
    <Col onClick={() => {navigate(`/detail/${props.shoes.id}`)}} className='item-card'>
      <img src={`${process.env.PUBLIC_URL}/img/shoes${props.shoes.id}.jpg`} width='80%' alt="shoes"/>
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
