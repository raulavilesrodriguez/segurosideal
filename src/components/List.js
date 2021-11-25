import { useHistory } from 'react-router-dom';
import React, {useEffect, useState, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import {get_contacts, contactSelector} from '../slices/Contacts';
import { Pagination } from './Pagination';
import { paginateRows, filterRows } from '../helpers/PagSearch';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

export const List = ({pk, token, total}) => {
  console.log(pk);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showfilter, setShowFilter] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});

  const onClickFilter = () => setShowFilter(!showfilter);

  useEffect(() => {
    dispatch(get_contacts({pk, token}))
  }, [dispatch, pk, token]);
   
  const {contacts, loadingContacts, errorsContacts} = useSelector(contactSelector);

  total(contacts);
  
  const handleOnClick = (contact_id) => {
    history.push(`/contact/?contactid=${contact_id}`);
  };

    const columnas = [
      {clave: 'name', label: 'Contact Name'},
      {clave:'timestamp', label:'Registered'},
      {clave: 'iscustomer', label: 'Status'}
    ];

    // Pagination and filtering inspired by the blog of https://www.taniarascia.com/blog
    const filteredRows = useMemo(() => filterRows(contacts, filters), [contacts, filters])
    const rowsPerPage = 3;
    const count = filteredRows.length;
    const totalPages = Math.ceil(count / rowsPerPage);
    
    const calculatedRows = paginateRows(filteredRows, activePage, rowsPerPage);

    const handleSearch = (value, clave) => {
      setActivePage(1)
      if (value) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [clave]: value,
        }))
      } else {
        setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters }
          delete updatedFilters[clave]
  
          return updatedFilters
        })
      }
    };

    if(loadingContacts) return <p>Loading contacts...</p>
    if(errorsContacts) return <p>Unable to display your contacts</p>
    
    return(
      <Paper elevation={2}>
        <TableContainer component={Paper}>
          <div className="table-responsive-sm tabla-contacts">
            <div className="container search-table">
              <span onClick={onClickFilter}>Search🔎</span>  
            </div>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr className="tr-head">
                  {columnas.map(column =>{
                    return <th key={`${column.clave}-buscar`}>{column.label}</th>
                  })}
                </tr>
                {showfilter ? (
                <tr className="tr-contact">
                  {columnas.map(column => {
                    return (
                      <th key={`${column.clave}-search`} className="th-contact">
                        {column.clave !== 'iscustomer' ? (
                          <input
                            className="input-table"
                            type="search"
                            key={`${column.clave}-search`}
                            placeholder={`${column.label}`}
                            value={filters[column.clave] || ''}
                            onChange={(event) => handleSearch(event.target.value, column.clave)}
                          />
                        ):column.clave === 'iscustomer' ?(
                          <select onChange={(event) => handleSearch(event.target.value, column.clave)} className="select-table">
                            <option value=''>Choose</option>
                            <option value='true'>Is Customer</option>
                            <option value='false'> No Customer</option>
                          </select>
                        ) :(null)}
                      </th>
                      )
                  })}
                </tr>
                ):(
                  null
                )}
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  calculatedRows.map(contact => (
                    <tr onClick={() =>handleOnClick(contact.id)} className="tr-contact" key={contact.id}>
                      {columnas.map(column => {
                        return <td key={column.clave}>
                          {contact[column.clave] === true  ? (
                            <span className="badge bg-success">Customer</span>
                          ): contact[column.clave] === false ? (
                            <span className="badge bg-danger">No Customer</span>
                          ) : (
                            <span>{contact[column.clave]}</span>
                          )}
                        
                        </td>
                      })}
                    </tr>
                  ))
                ) :(
                  <tr>
                    <td colSpan={3}>You do not have registered Contacts</td>
                  </tr>
                )
                } 
              </tbody>
            </table>
            {count > 0 ? (
              <Pagination 
                activePage={activePage}
                count={count}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                setActivePage={setActivePage}
              />
            ) : (
              <p>Contact not found🙄</p>
            )
            }
  
          </div>
        </TableContainer>
      </Paper>
    )
}