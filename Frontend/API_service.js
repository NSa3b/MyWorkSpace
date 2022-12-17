

const baseURL="https://localhost:44357/api/";

function checkFetch(response){
    if(response.ok){
        return response;
    }else{
        throw new Error(`${response.status}`);
    }
}
/*______________ Lists _________________________ */

export async function getAlllists(){
    let response = await fetch(`${baseURL}List`);
    checkFetch(response);
    let allLists = await response.json();
    return allLists;
}

export async function getListbyId(id){
    let response = await fetch(`${baseURL}List/${id}`);
    checkFetch(response);
    let List = await response.json();
    return List;
}

export async function addList(List){
    let response = await fetch(`${baseURL}List`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(List),
    });
    checkFetch(response);
    let Lists = await response.json();
    return Lists;
}

export async function editList(List){
    let response = await fetch(`${baseURL}List`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(List),
    });
    checkFetch(response);
    let Lists = await response.json();
    return Lists;
}

export async function deleteList(id){
    let response = await fetch(`${baseURL}List/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    });
    console.log(response);
    checkFetch(response);
    let Lists = await response.json();
    return Lists;
}


/*_______________________ Tasks _________________________ */


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
   
    let response = await fetch(`${baseURL}grouptasks/${id}`)
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
    return Tasks;
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
    return Tasks;
}

export async function deleteTask(id){
    let response = await fetch(`${baseURL}Task/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    });
    console.log(response);
    checkFetch(response);
    let Tasks = await response.json();
    return Tasks;
}



