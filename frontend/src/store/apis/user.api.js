import {rootApi} from "../apis/root.api.js"

export const userLoginApi = async (loginUser) => {

    try {

        const response = await rootApi.post(
            "/auth/login/",
            {
                username: loginUser.username,
                password: loginUser.password,
            }
        );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.detail ??
            "로그인에 실패했습니다."
        );

    }

};

export const userRegisterApi = async (userObj) => {
    try {
        const response = await rootApi.post(
            "/auth/register/",
            userObj
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ??
            error.response?.data?.detail ??
            "회원가입에 실패했습니다."
        );
    }
};

export const currentUserApi = async () => {

    const response = await rootApi.get("/auth/me/");

    return response.data;
};


export const userAllGetapi = async () =>{
    try{
        const response = await rootApi.get("/users/");
        return response.data
    }catch(error){
        return new Error(error);
    }
}



// export const userLoginApi = async (userObj) => { //쿼리 스트링? name = "john" 이 Obj 에선 {name : "john"}
//     try{
//         const response = await rootApi.get(
//             `/user?name=${userObj.username}`); /*쿼리 스트링 user table에 접근해서 name 이 user.username인 것을 찾아라 리스트로 전달 id는 유니크 하지만 이름은 아니기때문에*/
//             const users = response.data
//         if(!users.length) {
//             throw new Error("존재하지 않는 유저 사용자")
//         }
//         const founduser = users[0]; //리스트로 오기때문에 인덱스 번호
//
//         if(founduser.password !== userObj.password){
//             throw new Error(
//                 "비밀번호가 일치하지 않습니다."
//             );
//         }
//         return founduser
//     }catch(error){
//         throw new Error(error.message);
//
//     }
// }

// export const userRegisterApi = async (userObj) => {
//     try{
//         const response = await rootApi.get(`/user?name=${userObj.username}`)
//         const users = response.data
//         if(users.length){
//             throw new Error(
//             "이미 존재하는 사용자입니다."
//             );
//         }
//         return await rootApi.post(`/user`, userObj)
//     }catch(error){
//         return error
//
//     }
// }

