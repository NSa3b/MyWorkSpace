export class Task{
    constructor(id,name,done,date_added,list_id){
        this.id=id;
        this.name=name;
        this.done=done;
        this.date_added=date_added;
        this.list_id=list_id;
    }
}

export class List{
    constructor(id,name,color){
        this.id=id;
        this.name=name;
        this.color=color;
    }

}


