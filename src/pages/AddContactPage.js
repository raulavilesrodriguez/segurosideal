import {React} from 'react';
import AddContacts from '../components/AddContacts';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddContact = () => {

    return(
        <div className="container">
            <h1>New Contact</h1>
            <AddContacts />
        </div>
    )
};

export default AddContact;
