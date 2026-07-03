import React, { useMemo, useState } from 'react'
import {
  useAllGetProduct,
  useDeleteProduct,
  usePostRegisterProduct,
  usePutUpdateProduct
} from '../../store/hooks/useProduct'
import { AgGridReact } from 'ag-grid-react';
import ProductModal from './ProductModal';

const ProductTable = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(null);

  const { data: productList = [], isLoading, error } = useAllGetProduct();
  const updateMutation = usePutUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const registerMutation = usePostRegisterProduct();

  const handleUpdate = (item) => {
    setNewProduct(item)
    setOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니다?")) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const handeRegister = () => {
    setNewProduct(null)
    setOpen(true)
  }

  const columnDefs = useMemo(() => ([
    { field: "product_name", headerName: "상품명", flex: 1 },
    { field: "color", headerName: "상품색", flex: 1 },
    { field: "price", headerName: "원가", flex: 1 },
    { field: "sale_price", headerName: "판매가", flex: 1 },
    { field: "category_code", headerName: "카테고리 코드", flex: 1 },
    {
      headerName: "관리",
      cellRenderer: (params) => (
        <div className="actionBtns">
          <button className="btn edit" onClick={() => handleUpdate(params.data)}>수정</button>
          <button className="btn delete" onClick={() => handleDelete(params.data.id)}>삭제</button>
        </div>
      ),
      flex: 1
    },
  ]), [])

  if (isLoading) return <h3 className="loading">Loading....</h3>
  if (error) return <h3 className="error">{error.message}</h3>

  return (
    <div className="page">
      <div className="header">
        <h2>📦 상품 관리</h2>
        <button className="btn primary" onClick={handeRegister}>
          + 상품 등록
        </button>
      </div>

      <div className="tableCard">
        <div className="ag-theme-alpine customGrid">
          <AgGridReact
            theme="legacy"
            rowData={productList}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={25}
            paginationPageSizeSelector={[25, 50, 100]}
            animateRows={false}
            getRowId={(params) => params.data.id.toString()}
          />
        </div>
      </div>

      <ProductModal
        open={open}
        setOpen={setOpen}
        initialValues={newProduct}
        onSubmit={async (productObj) => {
          if (newProduct) {
            await updateMutation.mutateAsync({ ...productObj, id: newProduct.id })
          } else {
            await registerMutation.mutateAsync(productObj)
          }
        }}
      />

      {/* STYLE */}
      <style>{`
        .page {
          padding: 24px;
          background: #f6f7fb;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .header h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
        }

        .tableCard {
          background: white;
          border-radius: 14px;
          padding: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }

        .customGrid {
          height: 800px;
          width: 100%;
        }

        .actionBtns {
          display: flex;
          gap: 8px;
        }

        .btn {
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          transition: 0.2s;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn.primary {
          background: #2563eb;
          color: white;
        }

        .btn.primary:hover {
          background: #1d4ed8;
        }

        .btn.edit {
          background: #10b981;
          color: white;
        }

        .btn.edit:hover {
          background: #059669;
        }

        .btn.delete {
          background: #ef4444;
          color: white;
        }

        .btn.delete:hover {
          background: #dc2626;
        }

        .loading, .error {
          text-align: center;
          margin-top: 40px;
        }
      `}</style>
    </div>
  )
}

export default ProductTable