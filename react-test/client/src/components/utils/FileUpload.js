import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';
import { FaImages } from 'react-icons/fa';


function FileUpload(props) {
    const [Images, setImages] = useState([])
    const dropHandler = (files)=>{
        let formData = new FormData();
        const config = {
            header:{'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0])
        axios.post('/api/product/image',formData ,config)
        .then(response=>{
            if(response.data.success){ //파일전송 성공시
                
                setImages([...Images,response.data.filePath])
                props.refreshFunction([...Images,response.data.filePath])






            }else{
                alert("Failed to upload image!")
            }
        })
    }
    const deleteHandler = (image)=>{
        const currentIndex = Images.indexOf(image)
        let newImages = [...Images]  // 기존 이미지들을 복사
        newImages.splice(currentIndex,1)  // 현재 index부터 1개만큼 image를 지움
        setImages(newImages)  // index의 image를 지운 list를 보여줌
        props.refreshFunction(newImages)




    }
    return (
        <div style = {{display:'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div 
                        style={{width: 300, height: 240, border: '1px solid lightgray',
                    display: 'flex',alignItems: 'center', justifyContent:'center'}}
                        {...getRootProps()}>
                            <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize:'3rem'}} />
                        </div>
                    </section>
                )}
            </Dropzone>
            <div style={{display:'flex',width:'350px', height:'300px',overflowX:'scroll'}}>
                {Images.map((image,index)=>(
                    <div onClick={()=>deleteHandler(image)} key={index}>
                        <img style={{width:'300px',height:'240px'}}
                        //src={`http://localhost:5000/${image}`}
                        src={`/api/${image}`}
                        />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default FileUpload
