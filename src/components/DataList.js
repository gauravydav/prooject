
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateData, deleteData } from "../store/dataSlice";

function DataList() {
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const dataList = useSelector((state) => state.dataList.dataList);

  const dispatch = useDispatch();
  console.log(dataList);
  if (!Array.isArray(dataList)) {
    return <div>Loading...</div>; 
  }

  const handleEdit = (id) => {
    setEditableItemId(id);
    const itemToEdit = dataList.find((data) => data.id === id);
    setEditedData(itemToEdit);
  };

  const handleSave = () => {
    dispatch(updateData({ id: editableItemId, newData: editedData }));
    setEditableItemId(null);
    setEditedData({});
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
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
            <th>Date of Birth</th>
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
                    value={editedData.email}
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                  />
                ) : (
                  data.email
                )}
              </td>
              <td>
                {editableItemId === data.id ? (
                  <input
                    type="text"
                    value={editedData.dob}
                    onChange={(e) =>
                      setEditedData({ ...editedData, dob: e.target.value })
                    }
                  />
                ) : (
                  data.dob
                )}
              </td>
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
