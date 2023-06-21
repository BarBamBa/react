import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap'
import react, { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom' //npm install react-router-dom@6
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from './components/data';
import Detail from './Routes/Detail';
import './App.css';

import React from 'react'

function App() {

  const [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); // 페이지 이동을 도와주는 Hook함수

  return (
    <>
      <nav className='navbar'>
        <div className="navbar-logo" onClick={() => { navigate('/nikeShop/') }}>
          <img src='../public/img/logo.png' />
        </div>
        <div className="navbar-menu">
          <li onClick={() => { navigate('/nikeShop/') }}>Home</li>
          <li onClick={() => { navigate('/nikeShop/detail/0') }}>Detail</li>
          <li onClick={() => { navigate(-1) }}>뒤로가기</li>
          <li onClick={() => { navigate(1) }}>앞으로가기</li>
          <li onClick={() => { navigate('/nikeShop/about') }}>About</li>
        </div>
        <div className="navbar-icons">
          
        </div>
      </nav>

      <Routes Routes >
        <Route path='/nikeShop/' element={<Main shoes={shoes} />} />
        {/* url 파라미터  :작명  으로 쓴다 */}
        <Route path='/nikeShop/detail/:id' element={<Detail shoes={shoes} />} />

        {/* <Route path='/about' element={<About />} />
        <Route path='/about/member' element={<About />} />
        <Route path='/about/location' element={<About />} /> */}

        {/* 위의 nested Route */}
        <Route path='/nikeShop/about' element={<About />}>
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
    <Col onClick={() => { navigate(`/nikeShop/detail/${props.shoes.id}`) }} className='item-card'>
      <img src={`../public/img/shoes${props.shoes.id}.jpg`} alt="shoes" />
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
