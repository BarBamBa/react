import './App.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap'

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 추천', '파이썬 독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  let 좋아요 = (i) => {
    let copy = [...따봉];
    copy[i] += 1;
    따봉변경(copy);
  }

  let change = () => {
    let copy = [...글제목];
    copy[0] = '여자 코트 추천';
    글제목변경(copy);
  }

  let order = () => {
    let copy = [...글제목];
    copy.sort();
    글제목변경(copy);
  }

  let input = () => {
    let copy = [입력값, ...글제목];
    // = copy.unshift(입력값);
    let copy2 = [0, ...따봉];
    글제목변경(copy);
    따봉변경(copy2);
  }

  let remove = (i) => {
    let copy = [...글제목];
    let copy2 = [...따봉, 0];
    copy.splice(i, 1)
    copy2.splice(i, 1)
    글제목변경(copy);
    따봉변경(copy2);
  }

  return (
    <div className="App">

      <div className="black-nav">
        <h4>React Blog</h4>
      </div>

      <button onClick={change}>변경</button>
      <button onClick={order}>정렬</button>

      {글제목.map((item, i) => {
        return (
          // 반복문으로 html을 생성하면 key 다르게 줘야함
          <div className="list" key={i}>
            <h4 onClick={() => { setModal(!modal); setTitle(i) }}>{글제목[i]}
              <span onClick={(e) => { e.stopPropagation(); 좋아요(i) }}>👍</span> {따봉[i]}
              {/* span태그를 클릭하면 상위태그로 올라가며 이벤트 버블링발생 
                e.stopPropagation()이 버블링을 막아준다*/}
              
            </h4>

            <p>2월 17일 발행</p>
            <Button onClick={(e) => { e.stopPropagation(); remove(i) }} variant="primary">삭제</Button>{' '}
          </div>
        )
      })
      }

      <input onChange={(e) => { 입력값변경(e.target.value) }} type="text"></input>
      <button onClick={input}>입력</button>
      {/* 이벤트 핸들러 종류는 많다 골라 쓰자 */}
      {modal ? <Modal title={title} change={change} 글제목={글제목} /> : null}

    </div>
  );
}

const Modal = (props) => {
  console.log(props);
  return (
    <div className='modal'>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.change} >글수정</button>
    </div>
  );
}

export default App;
