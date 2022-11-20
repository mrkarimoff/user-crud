import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  updateState,
  addUsers,
  delUser,
} from "./redux/actions/userActions";
import { Table, Button, Modal, Input, Form, Spin } from "antd";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { users, modalVisible, isLoading, currentUser } = useSelector(
    (state) => state.userReducer
  );
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Money",
      dataIndex: "money",
      key: "money",
      render: (money) => <>${money}</>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (obj) => (
        <div>
          <button
            onClick={() => {
              form.setFieldsValue(obj);
              dispatch(
                updateState({ stateName: "currentUser", value: obj.key })
              );
              dispatch(updateState({ stateName: "modalVisible", value: true }));
            }}
            className="mx-2 btn btn-info"
          >
            edit
          </button>
          <button
            onClick={() => dispatch(delUser(obj.key))}
            className="mx-2 btn btn-danger"
          >
            delete
          </button>
        </div>
      ),
      width: 208,
      fixed: "right",
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onFinish = (data) => {
    dispatch(updateState({ stateName: "isLoading", value: true }));
    setTimeout(() => {
      dispatch(updateState({ stateName: "isLoading", value: false }));
      dispatch(updateState({ stateName: "modalVisible", value: false }));
    }, 1000);

    if (currentUser) {
      dispatch(addUsers({ ...data, key: currentUser }));
    } else {
      dispatch(addUsers(data));
    }
    dispatch(updateState({ stateName: "currentUser", value: "" }));
    form.resetFields();
  };

  return (
    <div className="App container mt-3">
      <div style={{ width: "200px", marginBlock: "10px" }}>
        <Button
          block={true}
          onClick={() =>
            dispatch(updateState({ stateName: "modalVisible", value: true }))
          }
          shape="round"
          size="large"
          type="primary"
        >
          Add User
        </Button>
      </div>
      <Modal
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields();
          dispatch(updateState({ stateName: "modalVisible", value: false }));
        }}
        footer={
          <div className="d-flex justify-content-end mx-2">
            <Button
              form="myForm"
              htmlType="submit"
              size="large"
              style={{ borderRadius: "10px" }}
              className="d-flex gap-2 align-items-center"
              icon={<Spin spinning={isLoading} />}
            >
              Submit
            </Button>
          </div>
        }
      >
        <div>
          <h3 className="text-center">Add User</h3>
          <Form
            id="myForm"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            form={form}
            onFinish={onFinish}
            initialValues={formUpdate}
          >
            <Form.Item name={"name"} label="Name">
              <Input
                style={{ borderRadius: "7px" }}
                size="large"
                allowClear
                placeholder="name..."
              />
            </Form.Item>
            <Form.Item name={"email"} label="Email">
              <Input
                type="email"
                style={{ borderRadius: "7px" }}
                size="large"
                allowClear
                placeholder="email..."
              />
            </Form.Item>
            <Form.Item name={"age"} label="Age">
              <Input
                type="number"
                style={{ borderRadius: "7px" }}
                size="large"
                placeholder="age..."
              />
            </Form.Item>
            <Form.Item name={"money"} label="Money">
              <Input
                type="number"
                style={{ borderRadius: "7px" }}
                size="large"
                placeholder="money..."
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Table
        pagination={false}
        bordered={true}
        dataSource={users}
        columns={columns}
        scroll={{
          x: 600,
        }}
      ></Table>
    </div>
  );
};

export default App;
