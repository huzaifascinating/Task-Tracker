import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Task interface
export interface Task {
  id: string; // id is now a string
  title: string;
  description?: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description?: string }>) => {
      state.tasks.push({
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      });
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string; title: string; description?: string }>
    ) => {
      const { id, title, description } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
  },
});

export const { addTask, toggleComplete, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice;
