import Home from './components/Home';
import './App.css';
import { Route, Switch } from "react-router-dom";
import SignUp from './components/adminAuth/SignUp';
import SignIn from './components/adminAuth/SignIn'
import NaviBar from './Navigation/NaviBar';
import AdminHome from './components/adminHome/AdminHome'
import AddWriter from './components/addWriter/AddWriter';
import WriterData from './components/adminHome/WriterData';
import WriterHome from './components/writerHome/WriterHome'
import WriterSignIn from './components/writerHome/WriterSignIn'

function App() {
  return (
    <div className="app-content">
    <NaviBar />
    <div className="main-content-area">
    <Switch>
   <Route exact path='/' component={Home}/>
   <Route  path='/adminsignup' component={SignUp}/>
   <Route path='/adminsignin' component={SignIn} />
   <Route path='/adminhome' component={AdminHome} />
   <Route path='/addwriter' component={AddWriter}/>
   <Route path='/writerData' component={WriterData} />
   <Route path='/writerHome' component={WriterHome} />
   <Route path='/writesignin' component={WriterSignIn} />
   </Switch>
    </div>
    </div>
  );
}

export default App;
