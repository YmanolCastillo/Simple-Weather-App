window.addEventListener("load", ()=> {
    let long; //Declaro Longitud
    let lat; // Declaro Latitud
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let LocationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
             //Declaro el Proxy para consumir los Servicios de manera Local

            const api = `${proxy}https://api.darksky.net/forecast/3a446d487d9156a3251263ab7e4af3ed/${lat},${long}`;
        
            fetch(api)
                .then(response => {
            return response.json(); //Me devuelve la Data en un Documento Json
        })
        .then(data => {

            const { temperature, summary, icon } = data.currently;

            //Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            LocationTimeZone.textContent = data.timezone;

            //Formula For Celcius
            let celcius = (temperature - 32) * (5 / 9);

            //Set Icon
            setIcons(icon, document.querySelector('.icon'));

            //Cambio del Celcius a Farenheit
            temperatureSection.addEventListener('click', ()=> {
                if(temperatureSpan.textContent === "F")
                {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celcius);
                }
                else
                {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            })
            });
        });

        function setIcons(icon, iconID)
        {
            const skycons = new Skycons({color: "white"}); //Declaro el Color que quiero que tenga el Icono que se cargue en ese momento
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play(); //Cargo la animacion del Icono
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    }
}); 