
import { useState } from 'react';
import './App.css';
import data from "./resources/countryData.json";

function App() {
  const [count, setCount] = useState("");
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setCount(searchTerm);
    setAutocompleteVisible(searchTerm.length > 0);
  }

  const search = (searchTerm) => {
    setCount(searchTerm);
    setAutocompleteVisible(false);
  }

  const handleKey = (e) => {
    if (e.key === "Escape") {
      console.log("Escape key pressed");
      setAutocompleteVisible(false);
    } else {
      setAutocompleteVisible(count.length > 0);
    }
  }

  const filteredItems = data.filter((item) => {
    const searchTerm = count.toLowerCase();
    const name = item.name.toLowerCase();
    return name.startsWith(searchTerm);
  });

  const handleButtonClick = () => {
    console.log("Escape");
    search(count);
  }

  return (
    <>
      <div className='Body'>
         <h1>Search</h1>
         <div>
           <input type="text" value={count} onChange={handleChange} onKeyDown={handleKey} />
           <button onClick={handleButtonClick}>Search</button>
         </div>
         <div id='autocomplete' style={{ display: autocompleteVisible ? 'block' : 'none' }}>
           {filteredItems.length > 0 ? (
             <ul>
               {filteredItems.map((item) => (
                 <li key={item.name} onClick={() => search(item.name)}>
                   {item.name}
                 </li>
               ))}
             </ul>
           ) : (
             <p>No matching results</p>
           )}
         </div>
      </div>
    </>
  )
}

export default App;


