const express = require('express');
const router = express.Router();
const todo = require('../Model/Todo')

//POST
router.post('/',async(req,res)=>{
    try{
        const todos = new todo(req.body);
        const result = await todos.save()
        res.status(200).json({ success: true, result: result });
    } catch (err) {
      console.log(err);
      res.status(404).json({ success: false });
    }
});

//GET
router.get("/:id", async(req,res)=>{
    try{
        const result = await todo.findById({_id:req.params.id})
        res.status(200).json({ success: true, result: result });
    }catch(err){
     res.status(404).json({'success':false})
   }
});

//put
router.put("/:id", async(req,res)=>{
    try{
        const result = await todo.findByIdAndUpdate({_id:req.params.id},{$set:req.body})
        res.status(200).json({ success: true, result: result });
    }catch(err){
     res.status(404).json({'success':false})
   }
});

//delete
router.delete("/:id",async(req,res)=>{
    try{
        const result = await todo.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({ success: true, result: result });
    }catch(err){
     res.status(404).json({'success':false})
   }
});
module.exports = router;