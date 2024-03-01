import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/dataSlice";
import { setData } from "../store/dataSlice";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const styles = {
  card: {
    maxWidth: 400,
    margin: "auto",
    marginTop: 50,
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};

function DataForm() {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.dataList.dataList);
  const navigate = useNavigate(); 

  const initialValues = {
    name: "",
    mobileNumber: "",
    emailId: "",
    dob: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z0-9]+$/, "Name should not contain special characters"),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number"),
    emailId: Yup.string()
      .required("Email is required")
      .email("Invalid emailId"),
    dob: Yup.date().required("Date of Birth is required"),
  });
  const handleViewTable = () => {
    navigate("/datalist");
  };

  const handleSubmit = (values, { resetForm }) => {
    const newDataWithoutId = { ...values };
    delete newDataWithoutId.id;

    handleAdd(newDataWithoutId);
   
    resetForm();
  };

  const handleAdd = (newData) => {
    axios
      .post("http://localhost:5000/add-phone-book", newData)
      .then((response) => {
        dispatch(setData([...dataList, response.data]));
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <Card style={styles.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          Add Data
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form style={styles.form}>
              <Box>
                <label htmlFor="name">Name</label>
                <Field
                  as={TextField}
                  type="text"
                  id="name"
                  name="name"
                  size="small"
                  fullWidth
                />
                <ErrorMessage name="name" component="div" className="error" />
              </Box>
              <Box>
                <label htmlFor="mobileNumber">Mobile Number</label>
                <Field
                  as={TextField}
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  size="small"
                  fullWidth
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="error"
                />
              </Box>
              <Box>
                <label htmlFor="emailId">Email</label>
                <Field
                  as={TextField}
                  type="text"
                  id="emailId"
                  name="emailId"
                  size="small"
                  fullWidth
                />
                <ErrorMessage
                  name="emailId"
                  component="div"
                  className="error"
                />
              </Box>
              <Box>
                <label htmlFor="dob">Date of Birth (DD-MM-YYYY)</label>
                <Field
                  as={TextField}
                  type="date"
                  id="dob"
                  name="dob"
                  size="small"
                  fullWidth
                />
                <ErrorMessage name="dob" component="div" className="error" />
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button variant="contained" color="primary" onClick={handleViewTable}>
                View Table
              </Button>
            </Form>
            
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default DataForm;
