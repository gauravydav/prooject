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
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginRight: 10,
    width: 120,
    textAlign: "right",
  },
  error: {
    color: "red",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  centered: {
    textAlign: "center",
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
      .matches(
        /^[a-zA-Z0-9\s]+$/,
        "Name should not contain special characters"
      ),
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
      .post("http://localhost:5001/add-phone-book", newData)
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
        <Typography variant="h5" component="div" style={styles.centered}>
          Add Data
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form style={styles.form}>
              <Box style={{ ...styles.inputContainer, ...styles.centered }}>
                <label htmlFor="name" style={styles.label}>
                  Name:
                </label>
                <Field
                  as={TextField}
                  type="text"
                  id="name"
                  name="name"
                  size="small"
                  fullWidth
                />
              </Box>
              <ErrorMessage
                name="name"
                component="div"
                className="error"
                style={styles.error}
              />

              <Box style={{ ...styles.inputContainer, ...styles.centered }}>
                <label htmlFor="mobileNumber" style={styles.label}>
                  Contact no.:
                </label>
                <Field
                  as={TextField}
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  size="small"
                  fullWidth
                />
              </Box>
              <ErrorMessage
                name="mobileNumber"
                component="div"
                className="error"
                style={styles.error}
              />

              <Box style={{ ...styles.inputContainer, ...styles.centered }}>
                <label htmlFor="emailId" style={styles.label}>
                  Email:
                </label>
                <Field
                  as={TextField}
                  type="text"
                  id="emailId"
                  name="emailId"
                  size="small"
                  fullWidth
                />
              </Box>
              <ErrorMessage
                name="emailId"
                component="div"
                className="error"
                style={styles.error}
              />

              <Box style={{ ...styles.inputContainer, ...styles.centered }}>
                <label htmlFor="dob" style={styles.label}>
                  DOB:
                </label>
                <Field
                  as={TextField}
                  type="date"
                  id="dob"
                  name="dob"
                  size="small"
                  fullWidth
                />
              </Box>
              <ErrorMessage
                name="dob"
                component="div"
                className="error"
                style={styles.error}
              />

              <Box style={styles.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewTable}
                >
                  View Table
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default DataForm;
