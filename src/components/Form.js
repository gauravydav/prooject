import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import necessary components from Formik library
import * as Yup from 'yup'; // Import Yup for validation
import { useDispatch,useSelector } from 'react-redux';
import { addData } from '../store/dataSlice';
import { setData } from "../store/dataSlice";
import axios from "axios";

function DataForm() {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.dataList.dataList);

  // Define initial form values
  const initialValues = {
    name: '',
    mobileNumber: '',
    emailId: '',
    dob: '',
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').matches(/^[a-zA-Z0-9]+$/, 'Name should not contain special characters'),
    mobileNumber: Yup.string().required('Mobile Number is required').matches(/^[6-9]\d{9}$/, 'Invalid Mobile Number'),
    emailId: Yup.string().required('emailId is required').email('Invalid emailId'),
    dob: Yup.string().required('Date of Birth is required').matches(/^\d{2}-\d{2}-\d{4}$/, 'Invalid Date of Birth (DD-MM-YYYY)'),
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    handleAdd(values)
    dispatch(addData(values)); // Dispatch action to add data to Redux store
    resetForm(); // Reset form fields after submission
  };
// Function to handle adding new data
const handleAdd = (newData) => {
    console.log(newData)
    // Add data on the server
    axios.post("http://192.168.1.6:8083/add-phone-book", newData)
      .then(response => {
        // Update Redux store with added data
        dispatch(setData([...dataList, response.data]));
      })
      .catch(error => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <div>
      <h2>Add Data</h2>
      {/* Formik component to manage form state */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            {/* Input fields for name */}
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            {/* Input fields for mobile number */}
            <div>
              <label htmlFor="mobileNumber">Mobile Number</label>
              <Field type="text" id="mobileNumber" name="mobileNumber" />
              <ErrorMessage name="mobileNumber" component="div" className="error" />
            </div>
            {/* Input fields for emailId */}
            <div>
              <label htmlFor="emailId">emailId</label>
              <Field type="text" id="emailId" name="emailId" />
              <ErrorMessage name="emailId" component="div" className="error" />
            </div>
            {/* Input fields for date of birth */}
            <div>
              <label htmlFor="dob">Date of Birth (DD-MM-YYYY)</label>
              <Field type="text" id="dob" name="dob" />
              <ErrorMessage name="dob" component="div" className="error" />
            </div>
            {/* Submit button */}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DataForm;
