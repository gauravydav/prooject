import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../store/dataSlice';

function Form() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error if field is updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Name validation: no blank space or special characters, mandatory
    if (!formData.name.trim() || /[^a-zA-Z0-9]/.test(formData.name)) {
      validationErrors.name = 'Name is required and should not contain special characters';
    }

    // Mobile number validation: length not more than 10, starts with 9, 8, 7, or 6
    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      validationErrors.mobileNumber = 'Mobile number should be 10 digits starting with 9, 8, 7, or 6';
    }

    // Email validation: should contain @ and dot
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    // Date of Birth validation: should be in DD-MM-YYYY format
    if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.dob)) {
      validationErrors.dob = 'Date of Birth should be in DD-MM-YYYY format';
    }

    // If there are validation errors, set them and stop form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Dispatch action to add data to Redux store
    dispatch(addData(formData));
    // Clear form fields
    setFormData({
      name: '',
      mobileNumber: '',
      email: '',
      dob: '',
    });
  };

  return (
    <div>
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p>{errors.name}</p>}
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
        {errors.mobileNumber && <p>{errors.mobileNumber}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="text"
          name="dob"
          placeholder="Date of Birth (DD-MM-YYYY)"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        {errors.dob && <p>{errors.dob}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
