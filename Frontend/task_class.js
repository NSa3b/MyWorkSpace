export class Task{
    task_id;
    name;
    done;
   
    list_id;
    constructor(id,name,done,date,list_id){
        this.id=id;
        this.name=name;
        this.done=done;
        this.list_id-list_id;
    }
}



let newtask=new Task(4,"go to the gym",false,3);
console.log(newtask);

