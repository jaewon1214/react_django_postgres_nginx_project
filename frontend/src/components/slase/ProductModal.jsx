import React, { useEffect } from 'react'
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd'

const ProductModal = ({ open, setOpen, initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues)
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form])

  const onFinish = async (productObj) => {
    await onSubmit(productObj)
    setOpen(false)
    form.resetFields();
  }

  return (
    <Modal
      title={null}
      open={open}
      onCancel={() => {
        setOpen(false)
        form.resetFields();
      }}
      footer={null}
      width={720}
      centered
      className="productModal"
    >
      <div className="modalHeader">
        <h2>{initialValues ? "상품 수정" : "상품 등록"}</h2>
      </div>

      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        size='large'
      >
        <Form.Item
          label="상품명"
          name="product_name"
          rules={[{ required: true, message: "상품명을 입력하세요." }]}
        >
          <Input placeholder='예: 악세사리' />
        </Form.Item>

        <Form.Item
          label="상품색"
          name="color"
          rules={[{ required: true }]}
        >
          <Select
            placeholder='색상 선택'
            options={[
              { value: "Black", label: "Black" },
              { value: "White", label: "White" },
              { value: "Red", label: "Red" },
              { value: "Blue", label: "Blue" }
            ]}
          />
        </Form.Item>

        <div className="row">
          <Form.Item
            label="원가"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="판매가"
            name="sale_price"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item
          label="카테고리"
          name="product_category_code"
          rules={[{ required: true }]}
        >
          <Select
            placeholder='카테고리 선택'
            options={[
              { value: "E1", label: "E1" },
              { value: "E2", label: "E2" },
              { value: "E3", label: "E3" },
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" }
            ]}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          className="submitBtn"
        >
          {initialValues ? "수정하기" : "등록하기"}
        </Button>
      </Form>

      <style>{`
        .productModal .ant-modal-content {
          border-radius: 16px;
          padding: 24px;
        }

        .modalHeader h2 {
          margin-bottom: 16px;
          font-size: 20px;
          font-weight: 700;
        }

        .row {
          display: flex;
          gap: 12px;
        }

        .row .ant-form-item {
          flex: 1;
        }

        .submitBtn {
          height: 48px;
          border-radius: 10px;
          font-weight: bold;
          background: #2563eb;
        }

        .submitBtn:hover {
          background: #1d4ed8;
        }
      `}</style>
    </Modal>
  )
}

export default ProductModal