import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, UserInfo, clearUser } from '../slices/User';

function setClass(showSidebar) {
    let clase = 'sidebar';
    console.log('probandoo', showSidebar);
    if (showSidebar === false) {
        clase = 'sidebar collapsed';
    } else {
        clase = 'sidebar';
    }
    return clase;
};


const Sidebar = ({showSidebar, setshowSidebar}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem('token');
        history.push('/login');
        setshowSidebar(false);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(UserInfo({token: localStorage.getItem('token')}));
        }
    }, [dispatch]);
    
    const {isSuccess, username } = useSelector(userSelector);
    console.log('Revisar token', localStorage.getItem('token'));
    console.log('Success usuario',isSuccess)

    const onClick = () =>{
        setshowSidebar(false);
    };

    return (
        <aside className={setClass(showSidebar)} id="sidebar">
            <section>
                <nav>
                    {isSuccess === true ? (
                    <Fragment>
                        <Link to='/' onClick={onClick}><i className="fas fa-home"></i> Home</Link>
                        <Link to='/add_contact' onClick={onClick}><i className="fas fa-user-plus"></i>New Contact</Link>
                        <Link to='/plans' onClick={onClick}><i className="fas fa-address-book"></i>Plans</Link>
                        <Link to='/dashboard' onClick={onClick}><i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                        <Link onClick={onLogout} to="#"><i className="far fa-hand-spock"></i>Logout</Link>
                    </Fragment>
                    ) : (
                    <Fragment>
                        <Link to='/login' onClick={onClick}><i className="fas fa-user-secret"></i>Login</Link>
                        <Link to='/signup' onClick={onClick}><i className="fas fa-signature"></i>Signup</Link>
                    </Fragment>
                    )}    
                </nav>
                <nav>
                    {isSuccess === true ? (
                    <Fragment>
                        <p>Signed in as: {username}</p>
                    </Fragment>
                    ) : (
                    <Fragment>
                        <p>Not signed in</p>
                    </Fragment>
                    )}
                </nav>
            </section>
        </aside>
    );
};

export default Sidebar;