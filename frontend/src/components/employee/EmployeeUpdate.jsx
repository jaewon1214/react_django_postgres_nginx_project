import React, { useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext';
import { useGetEmployee, usePutUpdateEmployee } from '../../store/hooks/useEmployee';


const EmployeeUpdate = ({selectedId}) => {
  const {data: emp={}, isLoading, error} = useGetEmployee(selectedId)
  const updateMutation = usePutUpdateEmployee();
  const [newemp, setNewEmp] = useState(emp);
  
  useEffect(()=>{
    emp &&
    setNewEmp(emp)
  },[emp])  

  const handleChange = (event) =>{
    const {name,value} = event.target;
    setNewEmp(prev => (
      {...prev, [name] : value}
      ))
    }

  const handleSubmmit = async(event) =>{
      event.preventDefault();
      try{
        await updateMutation.mutate(newemp)
        alert("직원 수정 완료")
      }catch{
        alert("직원 실패 완료")
      }
    }
    if(isLoading) return <h3>직원 정보를 불러오는 중...</h3>
    if(error) return <h3>에러 발생: {error.message}</h3>
      return (
  <form className="employee-form" onSubmit={handleSubmmit}>
    <div>
      <input
        type='text'
        name='name'
        value={newemp.name}
        onChange={handleChange}
        placeholder='이름'
        required
      />
    </div>
    <div>
      <input
        type='email'
        name='email'
        value={newemp.email}
        onChange={handleChange}
        placeholder='이메일'
        required
      />
    </div>
    <div>
      <input
        type='text'
        name='job'
        value={newemp.job}
        onChange={handleChange}
        placeholder='직업'
        required
      />
    </div>
    <div>
      <input
        type='number'
        name='pay'
        value={newemp.pay}
        onChange={handleChange}
        placeholder='월급'
        required
      />
    </div>
    <button>수정</button>
  </form>
)
    }

export default EmployeeUpdate
