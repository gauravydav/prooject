import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData,updateData } from "../store/dataSlice";
import axios from "axios";

// Function to calculate age from date of birth
function calculateAge(dob) {
  const dobDate = new Date(dob); // Convert date of birth string to Date object
  const today = new Date(); // Get current date
  const diff = today - dobDate; // Calculate difference in milliseconds
  const ageDate = new Date(diff); // Convert difference to Date object
  return Math.abs(ageDate.getUTCFullYear() - 1970); // Return absolute difference in years
}

function DataList() {
  const [editableItemId, setEditableItemId] = useState(null); // State for tracking editable item ID
  const [editedData, setEditedData] = useState({}); // State for tracking edited data
  const dataList = useSelector((state) => state.dataList.dataList); // Get data list from Redux store
  const dispatch = useDispatch(); // Initialize dispatch function for Redux actions

  useEffect(() => {
    // Fetch data from API when component mounts
    axios.get("http://192.168.1.6:8083/fetch-phone-book?page=0&pageLength=10")
      .then(response => {
        // Dispatch action to update Redux store with fetched data
        dispatch(setData(response.data));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  // Function to handle editing an item
  const handleEdit = (id) => {
    setEditableItemId(id); // Set the ID of the item being edited
    const itemToEdit = dataList.find((data) => data.id === id); // Find the item to edit
    setEditedData(itemToEdit); // Set the edited data
  };

  // Function to handle saving edited data
  const handleSave = () => {
    // Update data on the server
    console.log(editedData)
    dispatch(updateData({ id: editableItemId, newData: editedData }));
    axios.post("http://192.168.1.6:8083/update-phone-book", editedData)
      .then(response => {
     
        dispatch(setData(response.data));
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });

    setEditableItemId(null); // Clear editable item ID
    setEditedData({}); // Clear edited data
  };

  // Function to handle deleting an item
  const handleDelete = (id) => {
    // Delete data on the server
    dispatch(setData(dataList.filter(data => data.id !== id)));
    console.log(id)
    axios.delete(`http://192.168.1.6:8083/delete-phone-book/${id}`)
      .then(() => {
    
      
      })
      .catch(error => {
        console.error("Error deleting data:", error);
      });
  };

  
  return (
    <div>
      <h2>Data List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataList?.map((data) => (
            <tr key={data.id}>
              <td>
                {editableItemId === data.id ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                ) : (
                  data.name
                )}
              </td>
              <td>
                {editableItemId === data.id ? (
                  <input
                    type="text"
                    value={editedData.mobileNumber}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        mobileNumber: e.target.value,
                      })
                    }
                  />
                ) : (
                  data.mobileNumber
                )}
              </td>
              <td>
                {editableItemId === data.id ? (
                  <input
                    type="text"
                    value={editedData.emailId}
                    onChange={(e) =>
                      setEditedData({ ...editedData, emailId: e.target.value })
                    }
                  />
                ) : (
                  data.emailId
                )}
              </td>
              <td>{calculateAge(data.dob)}</td>
              <td>
                {editableItemId === data.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(data.id)}>Edit</button>
                    <button onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataList;
