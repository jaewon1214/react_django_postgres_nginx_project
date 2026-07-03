import React from 'react'
import { useGetEmployee } from '../../store/hooks/useEmployee'


const EmployeeTable = ({selectedId}) => {
    const {data: emp={}, isLoading, error } = useGetEmployee(selectedId);
  if(!selectedId) return <h3>직원을 선택하세요</h3>

  if(isLoading) return <h3>로딩중...</h3>
  if(error) return<h3>에러발생</h3>
  return (
    <table className="employee-table">
      <thead>
        <tr>
          {Object.keys(emp).map(key => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {emp && Object.values(emp).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default EmployeeTable