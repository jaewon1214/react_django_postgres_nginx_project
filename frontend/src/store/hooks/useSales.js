import { useAllGetUser } from "./uesUser"
import { useAllGetProduct } from "./useProduct"
import { salseAllGetapi } from "../apis/salse.api"
import { useQuery } from "@tanstack/react-query"

export const useAllGetSales = () => {
    return useQuery({
        queryKey : ["sales"], 
        queryFn : salseAllGetapi
    })
}

export const useGetSales = () => {
    const {data: userList = []} = useAllGetUser()
    const {data: productList = []} = useAllGetProduct()
    const {data: salseList = []} = useAllGetSales()
    const userObj = {}
   /* const userObj = Object.fromEntries(
        userList.map(item=>[item.id, item])
    )*/
   
   /* const productObj = Object.fromEntries(
        productList.map(item=>[item.id, item])
    )*/
    /*const rowData=useMemo(()=>{
        const rowData = Array.isArray(salseList) && salseList.map(item =>({
        ...item,
        user_name: userObj[String(item.user_id)].name || "알수없음",
        product_name: productObj[String(item.product_id)].product_name || "알수없음"
            }
        ))     
    },[userList, productList,salesList])
   */
    //Array.isArray(userList) &&
    userList?.forEach(item => {
    userObj[item.id] = item  
    })

    const productObj = {}
    //Array.isArray(productList) &&
    productList?.forEach(item => {
    productObj[item.id] = item  
    })

    const rowData = //Array.isArray(salseList) && 
    salseList?.map(item =>({
        ...item,
        user_name: userObj[String(item.user_id)]?.username || "알수없음",
        product_name: productObj[String(item.product_id)]?.product_name || "알수없음"
        }
    ))
    return rowData;
}

