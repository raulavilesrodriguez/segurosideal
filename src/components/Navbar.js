import React from 'react';
import {Hamburger} from '../assets/Hamburger';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navegador = ({setshowSidebar}) => {
  return (
    <header className="Navbar"> 
        <button
          title="Menu"
          onClick={() => {
            setshowSidebar((showSidebar) => !showSidebar);
            window.scrollTo(0, 0);
          }
          }
        >
          <Hamburger />
        </button>
        <h3 className="Navbar-title">Ideal Insurances</h3>  
    </header>
  );
};

export default Navegador;