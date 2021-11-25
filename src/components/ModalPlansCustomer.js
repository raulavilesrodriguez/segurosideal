import React from "react";
import {
    Modal,
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';
import {styled} from '@material-ui/core/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: 'rgba(207, 198, 220, 1)',
  }));

export const ModalPlansCustomer = (props) => {
          const planes = props.planes;
    return(
        <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Contracted Plans 📑
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack  spacing={2}>
                    {planes.map(item =>(
                            <Item key={item.id}>Plan: {item.plan}</Item>
                    ))}
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modalbutton" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

