import './App.css'

function App() {

  return (
  <>
    <div>
      <h1>Weather App</h1>
      <div className="search-bar">
        <div className='display'>
        <form>
         <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for City..."
          />
       </form>
       <button type="submit">
          Submit
          </button>
       </div>
       <div className="weather-forecast">
          <p>Location:</p>
          <p>Temperature: °C</p>
          <p>Humidity: </p>
          <p>Time & Date: </p>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
