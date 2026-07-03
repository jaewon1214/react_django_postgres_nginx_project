import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { employeeAllGetapi, employeePostApi, employeePutApi, employeeDeleteApi } from "../apis/employee.api";



export const employeeAllGetSlice = createAsyncThunk(
    "employeeAllGetSlice",
    async(_, thunkApi) => {
        try{
            return await employeeAllGetapi();
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeePostSlice = createAsyncThunk(
    "employeePostSlice",
    async(dataObj, thunkApi) => {
        try{
            return await employeePostApi(dataObj);
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeePutSlice = createAsyncThunk(
    "employeePutSlice",
    async(dataObj, thunkApi) => {
        try{
            return await employeePutApi(dataObj);
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const employeeDeleteSlice = createAsyncThunk(
    "employeeDeleteSlice",
    async(dataObj, thunkApi) => {
        try{
            return await employeeDeleteApi(dataObj);
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const initialEmp = {
  id : '', name : '',email : '', job: '',pay : ''
}

const initialState = {
  empTable: [],
  emp: initialEmp,
  mode : '',
  selectedId: "",
  loading : false, 
  error : null
}

const employeeSlice = createSlice({
    name : "employeeSlice",
    initialState,
    reducers:{
        select : (state, action) => {
            state.selectedId = action.payload
        },
        set_emp : (state, action) =>{
            state.emp = action.payload
        },
        remove : (state, action) => {
            state.empTable = state.empTable.filter(emp =>
                emp.id !== state.selectedId
            )
        },
        setmode : (state, action) => {
            state.mode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
             .addCase(employeeAllGetSlice.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(employeeAllGetSlice.fulfilled, (state, action)=>{
                state.empTable = action.payload
                state.loading = false
            })
            .addCase(employeeAllGetSlice.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload
            })
             .addCase(employeePostSlice.fulfilled, (state, action)=>{
                state.empTable = [...state.empTable, action.payload]
                state.loading = false
            })
             .addCase(employeePutSlice.fulfilled, (state, action)=>{
                state.empTable = state.empTable.map(emp =>
                    emp.id === state.selectedId ?
                    action.payload : emp,
                )
                state.loading = false
            })
             .addCase(employeeDeleteSlice.fulfilled, (state)=>{
                state.empTable = state.empTable.filter(emp => (
                emp.id !== state.selectedId
                ))
                state.loading = false
            })
    }
})

export const {setmode, remove, update, register, set_emp, select} = employeeSlice.actions;
export default employeeSlice.reducer;