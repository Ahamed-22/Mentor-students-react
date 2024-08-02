import React from "react";
import axios from "axios";
import { Avatar, List, Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { saveAllMentors } from "../redux/reducer/mentors.reducer";

export default function StudentsList() {
  const { students = {} } = useSelector((store) => store);
  const { mentors = {} } = useSelector((store) => store);
  const [addMentor, setAddMentor] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const dispatcher = useDispatch();
  const [size, setSize] = useState("medium"); // default is 'middle'
  // Modal function
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    handleAddMentor(studentId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch mentors list
  useEffect(() => {
    axios
      .get("https://mentor-students-react.onrender.com/mentors/")
      .then((response) => {
        dispatcher(saveAllMentors(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatcher]);

  // Get single mentor
  const handleGetUser = (_id) => {
    axios
      .get(`https://mentor-students-react.onrender.com/mentors/mentor/${_id}`)
      .then((response) => {
        let newMentor = response.data.data.name;
        if (!addMentor.includes(newMentor)) {
          setAddMentor((prev) => [...prev, newMentor]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get single student
  const getStudentId = (_id) => {
    let selectedStudent = students.students.find((student) => student._id === _id);
    setAddMentor(selectedStudent ? selectedStudent.mentors : []);
    setStudentId(_id);
    setIsModalOpen(true);
  };

  // Add mentor
  const handleAddMentor = (studentId) => {
    axios
      .patch(`https://mentor-students-react.onrender.com/students/update/${studentId}`, {
        mentors: addMentor,
      })
      .then((response) => {
        // Update the students list in the store without refreshing the page
        let updatedStudents = students.students.map((student) =>
          student._id === studentId ? { ...student, mentors: addMentor } : student
        );
        dispatcher({ type: "UPDATE_STUDENTS", payload: updatedStudents });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={students.students}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={
                <div className="col-md-12 d-flex align-items-center justify-content-center">
                  <div className="col-md-9">{item.name}</div>
                  <div className="col-md-3 d-flex align-items-center justify-content-center gap-2">
                    <Button
                      onClick={() => getStudentId(item._id)}
                      type="submit"
                      icon={<PlusOutlined />}
                      size={size}
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Add Mentor
                    </Button>
                  </div>
                </div>
              }
              description={
                <div className="">
                  {item.mentors.length !== 0 ? (
                    <p className="text-dark">
                      <span className="fs-6 text-dark">Mentors</span> :{" "}
                      {item.mentors.map((mentor, index) =>
                        index === item.mentors.length - 1 ? (
                          <span key={index} style={{ color: "red" }}>{mentor}</span>
                        ) : (
                          <span key={index}>{mentor} , </span>
                        )
                      )}
                    </p>
                  ) : (
                    <p className="text-dark">
                      <span className="fs-6 text-dark">No Mentors Available</span>
                    </p>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
      {/* Mentor modal */}
      <Modal
        style={{ marginTop: "-70px" }}
        title="Mentors"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <List
          itemLayout="horizontal"
          dataSource={mentors.mentors}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={
                  <div className="col-md-12 d-flex align-items-center justify-content-center">
                    <div className="col-md-9">{item.name}</div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                      <Button
                        onClick={() => handleGetUser(item._id)}
                        type="button"
                        icon={<PlusOutlined />}
                        size={size}
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                }
                description={<div className="-mb-3">{item.batchName}</div>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
}
