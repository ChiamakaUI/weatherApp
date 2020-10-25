if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener("DOMContentLoaded", ()=>{
    let count = Number(window.localStorage.getItem("count"));
    if (!count) {
    window.localStorage.setItem("count", "0");
    }
    

    const text = document.getElementsByClassName("textArea");
    const input = document.querySelector('.input');
    const submit = document.getElementById("getWeather");
    const date = document.getElementById('date').innerHTML = new Date().toDateString()
    
    const apikey = "c4ec3ab5f73cb27b68f1ecd92483b0e5";
    
    submit.addEventListener('click', getWeatherReport);

    async function getWeatherReport(e){
  
        e.preventDefault();
        
      
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}`)
      
        const { weather, main } = await data.json()
      
        
        let output = `<h3>${input.value}</h3>`;
        weather.forEach(function(weather){
          output += ` <div>
          <h2>${weather.main} </h2>
          <h2>${main.temp}</h2>
          <img src= "http://openweathermap.org/img/wn/${weather.icon}@2x.png" />
          <p>${weather.description} </p>
          </div>
          `;
        });

        document.getElementById('weatherOutput').innerHTML = output;
        document.getElementById('weatherOutput').style.backgroundColor = "#00C3FF";
    
        
        


  count +=1;
   window.localStorage.setItem("count", count);

   window.localStorage.setItem(count, input.value);

input.value = '' 

}


for (i = 0; i < count + 1; i++) {
    let noteTitle = window.localStorage.key(i);
    let noteContent = window.localStorage.getItem(noteTitle);

    if (noteTitle !== "count" && noteTitle) {
    createNote(noteTitle, noteContent);
    }
}

})


