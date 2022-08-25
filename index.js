const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

//cors configuration
app.use(cors());

//json conversion
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/Blog");
const BlogSchema = new mongoose.Schema(
    {
        userId: {
            type: Number
          },
          impressionCount: {
            type: String
          },
          applaudCount: {
            type: String
          },
          status: {
            type: String
          },
          messageBody: {
            type: String
          },
          updateDate: {
            type: String
          },
          image: {
            type: String
          },
          timeToRead: {
            type: String
          },
          scheduledDate: {
            type: String
          },
    }
  );
  const Task = mongoose.model("Task",BlogSchema);

  //post
app.post("/api/create", async (req, res) => {
    try {
      const task = new Task({
        userId: req.body.userId,
        impressionCount: req.body.impressionCount,
        applaudCount:req.body.applaudCount,
        status:req.body.status,
        messageBody:req.body.messageBody,
        updateDate:req.body.updateDate,
        image:req.body.image,
        timeToRead:req.body.timeToRead,
        scheduledDate:req.body.scheduledDate
      });
      await task.save();
      res.status(200).send(task);
    } catch (error) {
      console.log(error);
    }
  });
  //get
  app.get("/api/list", async (req, res) => {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (error) {
      console.log(error);
    }
  });

  //Update
app.put("/api/update/:id", async (req, res) => {
    try {
      const task = await Task.findOne({ _id: req.params.id });
      userId: req.body.userId;
      impressionCount: req.body.impressionCount;
      applaudCount:req.body.applaudCount;
      status:req.body.status;
      messageBody:req.body.messageBody;
      updateDate:req.body.updateDate;
      image:req.body.image;
      timeToRead:req.body.timeToRead;
      scheduledDate:req.body.scheduledDate;
      await task.save();
      res.send(task);
    } catch (error) {
      console.log(error);
    }
  });
  
  // delete
  app.delete("/api/delete/:id", async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id });
      res.send(task);
    } catch (error) {
      console.log(error);
    }
  });
  
  app.listen(7000, () => {
    console.log(`My app is running @7000 port`);
  });