import './App.css';
import Emailer from "./Components/EmailPage";
import React, { useState } from 'react';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [createDesign, setCreateDesign] = useState(false);
  const [uploadData, setUploadData] = useState(null);

  let newDesign = () =>{
    setCreateDesign(true);
    setShowHome(false);
  }

  let saveFile = (e) => {
    e.preventDefault();
    // let file = e.target.files[0];
    // console.log(file);
    
    setShowHome(false);
    var reader = new FileReader();

    reader.onload = function(e) {
      var jsonObj = JSON.parse(e.target.result);
      console.log(jsonObj);
      setUploadData(jsonObj);
    }
  
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="App">
        {showHome === true && 
          <div>
            <p>New Design</p>
            <button onClick={newDesign}>Create New</button>
            

            <p>Load Design</p>
            <input type="file" id="uploadSave" onChange={saveFile}></input>
          </div>
        }
        {(showHome === false && createDesign === true) && 
          <div>
            <Emailer />
          </div>
        }
        {(showHome === false && uploadData) && 
          <div>
            <Emailer saveFile={uploadData}/>
          </div>
        }
    </div>
  );
}

      
export default App;
