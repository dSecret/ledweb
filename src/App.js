import React, { Component } from 'react';
import { ChromePicker } from 'react-color'
import logo from './logo.svg';
import './App.css';

let rgb = { r : 255, g:0, b: 255}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        red : 255,
        green : 255,
        blue : 255,
        status: false
    }
  }
  render() {
    return (
      <div id="App" className="cmn">
          <div className = "picker-wrapper cmn">
              <ChromePicker 
                  onChange = 
                  { e => this.handleChange(e['rgb']) }
              />
              <div id ="set-btn-cont">
                { this.state.status ?
                    <div className="spinner"> 
                    </div>
                  :
                  <div className ="set-btn cmn" onClick = {this.handleSetColor}>
                      Set
                  </div>                  
                }

              </div>
          </div>
     </div>
    );
  }
  handleChange = (e)=>{
      this.handleBackgroundUpdate(e)
      rgb.r = e.r
      rgb.g = e.g
      rgb.b = e.b
      // this.handleSet()
  }
  handleBackgroundUpdate = (e)=>{
      let t = e
      let app = document.getElementById('App')
      let setBtnCont = document.getElementById('set-btn-cont')
      app.style.backgroundColor = `rgba(${t.r}, ${t.g}, ${t.b})`
      setBtnCont.style.backgroundColor = `rgba(${t.r}, ${t.g}, ${t.b})`
  }
  handleSetColor = ()=>{
      this.setState({status: true})
      fetch(`192.168.0.15/ledapi/setcolor?r=255&g=255&b=0`)
      .then((e)=>{
          let t = this
          setTimeout( ()=>{
            t.setState({status:false})
          }
          ,1000)
          
          console.log(e)
      })
      .catch((err)=>{
          console.log(err)
      })
  }
}

export default App;
