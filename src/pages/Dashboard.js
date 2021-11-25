import React, {Fragment, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, UserInfo } from '../slices/User';
import {customersSelector, getcustomers} from '../slices/Getcustomers';
import {relatedplans, plancustomersSelector} from '../slices/RelatedPlans';
import {get_contacts, contactSelector} from '../slices/Contacts';
import {Dashboardmodal} from '../components/ModalDashboard';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import { TableHead } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {TablePaginationActions} from '../components/PaginationDashboard';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
  } from "recharts";

export const Dashboard = () =>{
    const dispatch = useDispatch();
    const token = localStorage.getItem('token'); 
    const [modalShow, setModalShow] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    useEffect(() => {
        if (localStorage.getItem('token') !==null) {
            dispatch(UserInfo({token: localStorage.getItem('token')}));
        }
    }, [dispatch]);

    const {pk} = useSelector(userSelector);

    useEffect(() => {
        if (pk) {
            dispatch(getcustomers({pk, token}));
            dispatch(relatedplans({pk, token})); 
            dispatch(get_contacts({pk, token}));
        }
    }, [dispatch, pk, token]);

    const {customers, loadingCustomers, successCustomers, errorsCustomers} = useSelector(customersSelector);

    var total = 0;
    for (let i = 0; i < customers.length; i++) {
        total += customers[i].profit;
    };
    total = total.toFixed(2);

    var age = 0;
    for(let i=0; i<customers.length; i++) {
        age += customers[i].age;
    };
    age = (age/customers.length).toFixed(1);

    var payment = 0;
    for(let i=0; i<customers.length; i++) {
        payment += customers[i].payment;
    };
    payment = (payment/customers.length).toFixed(2);
    
    var coverage = 0;
    var longuitud = 0;
    var coverageAverage = 0;
    for(let i=0; i<customers.length; i++) {
        for(let j=0; j<customers[i].planes.length; j++) {
            coverage += customers[i].planes[j].coverage;
        };
        longuitud += customers[i].planes.length;
    };
    coverageAverage = (coverage/longuitud).toFixed(0);
    var today = new Date().toLocaleDateString();

    const handleShow = () =>{
        setModalShow(true);
    };

    const handleClose = () => setModalShow(false);

    // Table. Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    
    const {PlanCustomers, successPlanCustomers} = useSelector(plancustomersSelector);
    const {contacts} = useSelector(contactSelector);
    
    var eficiencia = (customers.length*100/contacts.length).toFixed(0);
    console.log('Customer on Plan', successPlanCustomers);
    console.log('Customer on Plan', PlanCustomers);

    return(
        <div className="container customers">
            {loadingCustomers === true && <h2>Loading Dashboard...</h2>}
            {successCustomers === true ? (
                <Fragment>
                    <div className="row int-dashboard">
                        <div className="col">
                            <Box
                                className="dashboard-chart"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1, 
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h3 className="title-dashboard">Profit over Time</h3>
                                    <ResponsiveContainer width="95%" height={210}>
                                    <LineChart
                                        //width={600}
                                        //height={210}
                                        data={customers}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="timecustomer" padding={{ left: 30, right: 30 }}/>
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="profit"
                                            stroke="#E02401"
                                            activeDot={{ r: 8 }}
                                        />  
                                    </LineChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </Box>
                        </div>
                        <div className="col">
                            <Box
                                className="dashboard-indicators"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 320,
                                    height: 250,
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h3 className="title-dashboard">Profit</h3>
                                    <div className="div-indicators">
                                        <h1>${total}/year</h1>
                                        <p>on {today}</p>
                                    </div>
                                    <Button onClick={()=>handleShow()} className="btn-indicators">
                                            Indicators
                                    </Button>
                                </Paper>
                            </Box>
                        </div>
                    </div>
                    <div className="row int-dashboard">
                        <div className="col-lg-12">
                            <Box
                                className="dashboard-table"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1,
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h3 className="title-dashboard">Customers</h3>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="head-table" align="center">Name</TableCell>
                                                    <TableCell className="head-table" align="center">Payment (USD)</TableCell>
                                                    <TableCell className="head-table" align="center">Age (Years)</TableCell>
                                                </TableRow>                                               
                                            </TableHead>
                                            <TableBody>
                                            {(rowsPerPage > 0
                                                ? customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : customers
                                            ).map((row) => (
                                                <TableRow key={row.id} className="table-body-dash">
                                                <TableCell style={{ width: 100 }} align="center">
                                                    {row.contacto}
                                                </TableCell>
                                                <TableCell style={{ width: 100 }} align="center">
                                                    {row.payment}
                                                </TableCell>
                                                <TableCell style={{ width: 100 }} align="center">
                                                    {row.age}
                                                </TableCell>
                                                </TableRow>
                                            ))}

                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                            </TableBody>
                                            <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                rowsPerPageOptions={[5]}
                                                colSpan={3}
                                                count={customers.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: {
                                                    'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Box>
                        </div>
                    </div>
                    
                    <div className="row int-dashboard eficiencia-dashboard">
                        <div className="col">
                            <Box
                                className="dashboard-chart"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1, 
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h3 className="title-dashboard">Customer Contracts on each Plan</h3>
                                    <ResponsiveContainer width="95%" height={210}>
                                        <BarChart
                                            //width={500}
                                            //height={300}
                                            data={PlanCustomers}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5
                                            }}
                                            >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="plan" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="customers" fill="#3E065F" />
                                        
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </Box>
                        </div>
                        <div className="col">
                            <Box
                                className="dashboard-indicators"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 320,
                                    height: 250,
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h3 className="title-dashboard">Efficiency</h3>
                                    <div className="div-indicators">
                                        <h1>{eficiencia}%</h1>
                                        <p>on {today}</p>
                                        <ul className="list-dashboard">
                                            <li>😆Customers: {customers.length}</li>
                                            <li>🙈Contacts: {contacts.length}</li>
                                        </ul>
                                    </div>
                                </Paper>
                            </Box>
                        </div>
                    </div>
                    <Dashboardmodal 
                        show={modalShow}
                        onHide={handleClose}
                        age = {age}
                        payment = {payment}
                        coverage = {coverageAverage}
                    />
                </Fragment>
            ):(
                <Fragment>
                    {errorsCustomers === true && <h2>Error to load this Dashborad</h2>}
                </Fragment>
            )}
        </div>
    )
};