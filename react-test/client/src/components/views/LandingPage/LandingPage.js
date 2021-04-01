import React ,{useEffect,useState}from 'react'

import axios from 'axios';
import {Card} from 'antd';

import ImageSlider from '../../utils/ImageSlider';
import MapApi from '../../utils/MapApi';

function LandingPage(props) {
    
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
    const renderCards = Laundry.map((laundry,index)=>{
        // 세탁소 아이콘이 출력되는 부분
        // 거리순으로 정렬해서 보여줘야함
        // 지금은 현재 위치와 상관없이 DB에 저장된 모든 세탁소를 보여줌
        return  <Card key={index}
            cover = { <a href={`/product/${laundry._id}`}>
            <ImageSlider images={laundry.images} /></a>}
            //<img src={`http://localhost:5000/${laundry.images}`}  height={300}/>
            //{<ImageSlider images={laundry.images}>
            //</ImageSlider>}
        >
            <span style ={{"fontWeight":"700","fontSize":"large" }} >
            {laundry.name}
            </span>
            <br></br>
            <br></br>
            {'가격 : '+laundry.price}
            
            </Card>
            //test
    })
    const [userDATA, setuserDATA] = useState([])
    useEffect(() => {
        if( props.user.userData){
            axios.get(`/api/users/user_by_email?userEmail=${props.user.userData.email}&type=single`)
            .then(response=>{
                if(response.data.success){
                    setuserDATA(response.data.userInfo)
                    
                    
                    
                    
                }else{
                    alert('상세 정보 가지오기 실패')
                }
            })
        }
    }, [props.user.userData])
    const renderUser = userDATA.map((userdata,index)=>{
        return  <div key = {index}>
                    
                    <br></br>
                Name : {userdata.name }
                    <br></br>
                    Email : {userdata.email}
                    <br></br>
                    Point : <a href='/charge'>{userdata.point} </a> P
                    <br></br>
                    <br></br>
                    
                </div>
                
    })
    
    


    return (
        <div style={{width:'100%',height:'100%'}}>
            
            
                <MapApi  />
            <div style={{width:'20%', float:'left', position:'fixed',top:'330',left:'85%',height:'400'}}>
                    {userDATA[0] ? renderUser : <div>
                        <br></br>
                Name :  <a href='/login' >로그인</a>
                    <br></br>
                    Email : 로그인 후 이용하세요
                    <br></br>
                    Point : 0 P
                    <br></br>
                    <br></br>
                </div>}
                    
                    
                <div style={{width:'15%',overflowY:'scroll',height:'78%',position:'fixed',top:'700',left:'85%'}}>
                    {renderCards}
                </div>
            </div>
            
        </div>
    )
}

export default LandingPage
