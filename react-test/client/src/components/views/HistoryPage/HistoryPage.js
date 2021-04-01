import React, {useEffect,useState} from 'react'
import {useDispatch} from 'react-redux';
import axios from 'axios';
import "./HistoryPage.css"
import {removeHistory} from '../../../_actions/user_actions'
import Empty1 from './Empty1'
import {Modal} from 'antd';
function HistoryPage(props) {
    const dispatch = useDispatch();
    const [History, setHistory] = useState([])
    const [times, settimes] = useState([])
    const [Visible2, setVisible2] = useState(false)
    const [IDS, setIDS] = useState(0)
    const [DeleteTime, setDeleteTime] = useState(0)
    const [DeleteIndex, setDeleteIndex] = useState(0)
    const [Point, setPoint] = useState(0)
    const [showTotal, setshowTotal] = useState(false)
    const handleOk2=e=>{  
        // 예약취소에서, 확인 버튼을 누른 경우
        setVisible2(false)
        dispatch(removeHistory(IDS,DeleteTime,DeleteIndex,Point))
          //취소된 금액만큼 다시 충전
        alert("취소 완료!")
        window.location.reload()
    }
    const handleCancel2=e=>{
        setVisible2(false)
    }
    const showModal = (id,deltime,delindex,point,e)=>{
        setVisible2(true)
        setDeleteTime(deltime)
        setDeleteIndex(delindex)
        setPoint(point)
        setIDS(id)
        
        
    }
    useEffect(() => {
        let ids = []
        let temp = []
        if( props.user.userData && props.user.userData.history){
            props.user.userData.history.forEach(item =>{
                ids.push(item.id);
                temp.push(item.time)
                setshowTotal(false)
            })
            axios.get(`/api/machine/getmachine?id=${ids}&type=array`)
            .then(response=>{
                if(response.data.success){
                        setHistory(response.data.data)
                        settimes(temp)
                }else{
                    alert("failed to load history information")
                }
            })
        }else{
            setshowTotal(true)
        }
        
    }, [props])
    const [Laundry, setLaundry] = useState([])
    useEffect(() => {
        
        axios.post('/api/product/laundry')
        .then(response=>{
            if(response.data.success){
                    console.log(response.data)
                    setLaundry(response.data.laundryInfo)
            }else{
                alert("failed to load laundry information")
            }
        })

    }, [])

    const renderImages= (images)=>{
        if(images.length>0){
            let image = images[0]
            //return `http://localhost:5000/${image}`
            return `http://localhost:31112/${image}`
        }
    }

    const renderHistory = History.map((item,index)=>{
        var i=0;
        var find = false;
        var curidx = 0;
        const time_line = ["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30",
    "07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30",
    "23:00","23:30"]
        if(Laundry){
            for(i=0;i<Laundry.length;i++){
                if (item.laundry === Laundry[i]._id){
                    find = true; curidx = i;
                }
            }
        }
        return <tr key = {index}>
                
                <td>
                    <img style={{width:'70px'}} alt="product"
                    src = {renderImages(Laundry[curidx].images)}/>
                </td>
                <td>
                    {Laundry[curidx].name}
                </td>
                <td>
                    {Laundry[curidx].price}
                </td>
                <td>
                    {item.machinetype}
                </td>
                <td>
                    {time_line[times[index]]}
                </td>
                <td>
                    <button onClick={()=>showModal(item._id,times[index],index , Laundry[curidx].price)}>
                        취소하기
                    </button>
                    
                </td>
             </tr>
        
    })

    return (
        <div style={{width : '85%', margin:'3rem auto'}}>
            <h1>내 예약목록</h1>
            <Modal
                    title = "확인"
                    visible = {Visible2}
                    onOk={handleOk2}
                    onCancel = {handleCancel2}
                    >
                    예약을 취소 하시겠습니까?
            </Modal>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                세탁소
                            </th>
                            <th>
                                세탁소 이름
                            </th>
                            <th>
                                가격
                            </th>
                            <th>
                                기계
                            </th>
                            <th>
                                시간
                            </th>
                            <th>
                                취소하기
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {  renderHistory
                            
                        }
                    </tbody>
                    
                </table>
                {showTotal ? <Empty1></Empty1>  : <div></div> }
            </div>
            
        </div>
    )
}

export default HistoryPage
