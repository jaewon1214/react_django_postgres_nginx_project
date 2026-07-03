import {rootApi} from "../apis/root.api.js"



export const employeeAllGetapi = async () =>{
    try{
        const response = await rootApi.get("/employees/");
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const employeeGetapi = async (id) =>{
    try{
        const response = await rootApi.get(`/employees/${id}/`);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const employeePostApi = async (dataObj) =>{
    try{
        const response = await rootApi.post("/employees/", dataObj);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const employeePutApi = async (dataObj) =>{
    try{
        const response = await rootApi.put(`/employees/${dataObj.id}/`, dataObj);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const employeeDeleteApi = async (id) =>{
    try{
        await rootApi.delete(`/employees/${id}/`);
        return id;
    }catch(error){
        return new Error(error);
    }
}