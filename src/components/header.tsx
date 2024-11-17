import { Layout } from "antd";

const {Header} = Layout;

const CustomHeader = () => {
  return (
    <Header className="bg-gray-100 text-black text-3xl font-bold text-center p-4 shadow-md">
      <span className="flex items-center justify-center space-x-2">
        <span>Task Manager</span>
      </span>
    </Header>
  );
};

export default CustomHeader;
