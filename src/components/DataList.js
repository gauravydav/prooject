import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, updateData } from "../store/dataSlice";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Button } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom"; 

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const today = new Date();
  const diff = today - dobDate;
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function DataList() {
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [updatedData, setUpdatedData] = useState([]);
  // const dataList = useSelector((state) => state.dataList.dataList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = () => {
    axios.get("http://localhost:5000/get-all-entries")
      .then(response => {
        dispatch(setData(response.data));
        setUpdatedData(response.data);
      })
      .catch(error => {
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
    setEditedData(itemToEdit || {});
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/update-phone-book/${editableItemId}`, editedData)
      .then(response => {
        dispatch(updateData({ _id: editableItemId, newData: response.data }));
        // dispatch(setData(response.data));
        fetchData();
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });

    setEditableItemId(null);
    setEditedData({});
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete-phone-book/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error("Error deleting data:", error);
      });
  };const handleAddInfo = () => {
    navigate('/');
  };

  if (updatedData.length <= 0) {
    return <h1>Helloooo</h1>;
  }

  return (
    <div>
      <h2>Data List</h2>
      <Button variant="contained" color="primary" onClick={handleAddInfo}>
        Add Info
      </Button>
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
              ? updatedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : updatedData
            ).map((data) => (
              <TableRow key={data._id}>
                <TableCell>
                  {editableItemId === data._id ? (
                    <Input
                      value={editedData.name || ''}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    />
                  ) : (
                    data.name || ''
                  )}
                </TableCell>
                <TableCell>
                  {editableItemId === data._id ? (
                    <Input
                      value={editedData.mobileNumber || ''}
                      onChange={(e) => setEditedData({ ...editedData, mobileNumber: e.target.value })}
                    />
                  ) : (
                    data.mobileNumber || ''
                  )}
                </TableCell>
                <TableCell>
                  {editableItemId === data._id ? (
                    <Input
                      value={editedData.emailId || ''}
                      onChange={(e) => setEditedData({ ...editedData, emailId: e.target.value })}
                    />
                  ) : (
                    data.emailId || ''
                  )}
                </TableCell>
                <TableCell>{calculateAge(data.dob)}</TableCell>
                <TableCell>
                  {editableItemId === data._id ? (
                    <Button onClick={handleSave}>Save</Button>
                  ) : (
                    <>
                      <Button onClick={() => handleEdit(data._id)}>Edit</Button>
                      <Button onClick={() => handleDelete(data._id)}>Delete</Button>
                    </>
                  )}
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
    </div>
  );
}

export default DataList;
