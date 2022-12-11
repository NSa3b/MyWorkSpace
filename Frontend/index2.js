// import {Task} from "./task_class.js";
// import {Task} from "./API_service.js";
import * as service from "./API_service.js";
import * as task from "./task_class.js";




let addBtn=document.getElementById("addbtn");
let newtext=document.getElementById("newTask");
let listTitle=document.getElementById("listTitle");
let listbtn=document.querySelectorAll("#listItem button");
let listItems=document.getElementById("listItem");

const noTask=function(){
    let todoList=document.getElementById("todoList");
    let msg =document.createElement("p");
    msg.textContent="No tasks for today.Create some!"
    todoList.appendChild(msg);

}
const noTaskadded=function(){
    alert("No task added!");
}


const showtasks=function(jsData){

    let todoList=document.getElementById("todoList");
    todoList.textContent = '';

    for(let i=0;i<jsData.length;i++){
        // console.log(jsData[i]);

        let newli =document.createElement("li");
        let newContainer=document.createElement("div")
        let newTask=document.createElement("p");
        let newCheckBtn=document.createElement("button");
        let newDeleteBtn=document.createElement("button");
  
        newTask.textContent=jsData[i].name;
        newCheckBtn.classList.add(jsData[i].list.color+"btn","checkbtn");
        newDeleteBtn.classList.add("btn","btn-close","me-2");

        if(jsData[i].done){
            newli.classList.add("checked");
        }

        newContainer.append(newCheckBtn,newTask);
        newli.append(newContainer,newDeleteBtn);

        todoList.appendChild(newli);

    }

}

const showListtasks = async function(btnNode){

    let Tasks= await service.getTaskbyListid(btnNode.value);
    showtasks(Tasks);

    console.log(btnNode);

    // for(let i of listbtn)
    // {
    //     console.log(i.textContent);
    //     i.classList.remove("chosenList");
    // }

    btnNode.classList.add("chosenList");
    listTitle.innerHTML=btnNode.textContent;
}



const showLists=function(jsDataList){

    let listNum=document.getElementById("listNum");
    listNum.textContent=(`(${jsDataList.length})`);

    for(let i=0;i<jsDataList.length;i++){

        let newListbtn=document.createElement("button");

        newListbtn.textContent=jsDataList[i].name;
        newListbtn.classList.add(jsDataList[i].color);
        newListbtn.value=jsDataList[i].list_id;
        
        listItems.appendChild(newListbtn);
    }

    let listbtns=document.querySelectorAll("#listItem button");

    for(let btn of listbtns){

        btn.onclick = async function(){
            let Tasks= await service.getTaskbyListid(btn.value);
            showtasks(Tasks);

            for(let btn of listbtns){
                btn.classList.remove("chosenList");
            }

            btn.classList.add("chosenList");
            listTitle.innerHTML=btn.textContent;
        } 
    }

}

// ________________________List_______________________
try{
    let allLists = await service.getAlllists();
    showLists(allLists);
    
}catch(e){
    console.log(e);  
}

// ________________________Task_______________________

try{
    let Task = await service.getTaskbyId(2); 
}catch(e){
    console.log(e);  
}

try{
    let allTasks = await service.getAlltasks();
    showtasks(allTasks);
}catch(e){
    noTask();
    console.log(e);  
}

try{
    let withAddedtasks = await service.addTask(Task);
    showtasks(withAddedtasks);
}catch(e){
    noTaskadded();
    console.log(e);  
}

try{
    let withEditedtasks = await service.editTask(Task);
    showtasks(withEditedtasks);
}catch(e){
    console.log(e);  
}

     
    
   






