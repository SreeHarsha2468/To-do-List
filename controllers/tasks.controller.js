import Task from "../models/tasks.models.js";
import User from "../models/user.models.js";

export const getAllTasks = async (req, res) => {
  try {
    
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }

    const tasks = await Task.find({ user: userId });
    //if there are not tasks in DB
    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No Tasks Found", success: false });
    }

    return res
      .status(200)
      .json({ message: "All tasks fetched successfully", tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const newTask = async (req, res) => {
  try {
    const userId = req.user.id;
    //taking taskname and description as inputs
    const { taskName, taskDescription } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }


    const newTask = new Task({
      taskName,
      taskDescription,
      user
    });

    //saving in DB
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", success: true, newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    //taking taskId from params
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }

    const task = await Task.findById(id);
    //checking if task is present in DB or no
    if (!task) {
      return res.json({ message: "Task Not Found", success: false });
    }

    if (task.user != userId) {
      return res
        .status(401)
        .json({ message: "Task Not Found", success: false });
    }

    

    return res
      .status(200)
      .json({ message: "Task Found Successfully", success: true, task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    //taking taskId and userId from params
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }
    
    const task = await Task.findByIdAndUpdate(id);
    //checking if task is present in DB or no
    if (!task) {
      return res.json({ message: "Task Not Found", success: false });
    }

    if (task.user != userId) {
      return res
        .status(401)
        .json({ message: "Task Not Found", success: false });
    }
    
    //condition for updating task completed
    if (task.completed == false) {
      task.completed = true;
    } else {
      task.completed = false;
    }
    
    //saving the changes
    await task.save();

    return res
      .status(200)
      .json({ message: "Task Updated Successfully", success: true, task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    //taking taskId from params
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }
    
    //deleting Task
    const task = await Task.findByIdAndDelete(id);
     //checking if task is present in DB or no
    if (!task) {
      return res.json({ message: "Task Not Found", success: false });
    }

    if (task.user != userId) {
      return res
        .status(401)
        .json({ message: "Task Not Found", success: false });
    }
   
    return res
      .status(200)
      .json({ message: "Task Deleted Successfully", success: true, task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
