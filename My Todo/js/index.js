// toastify code
const showNotification = (msg , type) => {

  let bgColor;
   switch (type){
    case "success":
      bgColor = "linear-gradient(to right , #1D976C , #93F9B9)";
      break;
     case "error":
      bgColor =  "linear-gradient(to right , #93291e , #ed213a)";
      break;
     default : {
       bgColor = "black"
     }  
   }


  Toastify({
    text: msg,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bgColor,
    },
    onClick: function(){} // Callback after click
  }).showToast();
  
}

// functio of get input values;
const getInputValue = (inputVlaue) =>{
  return document.getElementById(inputVlaue).value;
}

// function of random id
const randomId = () => {
  return Math.random().toString(36).slice(2);
}

// function of empty input values
const emptyInputValues = () => {
  document.getElementById("title").value = "";
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";
}

// function of clear output
function clearOutput(){
  return document.getElementById("showOutput").innerHTML = "";
}

// function of handleSubmit
const handleSubmit = () => {
  event.preventDefault();

  // declared variables
  // fisrt way
  // let title = getInputValue("title");
  // let location = getInputValue("location");
  // let description = getInputValue("description");


  // second way of desclared variables
  let title = getInputValue("title") , location = getInputValue("location") , description = getInputValue("description");

  title = title.trim();
  location = location.trim();
  description = description.trim();

  // validation
  if(!title || title.length < 3){
    showNotification("Enter your title correctly" , "error");
    return;
  }
  
  if(!location || location.length < 3){
    showNotification("Enter your location correctly" , "error");
    return;
  }
  
  if(!description || description.length < 10){
  showNotification("Enter your description correctly" , "error");
  return;
}

// declared object
let todo = { title , location , description };
todo.id = randomId();
todo.status = "active";
todo.dateCreated = new Date();



// previous way of making an array and set in localstorage was 

// let todos = localStorage.getItem("todoList");
// if (todos === null){
//   todos = []
// } else {
//   todos = JSON.parse(todos)
// }

// todos.push(todo);
// localStorage.setItem("todoList" , JSON.stringify(todos));
// let myTodoList = JSON.parse(localStorage.getItem("todoList"));
// console.log(myTodoList);
// return




// another way
// set in localStorage
const todos = JSON.parse(localStorage.getItem("todoList")) || [];
todos.push(todo);
localStorage.setItem("todoList" , JSON.stringify(todos));


// showing notification
showNotification("A Task have been added Successfully" , "success");

// empty input values
emptyInputValues();
 
// showing tdoos as a table in output
showTodos();


}

// window onlaod
showTodos();


// function of showTodos

function showTodos  ()  {
  clearOutput();
  const mytodo = JSON.parse(localStorage.getItem("todoList")) || [];
  // showing output
  if (!mytodo.length){
    document.getElementById("showOutput").innerHTML =  `<h3 style = "color : red;">There is no Task Available ! Click on Add Task..</h3>`;
  }
  
  // start table content 
  let tableStartCode = `<div class="table-responsive"> <table class="table">`;
  let tableHeader = `<thead><tr> <th>#</th> <th>Title</th> <th>Location</th> <th>Description</th> <th>Actions</th> </tr></thead>`;
  let tableBody = "";
  let tableEndCode = `</table></div>`;
  for (let i = 0 ; i < mytodo.length ; i ++){
    let todo = mytodo[i];
    tableBody += `<tbody> <tr> <td>${i + 1}</td>  <td>${todo.title}</td> <td>${todo.location}</td> <td>${todo.description}</td> <td><button class="btn btn-info" data-value ="${todo.id}" onClick = "editTodo(event);">Edit</button>  <button class="btn btn-danger" data-value ="${todo.id}" onClick = "deleteTodo(event);">Delete</button></td> </tr> </tbody>`;
     document.getElementById("showOutput").innerHTML = tableStartCode + tableHeader + tableBody + tableEndCode;
  }
  
  // document.getElementById("addTask").style.display = "block";
  // document.getElementById("updateTask").style.display = "none"

  document.getElementById("addTask").style.display = "block";
document.getElementById("addTask").style.margin = "auto";
document.getElementById("updateTask").style.display = "none";


}

// function of delete todos
const deleteTodo = (event) => {
     let id = event.target.getAttribute("data-value");
     let todos = JSON.parse(localStorage.getItem("todoList"));
     let newTodos = todos.filter((element , index) => {
       return element.id !== id
     });
     localStorage.setItem("todoList" , JSON.stringify(newTodos));
     showNotification("A task have been Deleted" , "error");
     showTodos();
  }



    // // set input value
    const input =(input , valueInput) =>{
      return  document.getElementById(input).value = valueInput;
    }


  // edit todos function
  
  const editTodo = (event) => {

    let editId  = event.target.getAttribute("data-value");
    let todos = JSON.parse(localStorage.getItem("todoList"));
    // console.log(todos);

    let newEditTodo = todos.find((element) => {
      return element.id == editId;
    })

    // destructuring object
    // const { title , location , description , id , status , dateCreated } = newEditTodo
    // console.log(newEditTodo);
    // second way of destructuring..............
    //  newEditTodo.title =  element.title;
    //  newEditTodo.location = element.location;
    //  newEditTodo.description = element.description; 


    const { title , location , description } = newEditTodo

    // first way
    // document.getElementById("title").value = title;
    // document.getElementById("location").value = location;
    // document.getElementById("description").value = description;


    // second way of assign values to input field by making function 
    input("title" , title);
    input("location" , location);
    input("description" , description);

    localStorage.setItem("todoForEdit" , JSON.stringify(newEditTodo));

    // document.getElementById("addTask").style.display = "none";
    // document.getElementById("updateTask").style.display = "block";

    document.getElementById("addTask").style.display = "none";
document.getElementById("updateTask").style.display = "block";
document.getElementById("updateTask").style.margin = "auto";


  }



  // handle Edit function

  const handleEdit = () => {

    let todoforEdit = JSON.parse(localStorage.getItem("todoForEdit"));
    let updatedTitle = getInputValue("title");
    let updatedLocation = getInputValue("location");
    let updatedDescription = getInputValue("description");

    const updatedTodo = {...todoforEdit , title : updatedTitle , location : updatedLocation , description : updatedDescription } 
     updatedTodo.dateModified = new Date() 

     localStorage.removeItem("todoForEdit");
     localStorage.setItem("updated" , JSON.stringify(updatedTodo));


     let updated = JSON.parse(localStorage.getItem("updated")); 
     let todoList = JSON.parse(localStorage.getItem("todoList"));
     let updatedTodos = todoList.filter((todo) => {
      return todo.id !== updated.id
     })
     localStorage.setItem("todoList" , JSON.stringify(updatedTodos));
     console.log(updatedTodos); 
     
  }







  // front end js work
  function updateDateTime() {
    const now = new Date();
  
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  
    const formattedDate = `Today is ${now.toLocaleDateString('en-US', dateOptions)}. `;
    const formattedTime = `Time is ${now.toLocaleTimeString('en-US', timeOptions)}`;
  
    const displayString = `${formattedDate} ${formattedTime}`;
    document.getElementById("showDateAndTime").innerHTML = displayString;
  }
  
  // Update the date, time, and seconds every second (1000 milliseconds)
  setInterval(updateDateTime, 1000);
  
  // Initial call to display the date, time, and seconds immediately
  updateDateTime();



  // greetings
  let userName; 
  do{
     userName = prompt("Enter Your Name Please!");
  } while (userName === "" || userName === 0 || userName === null || userName.length < 3)
  window.onload = userName;

  // Unicode character for the smiley emoji
const smileyEmoji = "\u{1F60A}";

document.getElementById("greetings").innerHTML = `Hellow ${userName}! Hope You Are Doing Well ${smileyEmoji}`;

// year 
window.onload = function() {
  let now = new Date();
  let year = now.getFullYear();
  document.getElementById("showYear").innerHTML = year;
};
