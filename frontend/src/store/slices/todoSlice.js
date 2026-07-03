import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { todoAllGetApi, todoPostApi, todoPutApi, todoDeleteApi } from "../apis/todo.api";


export const todoAllGetSlice = createAsyncThunk(
    "todoAllGetSlice",
    async(_, thunkApi) => {
        try{
            return await todoAllGetApi();
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoPostSlice = createAsyncThunk(
    "todoPostSlice",
    async(dataObj, thunkApi) => {
        try{
            return await todoPostApi(dataObj);
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoPutSlice = createAsyncThunk(
    "todoPutSlice",
    async(dataObj, thunkApi) => {
        try{
            return await todoPutApi(dataObj);
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const todoToggleSlice = createAsyncThunk(
    "todoToggleSlice",
    async(dataObj, thunkAPI)=>{
        try {

            const newObj = {
                ...dataObj,
                checked: !dataObj.checked
            }

            return await todoPutApi(newObj);

        } catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const todoDeleteSlice = createAsyncThunk(
    "todoDeleteSlice",
    async(dataObj, thunkApi) => {
        try{
            return await todoDeleteApi(dataObj);
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


const initialObj = {subject : "", checked : false}

const initialState = {
  todoList : [],
  todoObj : initialObj,
  loading : false, 
  error : null
}

const todoSlice = createSlice({
    name : "todoSlice", 
    initialState,
    reducers : {
        change : (state, action) =>{
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name] : action.payload.value
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todoAllGetSlice.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(todoAllGetSlice.fulfilled, (state, action)=>{
                state.todoList = action.payload
                state.loading = false
            })
            .addCase(todoAllGetSlice.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload
            })

            .addCase(todoPostSlice.fulfilled, (state, action)=>{
                state.todoList = state.todoList.push(action.payload);
                state.loading = false
                state.todoObj = initialObj
            })

            .addCase(todoPutSlice.fulfilled, (state, action)=>{
                    const newObj = state.todoList.find(todo=>todo.id === action.payload.id)
                    state.todoList = state.todoList.map(todo=>(
                        todo.id === action.payload.id ?
                            action.payload : todo
                    ))
                    state.todoObj = newObj
            })

            .addCase(todoToggleSlice.fulfilled, (state, action) => {
                state.todoList  = state.todoList.map(todo=>(
                    todo.id === action.payload.id ?
                    {...todo, checked: !todo.checked}
                    : todo
                    ))
            })

            .addCase(todoDeleteSlice.fulfilled, (state, action)=>{
                state.todoList = state.todoList.filter(todo=>
                    (todo.id !== action.payload)
                )
                state.loading = false
            })
    }
})


export const {remove, Updata, Toggle, change, Register} = todoSlice.actions;
export default todoSlice.reducer;