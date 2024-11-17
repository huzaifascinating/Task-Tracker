import AddTask from "./addtask";
import RenderTasks from "./rendertask";

const ContentComponent = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
      <AddTask />
      <RenderTasks />
    </div>
  );
};

export default ContentComponent;
