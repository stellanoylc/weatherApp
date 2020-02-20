import React from 'react';



import WeatherMain from './pages/weatherMain'

function App() {
  return (
    <div className="App">
      <header className="App-header">  
      </header>
      <div className="w-full bg-blue-400">
        <h5 className="text-white font-bold py-2 px-4">WeatherApps</h5>
      </div>
      
      <div className="flex my-4 mx-4">
        
        <div className="items-center h-screen w-full">
          
            
            <WeatherMain/>
            
          
          
        </div>

        

      </div>
     
      
    </div>
  );
}

export default App;
