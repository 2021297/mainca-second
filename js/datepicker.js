//access and manipulate properties and methods of that element in your JavaScript code
let startDate = document.getElementById('startDate') 

//The function that should be executed when the event occurs
startDate.addEventListener('change',(e)=>{
  let startDateVal = e.target.value
  document.getElementById('startDateSelected').innerText = startDateVal
  console.log(startDateVal);


  // function to send the data data 
})




