import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

const Detail = (props) => {

  let [alert, setAlert] = useState(true);
  let [count, setCount] = useState(0);

  // useParams : url 파라미터에 입력한 값을 가져온다
  let { id } = useParams();
  let item = props.shoes.find((item) => {
    return item.id == id;
  });

  // useEffect안의 코드는 Detail 컴포넌트가 mount, update(재 렌더링)될 때 코드가실행된다
  // useEffect를 언제쓰면 좋은가? useEffect안의 코드는 html 렌더링이 끝난 후 실행된다
  // 고로 어려운 연산코드, 서버에서 데이터를 가져오는 코드, 타이머 같은 코드들을 쓴다
  useEffect(() => {
    setTimeout(() => { setAlert(!alert); }, 2000)

    // useEffect 안의 return은 useEffect 가 실행되기전에 실행된다
    // 타이머의 재렌더링으로 타이머 복수 생성을 방지하기위해 clearUp함수로 이전타이머를 없애기위해 넣는다
    // 데이터요청이 완료되기 전 재렌더링이되면 다시 데이터를 가져오며 발생하는 버그를 방지하기위해도 사용
    // cleanUp 펑션은 마운트시에는 실행 X 언마운트시에는 실행 O

    return () => {

    }
  }, [count])

  // []가 없으면 재렌더링시마다 계속 실행된다
  // []를 추가하면 []안의 값이 변할 때만 useEffect가 실행된다. 그래서 1회만 실행하고 싶을 때 빈칸으로 두면 된다
  // return () => {} 안에만 코드를짜놓으면 unmount 시에만 한 번 실행된다.




  return (
    <div className="container">
      {
        alert == true ?
          <div>
            2초이내 구매시 할인
          </div>
          : null
      }
      <button onClick={() => { setCount(count + 1) }} >{`Button${count}`}</button>
      <div className="row">
        <div className="col-md-6">
          <img src={`../../img/shoes${item.id}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )

}

export default Detail