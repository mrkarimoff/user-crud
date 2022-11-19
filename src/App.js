import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, updateState } from "./redux/actions/userActions";
import { Table, Button, Modal, Input, Form, Spin } from "antd";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const {
    users,
    modalVisible,
    nameInp,
    moneyInp,
    ageInp,
    emailInp,
    isLoading,
  } = useSelector((state) => state.userReducer);
  const [form] = Form.useForm();

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
          <button className="mx-2 btn btn-info">edit</button>
          <button className="mx-2 btn btn-danger">delete</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onFinish = () => {};

  return (
    <div className="App container mt-3">
      <Button
        onClick={() =>
          dispatch(updateState({ stateName: "modalVisible", value: true }))
        }
        shape="round"
        size={"large"}
        type="primary"
        className="m-3 w-25"
      >
        Add User
      </Button>
      <Modal
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() =>
          dispatch(updateState({ stateName: "modalVisible", value: false }))
        }
        footer={
          <div className="d-flex justify-content-end mx-2">
            <Button
              size="large"
              style={{ borderRadius: "10px" }}
              className="d-flex gap-2 align-items-center"
              icon={<Spin spinning={true} />}
            >
              Submit
            </Button>
          </div>
        }
      >
        <div>
          <h3 className="text-center">Add User</h3>
          <Form
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item name={"username"} label="Name">
              <Input
                placeholder="name..."
                value={nameInp}
                onChange={(e) =>
                  dispatch(
                    updateState({
                      stateName: "nameInp",
                      value: e.target.value,
                    })
                  )
                }
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
      ></Table>
    </div>
  );
};

export default App;
