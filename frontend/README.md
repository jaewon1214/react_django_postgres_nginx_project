router : npm install react-router-dom
css : npm install styled-components
아이콘 : npm install react-icons
redux: npm install react-redux @reduxjs/toolkit

json 서버 만들기 : json-server(restfulAPI) : npm install -g json-server
http://localhost:3001/user
api 라이브러리 : npm install axios 

query 라이브러리 : npm install @tanstack/react-query


reducer
dispatch: 함수를 실행하는 함수
action: 전체 object 인수
action.type: 함수의 타입
action.payload: state 변화시킬 수 있는 필요한 인수 

useState => useReducer => useContext => redux(slice, query)

context : state, 내부함수 (reducers)
redux : state, 내부함수 (reducers), 외부함수(extraReducers: api)

Restful Api
get total : url => return : table(json)
get one data : url/id => return : obj
post : url, obj = > return : obj
put : url/id, obj => return : obj
delete : url/id => return : id

antd & agird library : npm install antd ag-grid-react ag-grid-community

foreach함수 => []foreach((item,idx,copy)=>{})
map함수 => []map((item,idx,copy)=>{})
filter => []filter((item,idx,copy)=>{})
reduce => []reduce((resnlt,item,idx,copy)=>{},초기값)

chart 라이브러리 : npm install chart.js react-chartjs-2