let addBtn=document.getElementById("addbtn");
let newtext=document.getElementById("newTask");
let listTitle=document.getElementById("listTitle");
let listbtn=document.querySelectorAll("#listItem button");
let listItems=document.getElementById("listItem");



let getAllLists = new XMLHttpRequest();
getAllLists.open("Get","https://localhost:44357/api/List");
getAllLists.send();

let getAlltasks = new XMLHttpRequest();
getAlltasks.open("Get","https://localhost:44357/api/Task");
getAlltasks.send();

// let getTasksbyList=new XMLHttpRequest();
// getTasksbyList.open("Get","https://localhost:44357/api/grouptasks/"+ListID);
// getTasksbyList.send();



let showtasks=function(jsData){

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
    
        let todoList=document.getElementById("todoList");
        todoList.appendChild(newli);

      }

}

let showLists=function(jsDataList){
    for(let i=0;i<jsDataList.length;i++){
        // console.log(jsDataList[i]);

        let newListbtn=document.createElement("button");

        newListbtn.textContent=jsDataList[i].name;
        newListbtn.classList.add(jsDataList[i].color);
        newListbtn.value=jsDataList[i].list_id;
        
        listItems.appendChild(newListbtn);

        newListbtn.onclick=function(){
    
            // for(let i of listItems)
            // {
            //     i.classList.remove("chosenList");
            // }
    
            newListbtn.classList.add("chosenList");
            listTitle.innerHTML=newListbtn.textContent;



        };

    }

}


getAlltasks.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsData=JSON.parse(this.responseText);
    //   console.log(jsData);
      showtasks(jsData);
    }
};

getAllLists.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsDataList=JSON.parse(this.responseText);
    //   console.log(jsDataList);
      showLists(jsDataList);
    }
};
