import {Status} from "./enums";

export interface User{
  id?:String,
  email:String,
  password:String
}

export interface Project{
  _id?:string;
  title: string;
  date:Date;
  tags: string;
}

export interface Task{
  _id?:string;
  title:string;
  description:string;
  status:Status;
  storyPoints:number;
  sprintId?:string;
}

export interface Sprint{
  _id?:string;
  tasks:Task[];
  title:string;
  dateStart:Date;
  dateEnd:Date;
  status?:string;
  sumSP?:number
}

export interface arrayStatus{
  status: Status,
  tasks:Task[]
}

export interface AuthResp{
  token:string
}
