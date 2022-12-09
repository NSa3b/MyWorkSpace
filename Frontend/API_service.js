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

export async function getAlltasks(){
    
    let response = await fetch(`${baseURL}Task`);
    checkFetch(response);
    let allTasks = await response.json();
    return allTasks;
}

export async function getAlllists(){
    let response = await fetch(`${baseURL}List`);
    checkFetch(response);
    let allLists = await response.json();
    return allLists;
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

 



    


// let allTasks=async function(){
//     try{
//         let allTasks=await getAlltasks();
//         console.log(allTasks);
//     }
//     catch(error){
//         console.log("something went wrong!",error)
//     }
     
// }

// let Tasks=async function(){
//     try{
//         let Tasks=await getTaskbyId();
//         // console.log(Tasks);
//         return Tasks;
//     }
//     catch(error){
//         console.log("something went wrong!",error)
//     }
     
// }



