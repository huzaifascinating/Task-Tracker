import { useState } from "react";
import { Table, Checkbox, Button, Popconfirm, Tag, message, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { toggleComplete, deleteTask, editTask, Task } from "./taskSlice";

const RenderTasks = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Show edit modal
  const showEditModal = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue({ title: task.title, description: task.description });
    setIsEditing(true);
  };

  // Handle task editing
  const handleEditTask = () => {
    form.validateFields().then((values) => {
      if (editingTask) {
        dispatch(editTask({ id: editingTask.id, ...values }));
        message.success("Task updated successfully!");
        setIsEditing(false);
        setEditingTask(null);
      }
    });
  };

  // Handle task deletion
  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
    message.success("Task deleted successfully!");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Task) => (
        <span className={`${record.completed ? "text-gray-400" : "text-black"} font-semibold`}>
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: Task) => (
        <span className={`${record.completed ? "text-gray-400" : "text-black"}`}>{text}</span>
      ),
    },
    {
      title: "Status",
      key: "completed",
      render: (_: unknown, record: Task) => (
        <Checkbox
          checked={record.completed}
          onChange={() => dispatch(toggleComplete(record.id))}
        >
          {record.completed ? <Tag color="green">Completed</Tag> : <Tag color="red">Pending</Tag>}
        </Checkbox>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Task) => (
        <div className="flex space-x-2">
          <Popconfirm
            title="Are you sure you want to delete this task permanently?"
            description={`Task: ${record.title}`}
            onConfirm={() => handleDeleteTask(record.id)}
            okText="Yes"
            okButtonProps={{ type: "primary", danger: true }}
            cancelText="No"
          >
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              className="hover:bg-red-500 hover:text-white transition-all"
            />
          </Popconfirm>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className="text-blue-500 transition-all"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl mb-4 flex items-center font-semibold">
        <InfoCircleOutlined className="mr-2" />
        Task List
      </h2>

      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="rounded-lg shadow-md"
        bordered
        rowClassName="hover:bg-gray-100 transition-all"
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Task"
        visible={isEditing}
        onOk={handleEditTask}
        onCancel={() => setIsEditing(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a task title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RenderTasks;
