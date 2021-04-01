import React, { useEffect,useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Row,Col} from 'antd';
function DetailPage(props) {
    const productId = props.match.params.productId;
    const [Machine, setMachine] = useState([])
    const [Laundry, setLaundry] = useState({})
    const [userData, setuserData] = useState([])
    useEffect(() => {
        setuserData(props.user.userData)
    }, [props.user])
    useEffect(() => {
    
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response=>{
            if(response.data.success){
                setLaundry(response.data.temp[0])
                
                
            }else{
                alert('상세 정보 가지오기 실패')
            }
        })
    }, [])
    useEffect(() => {
        axios.get(`/api/machine/getmachine?id=${productId}&type=single`)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                let d = [];
                response.data.Data.map(machine=>{
                    d.push(machine)
                })
                setMachine(d)
            }else{
                alert('상세 정보 가지오기 실패')
            }
        })

    }, [])
    
    return (
        /*
        <div style={{width:'100%',height:'100%'}}>
            <h1>{Laundry.name}</h1>
            <div style={{width:'60%',overflowY:'scroll', float:'left', position:'fixed',top:'300',left:'0%',height:'80%'}}>
                <ProductImage detail={Laundry}/>
            </div>
            <div style={{width:'40%',overflowY:'scroll',height:'70%',position:'fixed',top:'600',left:'60%'}}>
                <ProductInfo detail={Machine}/>
            </div>
                
        </div>
        */
       <div>
           <h1 align="center" >  {Laundry.name}</h1>
           <Row gutter={[16,16]}>
               <Col><div style={{width:'70%', float:'left',overflowY:'scroll', position:'fixed',top:'300',left:'0%',height:'80%'}}>
                <ProductImage detail={Laundry}/>
            </div></Col>
            
            <div style={{width:'30%',height:'80%',position:'fixed',top:'600',left:'70%'}}>                
                <div style={{fontWeight:"bold", padding:"0px 2px 0px 0px"}}> 전화번호 : {Laundry.phone}</div>
                <div style={{fontWeight:"bold", padding:"0px 2px 0px 0px"}}> 주소 : {Laundry.address}</div>
                <div style = {{overflowY:'scroll',position:'fixed',width:'30%',height:'80%'}}>
                <ProductInfo detail={Machine}  userData = {userData}   />
                </div>
            </div>

           </Row>
       </div>
    )
}

export default DetailPage
