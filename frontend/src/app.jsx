import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import TodoPage from './pages/TodoPage'
import HomePage from './pages/HomePage'
import EmployeePage from './pages/EmployeePage'
import Headbar from './components/layout/Headbar'
import Sidebar from './components/layout/Sidebar'
import { useState } from 'react'
//import { Provider } from 'react-redux'
import store from './store'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import Productpage from './pages/slase/Productpage'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import SalesPage from './pages/slase/SalesPage'
ModuleRegistry.registerModules([AllCommunityModule])


const Layout = styled.div`
  display: flex;
  padding-top: 60px;
`

const Content = styled.main`
  margin-left: 220px;
  padding: 30px;
  width: calc(100% - 220px);

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 80px 20px 20px 20px;
  }
`
const queryClient = new QueryClient();

export function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient} > {/*queryclient로 감아주기*/}
        <Headbar/>
        <Layout>
          <Sidebar />
          <Content> 
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/todo" element={
                <TodoPage/>
              }/>
              <Route path="/employee" element={
                <EmployeePage/>
              }/>
              <Route path="/product" element={
                <Productpage/>
              }/>
              <Route path="/sales" element={
                <SalesPage/>
              }/>
            </Routes>
          </Content>
        </Layout>
      </QueryClientProvider>
  
  </BrowserRouter>
  )
}

export default App