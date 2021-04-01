import React from 'react'
import {Carousel} from 'antd';
function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image,index)=>(
                    <div key={index}>
                        <img style={{maxWidth:'300px', maxHeight:'150px'} }
                        //src={`http://localhost:5000/${image}`}/>
                        src={`http://localhost:31112/${image}`}/>
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default ImageSlider
