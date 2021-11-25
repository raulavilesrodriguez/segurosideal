import React, {Fragment, useState} from 'react';
import Navegador from './Navbar';
import Pie from './Footer';
import Sidebar from './Sidebar';

export const Layout = ({children}) =>{
    const [showSidebar, setshowSidebar] = useState(false);
    return(
        <Fragment>
            <Navegador 
                setshowSidebar={setshowSidebar}
            />
            <Sidebar showSidebar={showSidebar} setshowSidebar={setshowSidebar}/>
            <main className="main">{children}</main>
            <Pie />
        </Fragment>
    )
};