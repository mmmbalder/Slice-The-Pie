import React, {useState} from 'react';
import info from './info.png';
import ReactModal from 'react-modal';
import './App.css';

export class MainTitle extends React.Component {
  render() {
    return(
      <div id="MainTitle">
        <p>Slice the Pie</p>
      </div>  
    )
  }
}

export class Intro extends React.Component {
  render() {
    return(
      <div id="intro">
        <p> Say you got to run the University. How much would you allocate to different sectors? Learn about your funding sources, with a guessing game.</p>
        <p> You can make your choices by inputting percentages of each section of a pie chart. See how well your choices match the ones the real Provost made.</p>
      </div>  
    )
  }
}

export class Titles extends React.Component{
  render(){
    return (
      <div id="titles">
      <p>Function</p>
      <p>Percentage (%)</p>
      </div>
    )
  }
}

export class ProgressBar extends React.Component{
  render() {
    return (
      <div id="progressBar">
        <div id="phases">
          <p>REVENUES</p> 
          <p>EXPENSES</p> 
          <p>COMPARE</p>
        </div>
        <progress id="progressLine" value={this.props.value} max='100'/>
        <div id="left" className="progressIcon" /> 
        <div id="middle" className="progressIcon" /> 
        <div id="right" className="progressIcon" />
      </div>
    )
  }
}  

export class Categories extends React.Component {

  printVal() {
    let val = this.props.data[parseInt(this.props.index)].value
    val = parseInt(val)
    if ( isNaN(val) || val == 0) {
      return ""
    } else{
      return val.toString()+'%'
    }
  }

  render() {
    return (
      <div id="categories">
        <div id="box">
          <div style={{
            minHeight: '15px',
            minWidth: '15px',
            borderRadius: '50px',
            backgroundColor: this.props.color,
          }}/> 
          <p id="categoryName">{this.props.name}<div className="tooltip"><img id="infoIcon" src={info}/><span className="tooltiptext">{this.props.info}</span></div></p>
        </div>  
        <input type="text" className="percentage" placeholder='0%' value={this.printVal()} onChange={(e) => {
          this.props.editPie(e,parseInt(this.props.index));
          this.printVal();
        }} />  
      </div>
    )
  }
} 

export  class Total extends React.Component {

  printVal() {
    let val = parseInt(this.props.value)
    console.log('Total:', val)
    if ( isNaN(val) || val == 0) {
      return ""
    } else{
      return val.toString()+'%'
    }
  }

  render() {
    return (
      <div id="total">
        <p className="totalLabel">Total %</p>
        <input readOnly={true} type="text" className="percentage" placeholder='0%' value={this.printVal()}/> 
      </div> 
    )
  }
}
 

export  class NextButton extends React.Component {
  render() {
    return (
      <button id="nextButton" onClick={this.props.next}>Next</button>
    )
  }
}

export  class PreviousButton extends React.Component {
  render() {
    return (
      <button id="previousButton" onClick={this.props.prev}>Previous</button>
    )
  }
}

export  class CompareButton extends React.Component {
  render() {
    return (
      <button id="compareButton" onClick={this.props.next}>Compare</button>
    )
  }
}

export  class RestartButton extends React.Component {
  render() {
    return (
      <button id="restartButton"  onClick={this.props.restart}>Restart</button>
    )
  }
}
