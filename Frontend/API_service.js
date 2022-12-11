// import Task from "./task_class.js";

const baseURL="https://localhost:44357/api/";

function checkFetch(response){
    if(response.ok){
        return response;
    }else{
        throw new Error(`${response.status}`);
    }
    // }else if(response.status === 404){
    //     throw new Error("404 Not found");
    // }else if(response.status === 400){
    //     throw new Error("400 Bad Request");
    // }else if(response.status >= 500){
    //     throw new Error("server error");
    // }
}
/*______________ Lists _________________________ */

export async function getAlllists(){
    let response = await fetch(`${baseURL}List`);
    checkFetch(response);
    let allLists = await response.json();
    return allLists;
}


/*______________ Tasks _________________________ */


export async function getAlltasks(){
    
    let response = await fetch(`${baseURL}Task`);
    checkFetch(response);
    let allTasks = await response.json();
    return allTasks;
}

export async function getTaskbyId(id){
    let response = await fetch(`${baseURL}Task/${id}`);
    checkFetch(response);
    let Task = await response.json();
    return Task;
}
export async function getTaskbyListid(id){
    let response = await fetch(`${baseURL}grouptasks/${id}`);
    checkFetch(response);
    let Tasks = await response.json();
    return Tasks;
}

export async function addTask(Task){
    let response = await fetch(`${baseURL}Task`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(Task),
    });
    checkFetch(response);
    let Tasks = await response.json();
}

export async function editTask(Task){
    let response = await fetch(`${baseURL}Task`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(Task),
    });
    checkFetch(response);
    let Tasks = await response.json();
}



