import {rootApi} from "../apis/root.api.js"



export const productAllGetapi = async () =>{
    try{
        const response = await rootApi.get("/products/");
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const productGetapi = async (id) =>{
    try{
        const response = await rootApi.get(`/products/${id}/`);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const productPostApi = async (dataObj) =>{
    try{
        const response = await rootApi.post("/products/", dataObj);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const productPutApi = async (dataObj) =>{
    try{
        const response = await rootApi.put(`/products/${dataObj.id}/`, dataObj);
        return response.data
    }catch(error){
        return new Error(error);
    }
}

export const productDeleteApi = async (id) =>{
    try{
        await rootApi.delete(`/products/${id}/`);
        return id;
    }catch(error){
        return new Error(error);
    }
}