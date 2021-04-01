/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu ,Icon,Badge} from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    )
  } else {//로그인이 된 경우
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="historypage" style={{paddingBottom:3}}>
          <Badge count={user.userData && user.userData.history && user.userData.history.length}>
            <a href="/historypage" style={{marginRight:-22, color :'#6677777'}}>
            <Icon type="shopping-cart" style={{fontSize:30,marginBottom:3}}/>
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="charge">
        
        
      <a href="/charge">보유 point : {user.userData && user.userData.point}p</a>
        </Menu.Item>
        
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    )
  }
}
/*

        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="machine">
          <a href="/machine/upload">Machine Upload</a>
        </Menu.Item>
 */
export default withRouter(RightMenu);

