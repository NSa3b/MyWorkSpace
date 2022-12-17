import * as service from "./API_service.js";
import {List, Task} from "./Model_class.js";

// ________________________List_______________________

let allLists = await service.getAlllists();

let ListbyId = function(x){
  return  service.getListbyId(x); 
}

let AddList =function(List){
    return service.addList(List);
} 
let editList =function(List){
    return service.editList(List);
}
let deleteListbyId= function(Id){
    return service.deleteList(Id)
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









 const noTask= function(){
   
    let todoList=document.getElementById("todoList");
    let oldtodoList=document.getElementById("oldtodoList");
    oldtodoList.textContent = todoList.textContent = '';
    let msg =document.createElement("p");
    msg.textContent="No tasks in this List.Create some!"
    todoList.appendChild(msg);

}
 const noTaskadded= function(){
    alert("No task added!");
}


const showtasks= function(jsData){

    let todoList=document.getElementById("todoList");
    let oldtodoList=document.getElementById("oldtodoList");
    oldtodoList.textContent = todoList.textContent = '';

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
        newDeleteBtn.setAttribute("id","deleteTask");
        newDeleteBtn.value=jsData[i].id;

        if(jsData[i].done){
            newli.classList.add("checked");
        }

        newContainer.append(newCheckBtn,newTask);
        newli.append(newContainer,newDeleteBtn);

        let Today=new Date()
        Today.setUTCHours(0,0,0,0);
        Today=Today.toISOString().slice(0,-5);

        if(jsData[i].date_added==Today){
            console.log("yes");
            todoList.appendChild(newli);
        }
        else{
            console.log("no");
            oldtodoList.appendChild(newli);
        }

       

        

    }

}


const showLists=function(jsDataList){

    let listbtns=document.querySelectorAll("#listItem .Items");
    for(let btn of listbtns){
        btn.remove();
    }

    let listItems=document.getElementById("listItem");
    let listNum=document.getElementById("listNum");
    listNum.textContent=(`(${jsDataList.length})`);
    

    for(let i=0;i<jsDataList.length;i++){

        let newListbtn=document.createElement("button");

        newListbtn.textContent=jsDataList[i].name;
        newListbtn.classList.add(jsDataList[i].color);
        newListbtn.classList.add("Items");
        newListbtn.value=jsDataList[i].id;
        
        listItems.insertBefore(newListbtn,listItems.children[0]);
    }

    let allListbtns=document.querySelectorAll("#listItem button.Items");

    for(let btn of allListbtns){

        btn.onclick = async function(){

            for(let btn of allListbtns){
                btn.setAttribute("id","");
            }
            btn.setAttribute("id","chosenList");

            let listTitle=document.getElementById("listTitle");
            listTitle.innerHTML=btn.textContent;

            await getTaskbyListid(btn.value)
            .then((Tasks)=>{
                showtasks(Tasks);
            })
            .catch(e=>{
                console.log(e);
                noTask();
            });
            
            
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
            let returnedTasks = await editTask(task);
            showtasks(returnedTasks);
        }
        else{
            task.done=true;
            let returnedTasks = await editTask(task);
            showtasks(returnedTasks);
        }
    }

    if(event.target.matches("#deleteTask")){
        let id=event.target.value;
        let returnedTasks= await deleteTaskbyId(id);
        showtasks(returnedTasks);
    }

    if(event.target.matches("#addlistcolors button")){
        let allcolorbtn=document.querySelectorAll("#addlistcolors button");
        for(let btn of allcolorbtn){
            btn.setAttribute("id","");
        }
        event.target.setAttribute("id","chosenListcolor");
    }

    if(event.target.matches("#editlistcolors button")){
        let allcolorbtn=document.querySelectorAll("#editlistcolors button");
        for(let btn of allcolorbtn){
            btn.setAttribute("id","");
        }
        event.target.setAttribute("id","existingListcolor");
    }

    if(event.target.matches("#openEditlist")){
        
        let Listid=document.getElementById("chosenList").value;
        let listTobeUpdated = await ListbyId(Listid);
        document.getElementById("existingList").value=listTobeUpdated.name;
        let allcolorbtns=document.querySelectorAll("#editlistcolors button");
        for(let btn of allcolorbtns){
            if(btn.value==listTobeUpdated.color){
                btn.setAttribute("id","existingListcolor");
            }
        }
    }
    
    if(event.target.matches("#editlistbtn")){

        let Listid=document.getElementById("chosenList").value;
        let newListname=document.getElementById("existingList").value;
        let newListcolor=document.getElementById("existingListcolor").value;
        let newList=new List(Listid,newListname,newListcolor);

        let returnedLists = await editList(newList);
        showLists(returnedLists);
        getTaskbyListid(Listid).then((data)=>{showtasks(data)});
    }

    if(event.target.matches("#deletelistbtn")){
        let Listid=document.getElementById("chosenList").value;
        console.log(Listid);
        let alltasks= await getTaskbyListid(Listid);
        for(let task of alltasks){
            let id=task.id;
            await deleteTaskbyId(id);
        }
        let returnedLists = await deleteListbyId(Listid);
        showLists(returnedLists);
        let allTasks = await service.getAlltasks();
        showtasks(allTasks);
    }

    if(event.target.matches("#showAlltasks")){
        let allTasks = await service.getAlltasks();
        showtasks(allTasks);
        document.getElementById("listTitle").innerHTML="All Tasks";
        let allListbtns=document.querySelectorAll("#listItem button.Items");
        for(let btn of allListbtns){
            btn.setAttribute("id","");
        }
    }



});

let addTaskbtn=document.getElementById("addtaskbtn");
addTaskbtn.addEventListener("click", async function(){

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
        console.log(returnedTasks);
        showtasks(returnedTasks);
    }
    else{
        alert("no task to add.write something!:)")
    }


})

let addListbtn=document.getElementById("addlistbtn");
addListbtn.addEventListener("click",async function(){
    let newListname=document.getElementById("newList").value;
    let newListcolor=document.getElementById("chosenListcolor").value;
    let newList=new List(null,newListname,newListcolor);
    let returnedLists= await AddList(newList);
    showLists(returnedLists);

})




 
