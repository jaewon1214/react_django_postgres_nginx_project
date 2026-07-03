import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";// 연동을 위해 Client

import { 
    productAllGetapi,
    productGetapi,
    productPostApi,
    productPutApi,
    productDeleteApi

} from "../apis/product.api";

import { retry } from "@reduxjs/toolkit/query";
import { ImTab } from "react-icons/im";

export const useAllGetProduct = () => {
    return useQuery({
        queryKey : ["products"], 
        queryFn : productAllGetapi
    })
}

export const useGetProduct = (id) => {
    return useQuery({
        queryKey : ["products", id], 
        queryFn : () => productGetapi(id), // 함수로 받음 : 이유는??
        enabled : !!id // id 와 !!id의 차이는?
    })
}

export const usePostRegisterProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : productPostApi,
        onSuccess : (dataObj) =>{
            queryClient.setQueryData(
                ["products"],
                (oldData=[]) => (
                    [
                        ...oldData,
                        dataObj
                    ]
                )
            );
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
        }
    })
}

export const usePutUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : productPutApi,
        onSuccess : (dataObj) =>{
            queryClient.setQueryData(
                ["products"],
                (old=[]) => (
                    old.map(item=>(
                        item.id === dataObj.id ?
                        dataObj : item
                    )) 
                )
            );
            queryClient.invalidateQueries({
                queryKey: ["products", dataObj.id]
            })
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : productDeleteApi,
        onSuccess : (id) =>{
            queryClient.setQueryData(
                ["products"],
                (old=[])=>(
                    old.filter(item=>(
                        item.id !== id
                    ))
                )
            );
            queryClient.removeQueries({
                queryKey: ["products", id]
            });
        }
    })
}

