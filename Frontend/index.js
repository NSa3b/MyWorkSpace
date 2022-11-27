let addBtn=document.getElementById("addbtn");
let newtext=document.getElementById("newTask");
let listTitle=document.getElementById("listTitle");
let listItems=document.querySelectorAll("#listItem button");

function addTask() {

    if(newtext!=""){

        let newli =document.createElement("li");
        let newContainer=document.createElement("div")
        let newTask=document.createElement("p");
        let newCheckBtn=document.createElement("button");
        let newDeleteBtn=document.createElement("button");
    
        newTask.textContent=newtext.value;
        newtext.value="";


        for(let item of listItems)
        {
            if(item.className.includes("chosenList")){
                let color=item.className.slice(0,item.className.indexOf(" "));
                newCheckBtn.classList.add(color+"btn","checkbtn");
               
            };
        }

        newDeleteBtn.classList.add("btn","btn-close","me-2");



        newCheckBtn.onclick= function(){
            if(newli.className!="checked"){

                newli.classList.add("checked");
            }
            else{
                newli.classList.remove("checked");
            }
        }

        newDeleteBtn.onclick=function(){
            newli.remove();
        }


        newContainer.append(newCheckBtn,newTask);
        newli.append(newContainer,newDeleteBtn);
    
        let todoList=document.getElementById("todoList");
        todoList.appendChild(newli);

        
    };
    
};


function init() {
    addBtn.addEventListener("click", addTask);

    for(let item of listItems){

        item.onclick=function(){
    
            for(let i of listItems)
            {
                i.classList.remove("chosenList");
            }
    
            item.classList.add("chosenList");
            listTitle.innerHTML=item.innerHTML;
        };
        
    };
}

init();






 
    



