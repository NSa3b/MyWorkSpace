// import {Task} from "./task_class.js";
// import {Task} from "./API_service.js";
import * as service from "./API_service.js";




let addBtn=document.getElementById("addbtn");
let newtext=document.getElementById("newTask");
let listTitle=document.getElementById("listTitle");
let listbtn=document.querySelectorAll("#listItem button");
let listItems=document.getElementById("listItem");

const NoTask=function(){
    let todoList=document.getElementById("todoList");
    let msg =document.createElement("p");
    msg.textContent="No tasks for today.Create some!"
    todoList.appendChild(msg);

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

const showLists=function(jsDataList){

    let listNum=document.getElementById("listNum");
    listNum.textContent=(`(${jsDataList.length})`);

    for(let i=0;i<jsDataList.length;i++){

        let newListbtn=document.createElement("button");

        newListbtn.textContent=jsDataList[i].name;
        newListbtn.classList.add(jsDataList[i].color);
        newListbtn.value=jsDataList[i].list_id;
        
        listItems.appendChild(newListbtn);

        newListbtn.onclick= async function(){

            let Tasks= await service.getTaskbyListid(newListbtn.value);
            showtasks(Tasks);

            console.log(listbtn);
            for(let i of listbtn)
            {
                console.log(i.textContent);
                i.classList.remove("chosenList");
            }
    
            newListbtn.classList.add("chosenList");
            listTitle.innerHTML=newListbtn.textContent;



        };

    }

}


try{
    let Task = await service.getTaskbyId(2); 
}catch(e){
    console.log(e);  
}
try{
    let allTasks = await service.getAlltasks();
    showtasks(allTasks);
}catch(e){
    NoTask();
    console.log(e);  
}
try{
    let allLists = await service.getAlllists();
    showLists(allLists);
}catch(e){
    console.log(e);  
}

     
    
   






