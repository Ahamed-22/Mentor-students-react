import { createSlice } from '@reduxjs/toolkit'


export const studentsSlice = createSlice({
    name : "students" ,
    initialState : {
        isLoading : false,
        students : []
    },
    reducers : {
        saveAllStudents: (state, action) => {
            return {
              ...state,
              students: action.payload.data,
            };
          },
    }
})

export const { saveAllStudents } = studentsSlice.actions;
export default studentsSlice.reducer;