const input = document.querySelector(".input")
const submit = document.querySelector(".submit-btn")
const warning = document.querySelector(".warning")

// Here we add the names of the cities already displayed so later we can check if one element is present by using .contains method
let cities = []


// submit clicking function
submit.addEventListener("click", () => {
 
  // We have to check if the input is empty, if it is we give a warning
  if(!input.value) {
    warning.innerText = "Please enter a city"
    setTimeout(() => {
    warning.innerText = ""
    }, 2000)
  }
  // if else  we call the api with fetch method
  else {
    const getTheCity = () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value.toLowerCase()}&appid=74935d8e2f81455102caaeb68d8bb24d`
     fetch(url)
     .then((res) => {
      // Here we write an error if the entered city doesn't exist
      if(!res.ok) {
        warning.innerText = `Please enter a valid city`
        setTimeout(() => {
          warning.innerText = ""
          }, 3000)
      }
      // we jsonfy the value
      return res.json()
       })
     .then((data) => {
      
      // destructuring the name, it is the only value that we need since we just push the names to the array and it is enough to check for duplicates
      const {name} = data
      console.log(name);
      // Here we check for duplicated values by using an if inside the if
      if(cities.includes(name.toLowerCase())) {
        warning.innerText = `${name} is already displayed`
        // we use the settime out to delete our warning in some seconds
      setTimeout(() => {
      warning.innerText = ""
      }, 3000)
      // Here we limit the number of cities to 4
      } else if(cities.length >= 4){ {
       warning.innerText = `The maximum number of displayed cities is 4`
       // we use the settime out to delete our warning in some seconds
     setTimeout(() => {
     warning.innerText = ""
     }, 3000)
      } 
      } 
      else {
        displayTheCity(data)
       
      }
       
     })
    
   } 
   
   const displayTheCity = (data) => {
    // Here we get the values that we need by destructuring.
    // I had to destructure the weather first alone then get the values inside it with another destructuring. It was an array inside the objects that included other objects
     const weatherContainer = document.querySelector(".weather-container")
     const {weather} = data
     const {main, icon, description} = weather[0]
     const {name, sys:{country}, main:{temp} } = data
     // The default temperature unit is kelvin so we have to reformulate it to celcius 
     const celcius = (temp - 273.15).toFixed()
     // Pushing the name of the cities is crucial since we need to recheck for duplicates later
     cities.push(name.toLowerCase())
     console.log(cities);
     
     // Here we create the card inside the weatherContainer
     weatherContainer.innerHTML = `<div class="city-card">
     <h2 class="name">${name} <span>${country}</span></h2>
     <h2 class="degree">${celcius} <span>°C </span> </h2>
     <img src="./icons/${icon}.png" alt="">
     <p class="description">${description}</p>
     
   </div>` + weatherContainer.innerHTML;

   }
   // Here we call the function
   getTheCity()
   input.value = ""
  }
  
})


input.addEventListener("keydown", (e) => {
  if(e.code === "Enter") {
    submit.click()
  }
})