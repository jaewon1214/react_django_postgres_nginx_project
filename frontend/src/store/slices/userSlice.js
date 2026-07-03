import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userLoginApi, userRegisterApi } from "../apis/user.api"

export const userLoginSlice = createAsyncThunk(
    "userLoginSlice",
    async (userObj, thunkapi) => {
        try{
            const user = await userLoginApi(userObj)
            localStorage.setItem("user", JSON.stringify(user))
            alert("성공")
            return user //payload
        }catch(error){
            return thunkapi.rejectWithValue(error.message)
        }
    }
)

export const userRegisterSlice = createAsyncThunk(
    "userRegisterSlice",
    async (userObj, thunkapi) => {
        try{
            const user = await userRegisterApi(userObj)
            return user //payload
        }catch(error){
            return thunkapi.rejectWithValue(error.message)
        }
    }
)


export const userLogOutSlice = createAsyncThunk(
    "userLogOutSlice",
    async (_, thunkapi) => {
        try{
            localStorage.removeItem("user")
        }catch(error){
            return thunkapi.rejectWithValue(error.message)
        }
    }
)

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

const initialState = {
  userList : [],
  username : {},
  islogin : false,
  loading : false,
  error : null
}

const userSlice = createSlice({
    name : "userSlice",
    initialState,
    extraReducers : (builder) => {
        builder
            .addCase(userLoginSlice.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(userLoginSlice.fulfilled, (state, action)=>{
                const user = getUser();
                
                console.log("user", user)
                console.log("confirmuser", JSON.stringify(action.payload))
                if(user.username === action.payload.username
                    && user.password === action.payload.password
                ){
                    state.islogin = true
                    state.user = action.payload
                }
                state.loading = false
            })
            .addCase(userLoginSlice.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(userRegisterSlice.fulfilled, (state, action)=>{
                state.userList = [
                    ...state.userList,
                    action.payload
                ]
                state.islogin = false
                state.loading = false
            })
            .addCase(userLogOutSlice.fulfilled, (state, action)=>{
                state.user = {}
                state.islogin = false
                state.loading = false
            })
    }
})

export default userSlice.reducer;