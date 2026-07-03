import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";// 연동을 위해 Client

import { 
    todoAllGetApi,
    todoGetApi,
    todoPostApi,
    todoPutApi,
    todoDeleteApi
 } from "../apis/todo.api";

import { retry } from "@reduxjs/toolkit/query";
import { ImTab } from "react-icons/im";
import { data } from "react-router-dom";

export const useAllGetTodo = () => {
    return useQuery({
        queryKey : ["todos"], 
        queryFn : todoAllGetApi
    })
}

export const useGetTodo = (id) => {
    return useQuery({
        queryKey : ["todos", id], 
        queryFn : () => todoGetApi(id), // 함수로 받음 : 이유는??
        enabled : !!id // id 와 !!id의 차이는?
    })
}

export const usePostRegisterTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : todoPostApi,
        onSuccess : (dataObj) =>{
            queryClient.setQueryData(
                ["todos"],
                (oldData=[]) => (
                    [
                        ...oldData,
                        dataObj
                    ]
                )
            );
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}

export const usePutUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : todoPutApi,
        onSuccess : (dataObj) =>{
            queryClient.setQueryData(
                ["todos"],
                (old=[]) => (
                    old.map(item=>(
                        item.id === dataObj.id ?
                        dataObj : item
                    )) 
                )
            );
            queryClient.invalidateQueries({
                queryKey: ["todos", dataObj.id]
            })
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}

/*export const usePutToggleTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : todoPutApi,
        onSuccess : (dataObj) =>{
            queryClient.setQueryData(
                ["todos"],
                (old=[]) => (
                    old.map(item=>(
                        item.id === dataObj.id ?
                        {...dataObj, checked : !dataObj.checked} 
                        : item
                    )) 
                )
            );
            queryClient.invalidateQueries({
                queryKey: ["todos", dataObj.id]
            })
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}
*/
export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todoDeleteApi,
        onSuccess: (id) => {
            queryClient.setQueryData(["todos"], (old = []) =>
                old.filter(item => item.id !== id)
            );

            queryClient.removeQueries({
                queryKey: ["todo", id]
            });
        }
    });
};

