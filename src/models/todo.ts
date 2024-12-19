import mongoose, { Schema, Document, mongo } from "mongoose";

export interface ITodo extends Document{
    title:string;
    description:string;
    completed :boolean;
    userId:string;

}

const TodoSchemaa : Schema= new Schema({
    title:{type: String, required: true},
    description:{type:String},
    completed:{type:Boolean,default:false},
    userId:{type:String, required:true}
})

export default mongoose.model<ITodo>("Todo", TodoSchemaa);