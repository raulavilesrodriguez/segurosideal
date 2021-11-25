import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Layout} from './components/Layout';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddContact from './pages/AddContactPage';
import Signup from './pages/SignupPage';
import {PrivateRoute} from './helpers/PrivateRoute';
import { ContactProfile } from './pages/ContactProfile';
import {PlansPage} from './pages/PlansPage';
import {Dashboard} from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <PrivateRoute exact path='/' component={HomePage}/>
            <PrivateRoute exact path='/add_contact' component={AddContact} />
            <PrivateRoute exact path='/contact' component={ContactProfile}/>
            <PrivateRoute exact path='/plans' component={PlansPage}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <Redirect to='/login' />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
