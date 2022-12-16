import * as service from "./API_service.js";
import {Task} from "./Model_class.js";

// ________________________List_______________________

let allLists = await service.getAlllists();

let ListbyId = function(x){
  return  service.getListbyId(x); 
}

// ________________________Task_______________________

let allTasks = await service.getAlltasks();

let getTaskbyListid= function(listId){
   return service.getTaskbyListid(listId)
}

let getTaskbyId= function(Id){
    return service.getTaskbyId(Id)
}

let AddTask =function(Task){
    return service.addTask(Task);
} 
let editTask =function(Task){
    return service.editTask(Task);
}
let deleteTaskbyId= function(Id){
    return service.deleteTask(Id)
}









export const noTask=async function(){

    let todoList=document.getElementById("todoList");
    let msg =document.createElement("p");
    msg.textContent="No tasks for today.Create some!"
    todoList.appendChild(msg);

}
export const noTaskadded= async function(){
    alert("No task added!");
}


const showtasks= function(jsData){

    let todoList=document.getElementById("todoList");
    todoList.textContent = '';

    for(let i=0;i<jsData.length;i++){

        let newli =document.createElement("li");
        let newContainer=document.createElement("div")
        let newTask=document.createElement("p");
        let newCheckBtn=document.createElement("button");
        let newDeleteBtn=document.createElement("button");
  
        newTask.textContent=jsData[i].name;

        newCheckBtn.classList.add(jsData[i].list.color+"btn","checkbtn");
        newCheckBtn.value=jsData[i].id;
        
        newDeleteBtn.classList.add("btn","btn-close","me-2");
        newDeleteBtn.value=jsData[i].id;

        if(jsData[i].done){
            newli.classList.add("checked");
        }

        newContainer.append(newCheckBtn,newTask);
        newli.append(newContainer,newDeleteBtn);

        todoList.appendChild(newli);

    }

}


const showLists=function(jsDataList){

    let listNum=document.getElementById("listNum");
    listNum.textContent=(`(${jsDataList.length})`);

    let listItems=document.getElementById("listItem");

    for(let i=0;i<jsDataList.length;i++){

        let newListbtn=document.createElement("button");

        newListbtn.textContent=jsDataList[i].name;
        newListbtn.classList.add(jsDataList[i].color);
        newListbtn.value=jsDataList[i].id;
        
        listItems.appendChild(newListbtn);
    }

    let listbtns=document.querySelectorAll("#listItem button");

    for(let btn of listbtns){

        btn.onclick = async function(){

            let Tasks= await getTaskbyListid(btn.value);
            showtasks(Tasks);

            for(let btn of listbtns){
                btn.setAttribute("id","");
            }
            btn.setAttribute("id","chosenList");

            let listTitle=document.getElementById("listTitle");
            listTitle.innerHTML=btn.textContent;
        } 
    }

}

    
showLists(allLists);
showtasks(allTasks);


document.addEventListener("click",async function(event){

    if(event.target.matches('.checkbtn')){
        let id=event.target.value;
        let task = await getTaskbyId(id)
        if(task.done){

            task.done=false;
            console.log(task);
            let returnedTasks = await editTask(task);
            console.log(returnedTasks);
            showtasks(returnedTasks);
        
        }
        else{
            task.done=true;
            console.log(task);
            let returnedTasks = await editTask(task);
            console.log(returnedTasks);
            showtasks(returnedTasks);
        }
    }
    if(event.target.matches(".btn-close")){
        let id=event.target.value;
        console.log(id);
        let returnedTasks= await deleteTaskbyId(id);
        showtasks(returnedTasks);
    }
});

let addBtn=document.getElementById("addbtn");
addBtn.addEventListener("click", async function(){

    let newtext=document.getElementById("newTask").value;
    console.log(newtext);
    if(newtext!=""){

        let chosenList=document.getElementById("chosenList");
        if(chosenList==null){
            alert("you have to specify a list to add the task to it :)")
        }
        let chosenListid=chosenList.value;
        let task= new Task(null,newtext,false,null,chosenListid);
        let returnedTasks=await AddTask(task);
        showtasks(returnedTasks);
    }
    else{
        alert("no task to add.write something!:)")
    }


})




 
