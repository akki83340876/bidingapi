import '../models/connection.js';
import UserSchemaModel from '../models/user.model.js';
import CategorySchemaModel from '../models/category.model.js';
import BidSchemaModel from '../models/bid.model.js';
import url from 'url';
import path from 'path';
import rs from './randomstring.controller.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save=async (req,res,next)=>{
    var bidDetails=req.body
    var bidList=await BidSchemaModel.find().sort({"_id":-1}).limit(1);
    var l=bidList.length;
    var _id=l==0?1:bidList[0]._id+1;
    bidDetails={...bidDetails,"_id":_id,"info":Date()};
    var bid = await BidSchemaModel.create(bidDetails);
    if(bid)
      return res.status(201).json({"result":"Product bid successfully...."});
    else
      return res.status(500).json({"result": "Server Error"});    
}


export var updateBid=async(request,response,next)=>{
  let userDetails = await CategorySchemaModel.findOne(JSON.parse(request.body.condition_object));
  if(userDetails){
     let category=await CategorySchemaModel.updateOne(JSON.parse(request.body.condition_object),{$set:JSON.parse(request.body.set_condition)});   
     if(category)
      return response.status(201).json({"msg":"success"});
     else
      return response.status(500).json({error: "Server Error"});
  }
  else
   return response.status(404).json({error: "Requested resource not available"});
}

export var deleteBid=async(request,response,next)=>{
  var cDetails = await CategorySchemaModel.find(JSON.parse(request.body.condition_object));
  if(cDetails.length!=0){
    let result = await CategorySchemaModel.deleteMany(JSON.parse(request.body.condition_object)); 
    if(result)
     return response.status(201).json({"msg":"success"});
    else
     return response.status(500).json({error: "Server Error"});
  }
  else
    return response.status(404).json({error: "Resource not found"}); 
}

export var fetch=async (req,res,next)=>{
  var condition_object=url.parse(req.url,true).query;
  var bList = await BidSchemaModel.find(condition_object);
  var l=bList.length;
  if(l!=0)
  {
    console.log(bList);
    return res.status(201).json(bList);
  }
  else
    return res.status(201).json(bList);
}



