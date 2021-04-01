import React, {useEffect,useState} from 'react'
import {Col,Row,Button} from 'antd';
import axios from 'axios';
function ChargePage2(props) {
    //imp01487112
    const [userID, setuserID] = useState()
    const [userName, setuserName] = useState()
    const [Point, setPoint] = useState(0)
    const [Mypoint, setMypoint] = useState(0)
    const Handler=(money)=>{
        setPoint(money)
    }
    useEffect(() => {
        if(props.user && props.user.userData){
            setuserID(props.user.userData.id)
            setuserName(props.user.userData.name)
            setMypoint(props.user.userData.point)
        }
    }, [props])
    const charge=()=>{
        
        var IMP = window.IMP;
        IMP.init('imp01487112');
        var id = userID;
        //alert(money,id);
        IMP.request_pay({
            pg: 'kakao',
            merchant_uid: 'merchant_' + new Date().getTime(),

            name: '주문명 : 주문명 설정',
            amount: Point,
            buyer_name: userName,
            buyer_id: id
        }, function (rsp) {
            console.log(rsp);
            if (rsp.success) {
                var msg = '결제가 완료되었습니다.';
                console.log(msg)
                let body = {
                    chargepoint: Point
                };
                axios.post('/api/users/chargePoint',body)
                .then(response=>{
                if(response.data.success){
                        console.log(response.data)
                        alert(Point+"p 충전이 완료되었습니다.")
                        window.location.reload()
                        
                }else{
                    alert("failed to load laundry information")
                }
                })
                    
                
                
                /*$.ajax({
                    type: "GET", 
                    url: "/user/mypage/charge/point", //충전 금액값을 보낼 url 설정
                    data: {
                        "amount" : money
                    },
                });*/
            } else {
                var msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
            }
            //alert(msg);
            //document.location.href="/user/mypage/home"; //alert창 확인 후 이동할 url 설정
        });



    }
    return (
        <div className="app">
            <p >{userName}님 포인트 충전</p>
            <p>현재 포인트 : {Mypoint}</p>
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
            <p>충전 후 포인트 : {Mypoint + Point}</p>
            <Button type="button" onClick={ (e)=>charge()} id="charge_kakao">충 전 하 기</Button>
        </div>
    )
}

export default ChargePage2
