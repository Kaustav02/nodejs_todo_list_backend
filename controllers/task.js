import errorhandler from "../middlewares/error.js";
import { task } from "../models/task.js";

export const newtask = async (req, res, next) => {
try {
  const { title, description } = req.body;

  await task.create({
    title,
    description,
    user: req.login_info,
  });

  res.status(201).json({
    success: true,
    message: "task added successfully",
  });
} catch (error) {
  next(error);
}
};

export const getmytask = async (req, res, next) => {
try {
  const userid = req.login_info._id;

  const mytask = await task.find({ user: userid });

  res.status(200).json({
    success: true,
    mytask,
  });
} catch (error) {
  next(error);
}
};

export const updatetask = async (req, res, next) => {
try {
  const mytask = await task.findById( req.params.id );
  
  if(!mytask)
  return next(new errorhandler("task not found",404));

 mytask.iscompleted = !mytask.iscompleted;

  await mytask.save();

  res.status(200).json({
    success: true,
    message:"task updated"
  });
} catch (error) {
  next(error);
}

};

export const deletetask = async (req, res, next) => {
try {
  
  const mytask = await task.findById( req.params.id );

  if(!mytask)
  return next(new errorhandler("task not found",404));


 await  mytask.deleteOne();
res.status(200).json({
  success: true,
  message:"task deleted"
});
} catch (error) {
  next(error);
}

};
