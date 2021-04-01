import React, {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {Button,Modal,Row,Col} from 'antd';
import {chargePoint} from '../../../_actions/user_actions'
function ChargePage(props) {
    const dispatch = useDispatch();
    const [Point, setPoint] = useState(-1)
    const [visible, setvisible] = useState(false)
    const [userPoint, setuserPoint] = useState(0)
    useEffect(() => {
        if(props.user && props.user.userData){
            setuserPoint(props.user.userData.point)
        }
    }, [props])
    const showModal=()=>{
        if(Point===-1){
            alert("충전 금액을 선택해 주세요")
        }
        else{
        setvisible(true)  // 충전하시겠습니까?
        }
    }
    const handlerOk=()=>{ //충전 진행
        dispatch(chargePoint(Point))
        setvisible(false)
        alert(Point+"p 충전 완료!")
        window.location.reload()
    }
    const handleCancel=()=>{
        setvisible(false)
    }
    const Handler=(money)=>{
        setPoint(money)
    }



    return (<div className="app">
            <div>
            <Modal
                title = "충전하기"
                visible = {visible}
                onOk={handlerOk}
                onCancel = {handleCancel}
            >
                {Point}가 충전됩니다.
                <br></br>
                이전 나의 포인트 : {userPoint}
                <br></br>
                결제 후 나의 포인트 : {userPoint+Point}
                <br></br>
                충전 하시겠습니까?
            </Modal>
                <p></p>
                <Col gutter={16,16}>
                <Row>
                <Button shape="round" onClick={(e)=>Handler(10000)}>10,000원</Button>
                <Button shape="round"onClick={(e)=>Handler(15000)}>15,000원</Button>
                <Button shape="round"onClick={(e)=>Handler(20000)}>20,000원</Button>
                </Row>
                <br></br>
                <Row>
                <Button shape="round"onClick={(e)=>Handler(25000)}>25,000원</Button>
                <Button shape="round"onClick={(e)=>Handler(30000)}>30,000원</Button>
                <Button shape="round"onClick={(e)=>Handler(35000)}>35,000원</Button>
                </Row>
                <br></br>
                <Row>
                <Button shape="round"onClick={(e)=>Handler(40000)}>40,000원</Button>
                <Button shape="round"onClick={(e)=>Handler(45000)}>45,000원</Button>
                <Button shape="round"onClick={(e)=>Handler(50000)}>50,000원</Button>
                </Row>
                </Col>
                <br></br>
                <Button shape="round" type="danger" onClick={(e)=>showModal()}>충 전 하 기</Button>
                
                </div>
                
        </div>
    )
}

export default ChargePage
