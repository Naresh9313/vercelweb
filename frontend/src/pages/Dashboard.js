import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Dashboard() {
  const token = localStorage.getItem("token");

  const initialValues = {
    ename: "",
    edate: "",
    evenues: "",
    eprice: "",
    elocation: "",
    category: "",
    eimage: "",
  };

  const validationSchema = Yup.object({
    ename: Yup.string().required("Required"),
    edate: Yup.string().required("Required"),
    evenues: Yup.string().required("Required"),
    eprice: Yup.number().required("Required"),
    elocation: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("ename", values.ename);
      formData.append("edate", values.edate);
      formData.append("evenues", values.evenues);
      formData.append("eprice", values.eprice);
      formData.append("elocation", values.elocation);
      formData.append("category", values.category);
      formData.append("eimage", values.eimage);

      const res = await axios.post(
        "https://nareshprajapati9313.onrender.com/event/addEvent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event Added Successfully");
      console.log(res.data);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Add Event</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label>Event Name</label>
              <Field className="form-control" name="ename" />
              <ErrorMessage name="ename" className="text-danger" component="div" />
            </div>

            <div className="mb-3">
              <label>Date</label>
              <Field className="form-control" name="edate" type="date" />
              <ErrorMessage name="edate" className="text-danger" component="div" />
            </div>

            <div className="mb-3">
              <label>Venue</label>
              <Field className="form-control" name="evenues" />
              <ErrorMessage name="evenues" className="text-danger" component="div" />
            </div>

            <div className="mb-3">
              <label>Price</label>
              <Field className="form-control" name="eprice" type="number" />
              <ErrorMessage name="eprice" className="text-danger" component="div" />
            </div>

            <div className="mb-3">
              <label>Location</label>
              <Field className="form-control" name="elocation" />
              <ErrorMessage name="elocation" className="text-danger" component="div" />
            </div>

            <div className="mb-3">
              <label>Category</label>
              <Field className="form-control" name="category" />
              <ErrorMessage name="category" className="text-danger" component="div" />
            </div>

            <div className="mb-3">
              <label>Event Image</label>
              <input
                type="file"
                className="form-control"
                name="eimage"
                onChange={(e) => setFieldValue("eimage", e.target.files[0])}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Event
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Dashboard;
