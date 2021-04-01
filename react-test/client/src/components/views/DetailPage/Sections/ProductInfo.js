import React, { useEffect,useState } from 'react'
import {Card,Button,Modal} from 'antd';
import {useDispatch} from 'react-redux';
import {addToHistory} from '../../../../_actions/user_actions'


function ProductInfo(props) {
    const dispatch = useDispatch();
    const [curIdx, setcurIdx] = useState(-1)
    const [Visible, setVisible] = useState(false)
    const [Time, setTime] = useState(-1)
    const [Visible2, setVisible2] = useState(false)
    const [MoneyVisible, setMoneyVisible] = useState(false)
    const [userPoint, setuserPoint] = useState(0)

    const [needprice, setneedprice] = useState(0)
    



    const timeHandler = (id)=>{
        setTime(id);
    }
    const [Machine, setMachine] = useState([])
    const showModal=(index,price,e)=>{
        
        setneedprice(price)
        if (price > userPoint){  //포인트 모자라면 충전후 이용하세요로 안내
            
            setMoneyVisible(true)
        }
        else{
            setVisible(true)
            setcurIdx(index)
        }
    }
    const handleOk=e=>{
        setVisible2(true)
    }
    const handlerMoney=e=>{
        setMoneyVisible(false)
    }
    const MoneyCancel=e=>{
        setMoneyVisible(false)
    }
    const handleOk2=e=>{
        dispatch(addToHistory(props.detail[curIdx]._id,Time,needprice))
        
        setVisible2(false)
        setVisible(false)
        alert("예약 되었습니다.")
        window.location.reload()
    }
    const handleCancel=e=>{
        setVisible(false)
    }
    const handleCancel2=e=>{
        setVisible2(false)
    }
    useEffect(() => {
        if(props.detail){
            let images=[]
            props.detail.map(item=>{
                images.push(item)
                
            })
            setMachine(images)
        }
        
    }, [props.detail])
    useEffect(() => {
        if(props.userData){
            setuserPoint(props.userData.point)
        }
        //setuserPoint(props.userData.point)
    }, [props.userData])
    //<Button shape="round" type="danger" onClick={(e)=>clickHandler(index,e)}>
    //ret_val.push( <Button key = {i} shape="round" onClick={(e)=>clickHandler(item._id,i)}>  {time_line[i]} </Button>)
    const time_line = ["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30",
    "07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30",
    "23:00","23:30"]
    const date = new Date();
    const renderSchedule = Machine.map((item,index )=>{
        if (index === curIdx){
            var ret_val = [];
            item.schedule.map((sch,i)=>{
                if(sch.reservation === 0 && i > date.getHours()*2 + Math.floor((date.getMinutes())/30)){
                    
                    ret_val.push( <Button key = {i} shape="round" onClick={(e)=>timeHandler(i)}>  {time_line[i]} </Button>)
                }
                else{
                    ret_val.push(<Button key = {i} shape="round" disabled={true}>  {time_line[i]} </Button>)
                }
            })
            return <div key = {index}> {ret_val}</div>
        }
        
    })


    const renderCards = Machine.map((machine,index)=>{
        console.log(props)
        return  <Card key={index} >
            {machine.machinetype}
            <br></br>
            {'가격 : '+machine.price}
            <br></br>
            
            <Button shape="round" type="danger" onClick={(e)=>showModal(index,machine.price,e)}>
                예약하기
            </Button>
            
            </Card>
    })
    return (
        <div>
            
            <Modal 
                title= " 예약하기"
                visible = {Visible}
                onOk={handleOk}
                onCancel = {handleCancel}
            >
                {renderSchedule}
            </Modal>
            <Modal
                title = "확인"
                visible = {Visible2}
                onOk={handleOk2}
                onCancel = {handleCancel2}
            >
                {needprice}p 가 차감됩니다.
                <br></br>
                이전 나의 포인트 : {userPoint}p
                <br></br>
                결제 후 나의 포인트 : {userPoint-needprice}p
                <br></br>
                예약 하시겠습니까?
            </Modal>
            <Modal
                title ="포인트 부족"
                visible = {MoneyVisible}
                onOk={handlerMoney}
                onCancel = {MoneyCancel}
            
            >
            포인트가 부족합니다.
            <br></br>
            필요 포인트 : {needprice}
            <br></br>
            내 잔여 포인트 : {userPoint}
            <br></br>
            <a href='/charge'>포인트 충전하러 가기</a>
            </Modal>
            {renderCards}
        </div>
    )
}

export default ProductInfo
