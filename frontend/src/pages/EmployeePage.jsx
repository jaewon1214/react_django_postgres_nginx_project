import React, { useState } from 'react'
import EmployeeTable from '../components/employee/EmployeeTable';
import EmployeeList from '../components/employee/EmployeeList';
import EmployeeRegister from '../components/employee/EmployeeRegister';
import EmployeeUpdate from '../components/employee/EmployeeUpdate';
import '../components/employee/EmployeeStyle.css';
import { useSelector } from 'react-redux';
import {
  useDeleteEmployee,
  useGetEmployee
} from '../store/hooks/useEmployee'


const EmployeePage = () => {
  const [selectedId, setSelectedId] = useState('');
  const [mode, setMode] = useState("register")
  const deleteMutation = useDeleteEmployee();
  

  const handledelete = async () => {

    if(!selectedId){
      alert("삭제할 데이터를 선택하세요");
      return;
    }
    try{
      await deleteMutation.mutateAsync(selectedId)//mutateAsync
      alert("직원 삭제 성공")
      setSelectedId(null)
    }catch{
      alert("직원 삭제 실패")
    }
  }

  return (
  <div className="employee-page">
    <h2 className="employee-title">Employee Management</h2>

    <EmployeeList
      selectedId={selectedId}
      setSelectedId={setSelectedId}
    />

    <EmployeeTable
      selectedId={selectedId}
    />

    <div className="action-buttons">
      <button onClick={() => setMode("register")}>
        등록
      </button>
      <button onClick={() => {
        if(!selectedId){
          alert("수정할 고용인을 선택하시요!")
          return;
        }
        setMode("update")}
        }
      >
        
        수정
      </button>
      <button onClick={() => setMode("delete")}>
        삭제
      </button>
    </div>

    {
      mode === "register" ?
        <EmployeeRegister />
      : mode === "update" ?
        <EmployeeUpdate 
          selectedId={selectedId}
        />
      : mode === "delete" ?
        <div className="delete-box">
          <button onClick={handledelete}>위 데이터를 삭제하시겠습니까?</button>
        </div>
      : null
    }
  </div>
);
}

export default EmployeePage
