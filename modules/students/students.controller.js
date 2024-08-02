const studentRouter = require("express").Router();
const student = require("./students.model");
const { Types } = require("mongoose");

// 1.create a Student
//http://localhost:3000/students/create
studentRouter.post("/create", async (req, res) => {
  const newStudent = new student(req.body);
  try {
    const response = await student.create(newStudent);
    console.log(response);
    return res.status(201).json({
      message: "Student create Success!",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Student create failed",
      error,
    });
  }
});

// 2.Get all Student
// http://localhost:3000/students/

studentRouter.get("/", async (req, res) => {
  try {
    const response = await student.find();
    console.log(response);
    return res.json({
      message: "Student list Success",
      data: response,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Student list failed",
      error,
    });
  }
});

// 3.Get Single Student
// http://localhost:3000/students/student/:studentId
studentRouter.get("/student/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const response = await student.findOne({
      _id: new Types.ObjectId(studentId),
    });
    if (response) {
      return res.status(200).json({
        message: "Student found",
        data: response,
      });
    } else {
      return res.status(404).json({
        message: "student not found",
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});


// 4.Update a User
// http://localhost:3000/students/update/:studentId
studentRouter.patch("/update/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const response = await student.updateOne(
      {
        _id: new Types.ObjectId(studentId),
      },
      {
        $set: req.body,
      },
      {
        new: true,
        projection: {
          _id: 0,
        },
      }
    );
    if (response) {
      return res.status(200).json({
        message: "Student updated success!",
        data: response,
      });
    } else {
      return res.status(404).json({
        message: "student not found",
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});


module.exports = studentRouter;
