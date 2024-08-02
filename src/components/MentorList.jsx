import React from "react";
import axios from "axios";
import { Avatar, List, Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { saveAllStudents } from "../redux/reducer/students.reducer";

export default function MentorList() {
  const { students = {} } = useSelector((store) => store);
  const { mentors = {} } = useSelector((store) => store);
  const [addStudent, setAddStudent] = useState([]);
  const [mentorId, setMentorId] = useState(null);
  const dispatcher = useDispatch();
  const [size, setSize] = useState("medium"); // default is 'middle'
  // Modal function
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    handleAddStudent(mentorId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch students list
  useEffect(() => {
    axios
      .get("http://localhost:3000/students/")
      .then((response) => {
        dispatcher(saveAllStudents(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatcher]);

  // Get single student
  const handleGetStudent = (_id) => {
    axios
      .get(`http://localhost:3000/students/student/${_id}`)
      .then((response) => {
        let newStudent = response.data.data.name;
        if (!addStudent.includes(newStudent)) {
          setAddStudent((prev) => [...prev, newStudent]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get single mentor
  const getMentorId = (_id) => {
    setIsModalOpen(true);
    setMentorId(_id);
  };

  // Add student
  const handleAddStudent = (mentorId) => {
    // Get current students of the mentor
    const currentMentor = mentors.mentors.find((mentor) => mentor._id === mentorId);
    const currentStudents = currentMentor ? currentMentor.students : [];

    // Combine current students with new students
    const updatedStudents = [...new Set([...currentStudents, ...addStudent])];

    axios
      .patch(`http://localhost:3000/mentors/update/${mentorId}`, {
        students: updatedStudents,
      })
      .then((response) => {
        // Update the mentors list in the store without refreshing the page
        let updatedMentors = mentors.mentors.map((mentor) =>
          mentor._id === mentorId ? { ...mentor, students: updatedStudents } : mentor
        );
        dispatcher({ type: "UPDATE_MENTORS", payload: updatedMentors });
        setAddStudent([]); // Clear the added students list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
                  <div className="col-md-3 d-flex align-items-center justify-content-center gap-2">
                    <Button
                      onClick={() => getMentorId(item._id)}
                      type="submit"
                      icon={<PlusOutlined />}
                      size={size}
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Add Students
                    </Button>
                  </div>
                </div>
              }
              description={
                <div className="">
                  {item.students.length !== 0 ? (
                    <p className="text-dark">
                      <span className="fs-6 text-dark">Students</span> :{" "}
                      {item.students.map((student, index) =>
                        index === item.students.length - 1 ? (
                          <span key={index} style={{ color: "red" }}>{student}</span>
                        ) : (
                          <span key={index}>{student} , </span>
                        )
                      )}
                    </p>
                  ) : (
                    <p className="text-dark">
                      <span className="fs-6 text-dark">No Students</span>
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
        title="Students"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                      <Button
                        onClick={() => handleGetStudent(item._id)}
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
