import React, { useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { saveAllStudents } from "../../redux/reducer/students.reducer";
import StudentsList from "../../components/StudentsList";

export default function Students() {
  const { students = {} } = useSelector((store) => store);
  const dispatcher = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/students/")
      .then((response) => {
        dispatcher(saveAllStudents(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="col-md-12 px-3">
        <Formik
          initialValues={{
            name: "",
            mentors: [],
          }}
          onSubmit={(values, { resetForm }) => {
            axios
              .post("http://localhost:3000/students/create", {
                name: values.name,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
            resetForm();
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Enter Student Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mb-3"
              >
                Add Student
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div className="row">
          <div className="col-md-12">
            <StudentsList />
          </div>
      </div>
    </div>
  );
}
