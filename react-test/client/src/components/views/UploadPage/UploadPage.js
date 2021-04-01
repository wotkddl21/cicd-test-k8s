import React, {useState} from 'react'
import {Typography,Button,Form,Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';



const {TextArea}= Input;
function UploadPage(props) {

    const [Title , setTitle]=useState("")
    
    const [Price, setPrice] = useState("0 원")
    const [Phone, setPhone] = useState("- 제외하고 입력")
    const [Address, setAddress] = useState("서울시 마포구 백범로 35-1")
    const [Image, setImage] = useState([])
    const [machine, setmachine] = useState("0 대")


    const titleChangeHandler=(event)=>{
        setTitle(event.currentTarget.value)
    }
    const PriceChangeHandler=(event)=>{
        setPrice(event.currentTarget.value)
    }
    const PhoneChangeHandler=(event)=>{
        setPhone(event.currentTarget.value)
    }
    const AddressChangeHandler=(event)=>{
        setAddress(event.currentTarget.value)
    }
    const updateImages = (newImages)=>{
        setImage(newImages)
    }
    const machineChangeHandler=(event)=>{
        setmachine(event.currentTarget.value)
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        if (!Title||!Price||!Phone||!Address||!Image||!machine){
            return alert("모든 값을 넣어주세요")
        }
        //backend로, value를 req로 보낸다.
        const body = {
            name:Title,
            price:Price,
            machineNum:machine,
            phone:Phone,
            address:Address,
            images:Image
        }
        Axios.post("/api/product",body)
        .then(response=>{
            if(response.data.success){
                alert('세탁소 정보 업로드 성공')
                props.history.push('/')

            }else{
                alert('세탁소 정보 업로드 실패')
            }
        })
        //로그인한 사람의 ID구하는 방법

    }


    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAligh: 'center',marginBottom:'2rem'}}>
                <h2>세탁소 정보 업로드 </h2>
            </div>
            <Form onSubmit={submitHandler}>
                <FileUpload  refreshFunction={updateImages} />
                {/*세탁소 이미지 업로드 dropzone*/}
                
                <br/>
                <br/>
                <label>세탁소이름</label>
                <Input onChange={titleChangeHandler} value = {Title}/>
                <br/>
                <br/>
                <label>세탁소이용가격</label>
                <Input onChange={PriceChangeHandler} value = {Price}/>
                <br/>
                <br/>
                <label>세탁기개수</label>
                <Input onChange={machineChangeHandler} value = {machine}/>
                <br/>
                <br/>
                <label>전화번호</label>
                <Input onChange={PhoneChangeHandler} value={Phone}/>
                <br/>
                <br/>
                <label>주소</label>
                <TextArea onChange={AddressChangeHandler} value ={Address}/>
                <button type="submit">
                    확인
                </button>
            
            
            </Form>
        </div>
    )
}

export default UploadPage
