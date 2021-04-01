import React, {useState} from 'react'
import {Typography,Button,Form,Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';



const {TextArea}= Input;
function MachineUploadPage(props) {

    const [Price, setPrice] = useState("0 원")
    const [Laundry, setLaundry] = useState("세탁기가 속한 세탁소 id")
    const [Machinetype, setMachinetype] = useState("세탁기 혹은 건조기")


    const priceChangeHandler=(event)=>{
        setPrice(event.currentTarget.value)
    }
    const laundryChangeHandler=(event)=>{
        setLaundry(event.currentTarget.value)
    }
    const machinetypeChangeHandler=(event)=>{
        setMachinetype(event.currentTarget.value)
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        if (!Price||!Laundry||!Machinetype){
            return alert("모든 값을 넣어주세요")
        }
        //backend로, value를 req로 보낸다.
        const body = {
            price:Price,
            laundry:Laundry,
            machinetype:Machinetype
        }
        Axios.post("/api/machine",body)
        .then(response=>{
            if(response.data.success){
                alert('세탁기 정보 업로드 성공')
                props.history.push('/')

            }else{
                alert('세탁기 정보 업로드 실패')
            }
        })
        //로그인한 사람의 ID구하는 방법

    }


    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAligh: 'center',marginBottom:'2rem'}}>
                <h2>세탁기 정보 업로드 </h2>
            </div>
            <Form onSubmit={submitHandler}>
                {/*세탁소 이미지 업로드 dropzone*/}
                
                <br/>
                <br/>
                <label>세탁기가격</label>
                <Input onChange={priceChangeHandler} value = {Price}/>
                <br/>
                <br/>
                <label>세탁소_id</label>
                <Input onChange={laundryChangeHandler} value = {Laundry}/>
                <br/>
                <br/>
                <label>기계종류</label>
                <Input onChange={machinetypeChangeHandler} value = {Machinetype}/>
                <br/>
                <br/>
                <button type="submit">
                    확인
                </button>
            
            
            </Form>
        </div>
    )
}

export default MachineUploadPage
