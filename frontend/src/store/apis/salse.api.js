import {rootApi} from "../apis/root.api.js"



export const salseAllGetapi = async () =>{
    try{
        const response = await rootApi.get("/sales/");
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const salseGetapi = async (id) =>{
    try{
        const response = await rootApi.get(`/sales/${id}/`);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const salsePostApi = async (dataObj) =>{
    try{
        const response = await rootApi.post("/sales/", dataObj);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const salsePutApi = async (dataObj) =>{
    try{
        const response = await rootApi.put(`/sales/${dataObj.id}/`, dataObj);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const salseDeleteApi = async (id) =>{
    try{
        await rootApi.delete(`/sales/${id}/`);
        return id;
    }catch(error){
        return new Error(error);
    }
}