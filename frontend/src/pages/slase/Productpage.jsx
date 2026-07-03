import React from 'react'
import ProductTable from '../../components/slase/ProductTable'
import { useCurrentUser } from '../../store/hooks/uesUser'
import AuthControler from '../../components/layout/AuthControler'

const Productpage = () => {
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
      <ProductTable/>
    </div>
  )
}

export default Productpage
