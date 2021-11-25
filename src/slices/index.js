import { combineReducers } from 'redux'
import loginReducer from './login'
import userRedurcer from './User'
import signupReducer from './Signup'
import newcontactReducer from './New_contact'
import contactsReducer from './Contacts'
import get_contactReducer from './Contact'
import plansReducer from './Plans'
import newcustomerReducer from './Newcustomer'
import getcustomerReducer from './Getcustomer'
import customersReducer from './Getcustomers'
import putcontactReducer from './PutContact'
import deletecontactReducer from './DeleteContact'
import putcustomerReducer from './PutCustomer'
import deletecustomerReducer from './DeleteCustomer'
import graphcontactsReducer from './GraphContacts'
import relatedplansReducer from './RelatedPlans'

// contacts, new_contact tienen que coincidir con el name: en los slices
const rootReducer = combineReducers({
    login: loginReducer,
    user: userRedurcer,
    signup: signupReducer,
    new_contact: newcontactReducer,
    contacts: contactsReducer,
    contact: get_contactReducer,
    plans: plansReducer,
    newcustomer: newcustomerReducer,
    getcustomer: getcustomerReducer,
    getcustomers: customersReducer,
    putcontact: putcontactReducer,
    deletecontact: deletecontactReducer,
    putcustomer: putcustomerReducer,
    deletecustomer: deletecustomerReducer,
    graphcontacts: graphcontactsReducer,
    plancustomers: relatedplansReducer,
})

export default rootReducer;