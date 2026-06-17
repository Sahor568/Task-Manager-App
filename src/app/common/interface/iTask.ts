// It is an interface for the task model
export interface ITask {
  id: number;
  userId: number;
  title: string;
  category: string;
  createdAt: string;
  dueDate: string;
  status: string;
  description: string;
}
