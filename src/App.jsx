import { useState, useCallback, useRef } from 'react';

import './App.css';

function App() {
  const [length, setLength] = useState();
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef=useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";
  
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToclipBoard=useCallback(()=>{
    passwordRef.current.select();
window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className="pass1">
      <h1 className="text-center mb-4">Password Generator</h1>
      <div className="mb-4">
        
        <label className="block3">Length: {length}</label>
        <input 
           type="range"
           min={6}
           max={100}
          value={length} 
          onChange={(e) => setLength(Number(e.target.value))} 
          className="length" 
        />
      </div>
      <div className="mb2">
        <label className="block2">
          <input 
            type="checkbox" 
            checked={numberAllowed} 
            onChange={() => setNumberAllowed(!numberAllowed)} 
          /> 
          Include Numbers
        </label>
      </div>
      <div className="mb1">
        <label className="block1">
          <input 
            type="checkbox" 
            checked={charAllowed} 
            onChange={() => setCharAllowed(!charAllowed)} 
          /> 
          Include Special Characters
        </label>
      </div>
      <button 
        onClick={passwordGen} 
        className="Gen1"
      >
        Generate Password
      </button>
      {password && (
        <div className="Genpass">
          <p>Generated Password:</p>
       
          <input type='text'
          value={password}
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
     
          <button onClick={copyPasswordToclipBoard} className="btn">copy</button>
        </div>
      )}
    </div>
  );
}

export default App;
