import { Layout } from "antd";
import CustomHeader from "./components/header";
import CustomFooter from "./components/footer";
import ContentComponent from "./components/content";

const { Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <CustomHeader />

      <Content className="p-8">
        <ContentComponent />
      </Content>

      <CustomFooter />
    </Layout>
  );
}

export default App;
