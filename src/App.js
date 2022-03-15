// import img from './assets/dog.jpg'
import './App.css';
import * as ml5 from "ml5";
import {useEffect, useState} from 'react'

function App() {
  const [imageURL, setImageURL] = useState('')
  const [prediction, setPrediction] = useState({
    label: '',
    confidence: '',
  })

  const handleSubmit = e => {
    e.preventDefault();
    mobileNetClassfier();
  };

  const handleInputChange = e => {
    
    setImageURL(e.target.value);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const handleOnChange = () => {
    setImageURL(`https://source.unsplash.com/random/400x400?sig=${getRandomInt(10)}`);
    
    setTimeout( ()=>{
      mobileNetClassfier();
    }, 300);

  }

  function mobileNetClassfier() {
   let mobilenet = ml5.imageClassifier('MobileNet', ()=> {
      
      const image = document.getElementById('imgsrc')
      
      mobilenet.predict(image, (err, data)=> {
        if(err){
          console.error(err)
        }
        else {
          
          setPrediction({
            label: data[0].label,
            confidence: (Math.round((data[0].confidence) * 100) / 100).toFixed(2) * 100 + '%'
          });
          
        }
      })
    })
  }

  
  return (
    <div className="App">
        <h3 className='mb-5 text-primary'>Image Recognition using ML5</h3>
        <div className="image-box shadow-lg p-3 card mb-4">
          <img crossOrigin="anonymous" id='imgsrc' src={imageURL} alt=" not found" />
        </div>
      <div className='d-flex justify-content-center boder mb-4'>
        <input className='form-control ' onChange={handleInputChange} type="text" value={imageURL} id='imgURL' placeholder='Ener Image URL' />
        <button className='btn btn-primary ml-2' onClick={handleSubmit}>Submit</button> <br/>
      </div>
      
      <button className='btn btn-warning' onClick={handleOnChange} type="text" id='' >Load Random Image</button>
        <p className='text-muted mt-4'>The Above Image Is Predicted as <span className='text-info font-weight-bold text-capitalize'>{prediction.label}</span> With Confidence of <span className='text-info font-weight-bold'>{prediction.confidence}</span>  </p>
        
    </div>
  );
}

export default App;
