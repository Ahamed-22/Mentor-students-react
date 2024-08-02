import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './reducer/students.reducer'
import mentorsReducer from './reducer/mentors.reducer'

export default configureStore({
    // Root reducer
    reducer : {
      students : studentsReducer,
      mentors : mentorsReducer
    }
})