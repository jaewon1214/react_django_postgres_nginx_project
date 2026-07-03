import React from 'react'
import SalesTable from '../../components/slase/SalesTable'
import { useCurrentUser } from '../../store/hooks/uesUser'
import AuthControler from '../../components/layout/AuthControler';

const SalesPage = () => {
  const {data:user} = useCurrentUser();
  if(!user){
    return(
      <AuthControler
        message="로그인 후 상품 정보를 조회 및 관리할 수 있습니다."
      />
    )
  }
  return (
    <div>
      <SalesTable/>
    </div>
  )
}

export default SalesPage
