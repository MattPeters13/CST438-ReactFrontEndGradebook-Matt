import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import { toast } from 'react-toastify';

const AddAssignment = (props) => {
    const [open, setOpen] = React.useState(false);

    const [assignment, setAssignment] = React.useState({assignmentId: '', assignmentName: '', dueDate: '', needsGrading: ''});

    const handleChange = (e) => {
        setAssignment({...assignment, [e.target.name]:e.target.value})
    }
   
    const CloseModal = () => {
        setOpen(false);
    }

    const OpenModal = () => {
        setOpen(true);
    }
    const submitProblem = (attempt, alias) => {
    fetch('http://localhost:8081/assignment/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              assingmentId: assignment.assignmentId,
              assignmentName: assignment.assignmentName,
              DueDate: assignment.dueDate,
              needsGrading: assignment.needsGrading   
            })
            
          })
          .then(response => response.json() )
          .then(responseData => {
            toast.success("Added to database",{
                position: toast.POSITION.BOTTOM_LEFT
           });
          })
          .catch(err => console.error(err))
          toast.success("Added to database",{
            position: toast.POSITION.BOTTOM_LEFT
       });
          setOpen(false);
      }

    return(
    <div>
        <Button style={{marginTop:5}} variant="contained" color="primary" onClick={OpenModal}>
            Add Assignment</Button>

        <Dialog open={open} onClose={CloseModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New</DialogTitle>
            <DialogContent>
                {/* <TextField autoFocus margin="dense" value={assignment.assignmentName} onChange={handleChange} name="assignmentname" label="Title" fullWidth /> */}
                <TextField autoFocus margin="dense" value={assignment.assignmentName} onChange={handleChange} name="assignmentName" label="Assignment Name" fullWidth />
                <TextField autoFocus margin="dense" value={assignment.assignmentId} onChange={handleChange} name="assignmentId" label="Assignment ID" fullWidth />
                <TextField autoFocus margin="dense" value={assignment.dueDate} onChange={handleChange} name="dueDate" label="Due Date" fullWidth />
                <TextField autoFocus margin="dense" value={assignment.needsGrading} onChange={handleChange} name="needsGrading" label="Needs Grading (1/0)" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={submitProblem} color="primary">
                    Add
                </Button>
                <Button onClick={CloseModal} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    </div>
    );
    
}

export default AddAssignment;