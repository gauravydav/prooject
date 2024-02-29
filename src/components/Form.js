import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addData } from '../store/dataSlice';

function DataForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    mobileNumber: '',
    email: '',
    dob: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').matches(/^[a-zA-Z0-9]+$/, 'Name should not contain special characters'),
    mobileNumber: Yup.string().required('Mobile Number is required').matches(/^[6-9]\d{9}$/, 'Invalid Mobile Number'),
    email: Yup.string().required('Email is required').email('Invalid Email'),
    dob: Yup.string().required('Date of Birth is required').matches(/^\d{2}-\d{2}-\d{4}$/, 'Invalid Date of Birth (DD-MM-YYYY)'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addData(values));
    resetForm();
  };

  return (
    <div>
      <h2>Add Data</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="mobileNumber">Mobile Number</label>
              <Field type="text" id="mobileNumber" name="mobileNumber" />
              <ErrorMessage name="mobileNumber" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth (DD-MM-YYYY)</label>
              <Field type="text" id="dob" name="dob" />
              <ErrorMessage name="dob" component="div" className="error" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DataForm;
