import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData, updateData } from "../store/dataSlice";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const today = new Date();
  const diff = today - dobDate;
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function DataList() {
  const [editableItemId, setEditableItemId] = useState(null);
  const [dialogData, setDialogData] = useState({
    name: "",
    mobileNumber: "",
    emailId: "",
    dob: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [updatedData, setUpdatedData] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get("http://localhost:5001/get-all-entries")
      .then((response) => {
        dispatch(setData(response.data));
        setUpdatedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, editableItemId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    setEditableItemId(id);
    const itemToEdit = updatedData.find((data) => data._id === id);
    setDialogData(itemToEdit || {});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData({});
  };

  const handleSave = () => {
    axios
      .put(
        `http://localhost:5001/update-phone-book/${editableItemId}`,
        dialogData
      )
      .then((response) => {
        dispatch(updateData({ _id: editableItemId, newData: response.data }));
        fetchData();
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/delete-phone-book/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  if (updatedData.length <= 0) {
    return (
      <h1>
        Helloooo, please add something from <Link to="/">here</Link>
      </h1>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Data List</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          style={{ marginRight: "2rem" }}
        >
          Add Info
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? updatedData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : updatedData
            ).map((data) => (
              <TableRow key={data._id}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.mobileNumber}</TableCell>
                <TableCell>{data.emailId}</TableCell>
                <TableCell>{calculateAge(data.dob)}</TableCell>
                <TableCell>
                  <>
                    <Button onClick={() => handleEdit(data._id)}>Edit</Button>
                    <Button onClick={() => handleDelete(data._id)}>
                      Delete
                    </Button>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[3, 6, 9]}
        component="div"
        count={updatedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Name:</Typography>
              <Input
                value={dialogData.name || ""}
                onChange={(e) =>
                  setDialogData({ ...dialogData, name: e.target.value })
                }
                placeholder="Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Mobile Number:</Typography>
              <Input
                value={dialogData.mobileNumber || ""}
                onChange={(e) =>
                  setDialogData({ ...dialogData, mobileNumber: e.target.value })
                }
                placeholder="Mobile Number"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Email:</Typography>
              <Input
                value={dialogData.emailId || ""}
                onChange={(e) =>
                  setDialogData({ ...dialogData, emailId: e.target.value })
                }
                placeholder="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Age:</Typography>
              <Input
                value={calculateAge(dialogData.dob)}
                disabled
                placeholder="Age"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DataList;
