import React, { useState } from 'react'
export function Body() {

    const [city, setCity] = useState('')
    const [temp, setTemp] = useState('')
    const [Data, setData] = useState(false)

    const url = `http://api.weatherapi.com/v1/forecast.json?key=e8c3f8a3032740dbab2153747212505&q=${city}&days=1&aqi=no&alerts=no
    `
    function FetchApi(e) {
        submitButtonHandler(e)
        if (city) {
            fetch(url)
                .then(response => {
                    return response.json()
                    // console.log(response);
                }).then(data => {
                    setData(data)
                    setTemp(data.current.feelslike_c);
                    console.log('Data Inside then ', data)
                    return console.log(data)
                })
                .catch(err => {
                    console.error('Error occured', err);
                });
        }
    }

    function submitButtonHandler(e) {
        e.preventDefault()
        return console.log('Data', Data)
    }

    const ele = document.getElementById('body')
    if (Data && !Data.error) {
        {console.log("Data ---",Data)}

        switch (Data.current.condition.text) {
            case 'Sunny':
                console.log('Sunny')
                ele.style.backgroundImage = 'url(https://i2-prod.examinerlive.co.uk/incoming/article10372520.ece/ALTERNATES/s1227b/JS75768352.jpg)'
                break;
            case 'Partly cloudy':
                console.log('partly cloud')
                ele.style.backgroundImage = 'url(https://www.glamtush.com/wp-content/uploads/2018/11/NiMET-sunny-partly-cloudy-weather.png)'
                break;
            case 'Cloudy':
                ele.style.backgroundImage = 'url(https://www.gannett-cdn.com/-mm-/0c735c5d2b0f1989b42d9afa3456359870b1594d/c=0-201-2054-1362&r=x1683&c=3200x1680/local/-/media/MIGroup/PortHuron/2014/08/27/1409139184000-Cloudy.jpg)'
                break;
            case 'Rainy':
                ele.style.backgroundImage = 'url(https://www.bviddm.com/wp-content/uploads/2016/11/rainy-weather.jpg)'
                break;
            case 'Mist':
                ele.style.backgroundImage = 'url(https://i2-prod.mirror.co.uk/incoming/article9534551.ece/ALTERNATES/s615b/Foggy-weather.jpg)'
                break;
            case 'Overcast':
                ele.style.backgroundImage = 'url(http://images.unsplash.com/photo-1485249245068-d8dc50b77cc7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9)'
                break;
            case 'Moderate or heavy rain shower':
                ele.style.backgroundImage = 'url(https://www.bviddm.com/wp-content/uploads/2016/11/rainy-weather.jpg)'
                break;
            default:
                ele.style.backgroundImage = 'url(https://www.wanderlustchloe.com/wp-content/uploads/2018/04/Holbox-2018-1.jpg)'
                break;
        }
    }

    return <>
        <div className='center-box' >
            <form onSubmit={(e) => FetchApi(e)}>
                <input type="text" className="form-control my-2 txt" onChange={(e) => setCity(e.target.value)} value={city}></input>
                <button type="submit" className="btn btn-primary mb-3 button">Search</button>
                {console.log('City -', city)}
                {console.log("Data",Data)}
            </form>
            {(Data && city && !Data.error) ?
                <div className='weather-info'>
                    <h2 className='city info'>{Data.location.name}</h2>
                    <h2 className='temp info'>{temp} &deg;C</h2>
                    <h2 className='infotxt info'>{Data.current.condition.text}</h2>
                </div> : <h2 className='nodata'>No Data Found</h2>}
        </div>
    </>
}