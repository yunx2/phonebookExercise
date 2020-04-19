import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState(
    [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]
  );

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState(null);
  // const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  
  const handleChangeName = (e) => {
    // get value from events object
    // use set newName to change state newName to value
    const val = e.target.value;
    setNewName(val);
  };

  const handleChangeNumber = (e) => {
    const val = e.target.value;
    setNewNumber(val);
  }

  const handleChangeFilter = (e) => { 
    const term = e.target.value.toLowerCase();
    console.log(term);
    // setSearchTerm(term.toLowerCase());
    const filtered = persons.filter(person => {
      let name = person.name.toLowerCase();
      // let number = person.number; // number should already be a string
      return name.includes(term);
    });
    setFilteredResults(filtered);
  }

  const addPerson = (e) => {
    e.preventDefault(); // default behavior of button type=submit is to reload page
    const filtered = persons.filter(p => p.name === newName); // check for duplicate entries
    if (filtered.length === 0) {
      const newPerson = {name: newName, number: newNumber};
      const updated = persons.concat(newPerson);
      setPersons(updated); 
    } else {
        alert(`${newName} is already added to phonebook`);
    }
    setNewName(''); // clears newName after persons is updated, so clicking add again will not add the same name again
    setNewName('');
  }

  let phonebook;
  if (filteredResults.length === 0) {
    phonebook = persons.map(person => {
      return (<p key={person.name}>{person.name} {person.number}</p>);
    })
  } else {
    phonebook = filteredResults.map(result => <p key={result.name}>{result.name} {result.number}</p>)
  }

  return (
    <div>
      <div> debug: 
      persons: {JSON.stringify(persons)} <br />
      filtered: {JSON.stringify(filteredResults)} <br />
      </div>
      <h2>Phonebook</h2>
      <div> filter shown with
        <input onChange={handleChangeFilter}/>
      </div>
      <h2>add new</h2>
      <form>
        <div>
          name: <input onChange={handleChangeName} />
        </div>
        <div>number: <input onChange={handleChangeNumber}/></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {phonebook}
    </div>
  )
}

export default App;

// debugging 2.9, step4: // problem:  state filtered is not up to date with the user input (is one letter behind)
  // examine where setSearchTerm amd setFilteredResults are and identify where re-renders are happening
    //results: filtering works when search term is removed from being a state; state change is happening after render?

// 2.9 add filter functionality; user input in text box, determines whech person objects in persons array to render
  // add new state of results after filtering
  //add new state to keep track of results of filtering
  // add onChange handler to synchronize user input to state
  // filter logic
    // convert searchTerm to lowercase
    // use array.filter
      // test: does search term occur as substring in person.name or person.number..use String.includes()
// filtering happens onChange so filtering logic should be inside handleChangeFilter
// add condition to determine whether to render persons array or the filtered results...condition: if input for filter is emply...?

//2.8 add ability to add a phone number with name
// new input element/textbox
// new piece of state to keep track of number input
// onChange handler on input tag to synchronize state to input
// onclick handler to add name and number to persons list
  // since there's one button for box text boxes add inClick handler to form element?

// 2.7 add data validation: in addPerson use array.includes to check if user input already exists in persons

// get app to render persons state: use array.map() used to render array of names

// add names to list: 
//1. text input will have an onChange handler to set user input to newNamestate 
//2. button element will have an onClick handler that adds the value in newName //into the persons array
//  - handler wraps newName in an object and then concats it to persons. then handler users setPersons to set concatenated array as state. then clears textbox