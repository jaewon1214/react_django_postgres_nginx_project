import {
  useAllGetEmployee
} from '../../store/hooks/useEmployee'

const EmployeeList = ({ selectedId, setSelectedId}) => {
  const {data: empTable=[], isLoading, error} = useAllGetEmployee();
  
  if(isLoading) return <h3>직원 정보를 불러오는 중...</h3>  //
  if(error) return <h3>에러 발생: {error.message}</h3>  //
  return (
    <div className="employee-list">
      {empTable?.map(item => (
        <button
          key={item.id}
          item = {item}
          onClick={() => setSelectedId(item.id)}
          style={{
            background: selectedId === item.id ? "#2563eb" : undefined,
            color: selectedId === item.id ? "white" : undefined
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}

export default EmployeeList