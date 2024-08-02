import React, { useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { saveAllMentors } from "../../redux/reducer/mentors.reducer";
import MentorList from "../../components/MentorList";

export default function Mentors() {
  const { students = {} } = useSelector((store) => store);
  const dispatcher = useDispatch();

  useEffect(() => {
    axios
      .get("https://mentor-students-react.onrender.com/mentors/")
      .then((response) => {
        dispatcher(saveAllMentors(response.data));
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
            MentorName: "",
            students: [],
          }}
          onSubmit={(values, { resetForm }) => {
            axios
              .post("https://mentor-students-react.onrender.com/mentors/create", {
                name: values.MentorName,
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
                  Enter Mentor Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="MentorName"
                  id="MentorName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.MentorName}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mb-3"
              >
                Add Mentor
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div className="row">
          <div className="col-md-12">
            <MentorList />
          </div>
      </div>
    </div>
  );
}
