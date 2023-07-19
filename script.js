import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push, onValue, remove, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
let inputId = document.getElementById("input-id")
let btnId =document.getElementById("btn")
let listId = document.getElementById("listid")
const appSettings = {
    databaseURL:"https://workout-scheduler-40dfa-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const workoutListInDb = ref(database,"Workout-List")

btnId.addEventListener("click",function(){
    let val = inputId.value
    push(workoutListInDb,val)
    inputFieldClear()
    
})
onValue(workoutListInDb,function(snapshot){
    if(snapshot.exists())
    {
        let listItems = Object.entries(snapshot.val())
        clearListId()
        for(let i=0;i<listItems.length;i++)
        {
            let currentItem=listItems[i]
            appendOnListId(currentItem)
        }
    }
    else{
        listId.textContent="No Workouts On the List Right Now!"
    }
   
})


function inputFieldClear(){
   inputId.value=""
}
function clearListId(){
    listId.innerHTML=""
}
function appendOnListId(item){
    let itemId = item[0]
    let itemValue = item[1]
    let newElement = document.createElement("li")
      newElement.textContent=itemValue
    newElement.addEventListener("dblclick",function(){
        let location = ref(database,`Workout-List/${itemId}`)
        remove(location)
    })
  listId.append(newElement)
}