import { Form, Input, Button, message } from "antd";
import { PlusOutlined, InfoCircleOutlined, FileTextOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { addTask } from "./taskSlice";

const AddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  // Handle adding a task
  const handleAddTask = (values: { title: string; description?: string }) => {
    dispatch(addTask(values));
    form.resetFields();
    message.success("Task added successfully!");
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 flex items-center font-semibold">
        <InfoCircleOutlined className="mr-2" />
        Add a Task
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddTask}
        className="mb-6"
      >
        <Form.Item
          name="title"
          label={
            <span className="font-medium flex items-center">
              <FileTextOutlined className="mr-2 text-gray-500" />
              Title
            </span>
          }
          rules={[{ required: true, message: "Please enter a task title" }]}
        >
          <Input
            placeholder="Task Title"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span className="font-medium flex items-center">
              <EditOutlined className="mr-2 text-gray-500" />
              Description
            </span>
          }
        >
          <Input.TextArea
            rows={4}
            placeholder="Task Description"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          className="relative left-[53em] py-3 text-lg bg-blue-500 hover:bg-blue-300 transition-all rounded-md"
        >
          Add Task
        </Button>
      </Form>
    </div>
  );
};

export default AddTask;
