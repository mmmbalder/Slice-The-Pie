import React, {useState} from 'react';
import PieChartFunctional from "./PieChartFunctional.jsx";
import {
  actualRevenueData,
  revenueDataObject,
  actualExpenditureData,
  expenditureDataObject,
  revenueInfoIconText,
  expenditureInfoIconText
} from './data.js';
import {MainTitle, Intro, Titles, ProgressBar, Categories, Total, NextButton, PreviousButton, CompareButton, RestartButton} from './components.jsx';
import './App.css';


/* App */
function App() {
  const [currentView, setCurrentView] = useState('r');

  const [revenueData, setRevenueData] = useState(revenueDataObject);

  const [revenueTotal, setRevenueTotal] = useState(0);

  const [expenditureData, setExpenditureData] = useState(expenditureDataObject);

  const [expenditureTotal, setExpenditureTotal] = useState(0);

  const [progressValue, setProgressValue] = useState(1);
  
  function revenueChangeHandler(event, index) {
    let temp = JSON.parse(JSON.stringify(revenueData))
    let val = event.target.value
    while(val.includes('%')){
      val = val.replace("%", "")
    }
    val = parseInt(val)
    if(Number.isInteger(val)){
      val = checkTotal(true, val, revenueData, index)
      temp[index].value = val
      setRevenueData(temp)
    } else if(isNaN(val)){
      temp[index].value = "0"
      setRevenueData(temp)
      val = checkTotal(true, 0, revenueData, index)
    }
  }

  function expenditureChangeHandler(event, index) {
    let temp = JSON.parse(JSON.stringify(expenditureData))
    let val = event.target.value
    while(val.includes('%')){
      val = val.replace("%", "")
    }
    val = parseInt(val)
    console.log("Value: ",val, " added to index",index)
    if(Number.isInteger(val)){
      val = checkTotal(false, val, expenditureData, index)
      temp[index].value = val
      setExpenditureData(temp)
      console.log(" val:",val)
      console.log(" temp:",temp)
    } else if(isNaN(val)){
      temp[index].value = "0"
      setExpenditureData(temp)
      val = checkTotal(false, 0, expenditureData, index)
    }
  }

  function calcTotal(dataSet, index) {
  let totalVal = 0
  for (let i = 0; i < dataSet.length; i++) {
    if(i != index){
      totalVal += parseInt(dataSet[i].value)
    }
  }
  return totalVal
}

function checkTotal(isRev, val, dataSet, index) {
  let totalVal = calcTotal(dataSet, index)
  if(totalVal + val > 100) {
    if(isRev){
      setRevenueTotal(100)
    }else {
      setExpenditureTotal(100)
    }
    return (100 - totalVal)
  } else {
    if(isRev){
      setRevenueTotal(totalVal + val)
    }else {
      setExpenditureTotal(totalVal + val)
    }
    return val
  }
}

  function progressView() {
    if (currentView == 'r') {
      document.getElementById("revenueClass").style.display = 'none';
      document.getElementById("expenditureClass").style.display = 'block';
      document.getElementById("middle").style.backgroundColor = '#71A8FF';
      setProgressValue(50)
      setCurrentView('e');
    } else if (currentView  == 'e'){
      document.getElementById("expenditureClass").style.display = 'none';
      document.getElementById("compare1Class").style.display = 'block';
      document.getElementById("right").style.backgroundColor = '#71A8FF';
      setProgressValue(100)
      setCurrentView('c1');
    } else {
      document.getElementById("compare1Class").style.display = 'none';
      document.getElementById("compare2Class").style.display = 'block';
      setCurrentView('c2');
    }
  }

  function returnView() {
    if (currentView == 'e') {
      document.getElementById("revenueClass").style.display = 'block';
      document.getElementById("expenditureClass").style.display = 'none';
      document.getElementById("middle").style.backgroundColor = '#7F8187';
      setProgressValue(1)
      setCurrentView('r');
    } else if (currentView  == 'c1'){
      document.getElementById("expenditureClass").style.display = 'block';
      document.getElementById("compare1Class").style.display = 'none';
      document.getElementById("right").style.backgroundColor = '#7F8187';
      setProgressValue(50)
      setCurrentView('e');
    } else {
      document.getElementById("compare1Class").style.display = 'block';
      document.getElementById("compare2Class").style.display = 'none';
      setCurrentView('c1');
    }
  }

  function restartView() {
    document.getElementById("compare2Class").style.display = 'none';
    document.getElementById("compare1Class").style.display = 'none';
    document.getElementById("expenditureClass").style.display = 'none';
    document.getElementById("revenueClass").style.display = 'block';
    document.getElementById("middle").style.backgroundColor = '#7F8187';
    document.getElementById("right").style.backgroundColor = '#7F8187'
    setProgressValue(1)
    setCurrentView('r');
    setRevenueData(revenueDataObject);
    setRevenueTotal(0);
    setExpenditureData(expenditureDataObject);
    setExpenditureTotal(0);
  }

  return (
    <div>
      <div id="mainBody">
        <MainTitle/>
        <Intro/>
        <ProgressBar value={progressValue}/>
        <Revenues pieData={revenueData} editPie={revenueChangeHandler} total={revenueTotal} next={progressView} info={revenueInfoIconText}/>
        <Expenditures pieData={expenditureData} editPie={expenditureChangeHandler} total={expenditureTotal} next={progressView} prev={returnView} info={expenditureInfoIconText}/>
        <Compare1 userpieData={revenueData} actualpieData={actualRevenueData} next={progressView}/>
        <Compare2 userpieData={expenditureData} actualpieData={actualExpenditureData} restart={restartView}/>
      </div>
    </div>
  )
} 

class Revenues extends React.Component {
  render() {
    return(
      <div id="revenueClass">
        <div className="pieContainer">
          <h2>UC Davis Revenues</h2>
          <PieChartFunctional name={"revPie"} data={this.props.pieData} />    
        </div>
        <Titles/>
        <div className="category">
          <Categories name="Medical Center" index='0' color='#F0BF00' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[0]}/>
          <Categories name="State of California" index='2' color='#F6E50E'data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[2]}/>
          <Categories name="Tuition" index='3' color='#FFF688' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[3]}/>
          <Categories name="Student Fees" index='1' color='#5F63EC' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[1]}/>
          <Categories name="Research Grants and Contracts" index='4' color='#71A8FF' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[4]}/>
          <Categories name="Pell Grants" index='5' color='#58C9FB' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[5]}/>
          <Categories name="Gifts, Endowments, Interest, Etc." index='7' color='#0F7AB4' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[7]}/>
          <Categories name="Non-educational Services" index='6' color='#D4E4FF' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[6]}/>
          <Total value={this.props.total}/>
          <NextButton next={this.props.next}/>
        </div>    
      </div>
    )
  }
}

class Expenditures extends React.Component {
  render() {
    return(
      <div id="expenditureClass">
        <div className="pieContainer">
          <h2>UC Davis Expenditures</h2>
          <PieChartFunctional name={"expPie"} data={this.props.pieData} />    
        </div>
        <Titles/>
        <div className="category">
          <Categories name="Medical Center" index='0' color='#E3A400' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[0]}/>
          <Categories name="Teaching and Teaching Support" index='1' color='#F0BF00'data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[1]}/>
          <Categories name="Research" index='2' color='#F6E50E' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[2]}/>
          <Categories name="Student Services and Financial Aid" index='3' color='#FFF688' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[3]}/>
          <Categories name="Operations and Maintenance (Buildings, etc)" index='4' color='#5F63EC' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[4]}/>
          <Categories name="Administration" index='5' color='#71A8FF' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[5]}/>
          <Categories name="Depreciation, Interest, etc." index='8' color='#58C9FB' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[8]}/>
          <Categories name="Public Service" index='7' color='#0F7AB4' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[7]}/>
          <Categories name="Non-Educational Services" index='6' color='#D4E4FF' data={this.props.pieData} editPie={this.props.editPie} info={this.props.info[6]}/>
          <Total value={this.props.total}/>
          <CompareButton next={this.props.next}/>
          <PreviousButton prev={this.props.prev}/>
        </div>    
      </div>
    )   
  }
}

class Compare1 extends React.Component {
  render() {
    return(
      <div id="compare1Class">
        <div className="pieContainer">
          <h1>RESULTS</h1>
          <h3>Your Revenue Guess</h3>
          <PieChartFunctional name={"userRevPie"} data={this.props.userpieData} />
          <h3>Actual Revenue</h3>
          <PieChartFunctional name={"actRevPie"} data={this.props.actualpieData} /> 
          <NextButton next={this.props.next}/>
        </div>  
      </div>
    )
  }  
}

class Compare2 extends React.Component {
  render() {
    return(
      <div id="compare2Class">
        <div className="pieContainer">
          <h1>RESULTS</h1>
          <h3>Your Expenses Guess</h3>
          <PieChartFunctional name={"userExpPie"} data={this.props.userpieData} />
          <h3>Actual Expenses</h3>
          <PieChartFunctional name={"actExpPie"} data={this.props.actualpieData} />
          <RestartButton restart={this.props.restart}/> 
        </div>  
      </div>
    )
  }  
}

export default App;