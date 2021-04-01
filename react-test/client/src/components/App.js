import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
/*import Footer from "./views/Footer/Footer"
import UploadPage from "./views/UploadPage/UploadPage";
import MachineUploadPage from "./views/UploadPage/MachineUploadPage";*/
import DetailPage from "./views/DetailPage/DetailPage";
import ChargePage2 from "./views/ChargePage/ChargePage2";
import MyPage from "./views/MyPage/MyPage";
import HistoryPage from "./views/HistoryPage/HistoryPage"
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/charge" component={Auth(ChargePage2, true)} />
          
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          
          <Route exact path="/product/:productId" component={Auth(DetailPage, true)} />
          <Route exact path="/historypage" component={Auth(HistoryPage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}
//<Route exact path="/product/upload" component={Auth(UploadPage, true)} />
//<Route exact path="/machine/upload" component={Auth(MachineUploadPage, true)} />

export default App;
