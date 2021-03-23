import React, { Component, Fragment } from 'react';
import previousIcon from './assets/icons/left-icon.png';
import nextIcon from './assets/icons/right_icon.png';
import thumb1 from './assets/images/thumb/tea-light-thumb.jpeg';
import thumb2 from './assets/images/thumb/white-light-thumb.jpeg';
import thumb3 from './assets/images/thumb/pink-light-thumb.jpeg';
import thumb4 from './assets/images/thumb/tea-light-thumb.jpeg';
import image1 from './assets/images/tea-light.jpeg';
import image2 from './assets/images/white-light.jpeg';
import image3 from './assets/images/pink-light.jpeg';
import image4 from './assets/images/tea-light.jpeg';

import './App.css';
import Viewer from "./components/Viewer";
import Thumbs from "./components/Thumbs";


const catalogs = [
  {
    thumb: thumb1,
    image: image1
  },
  {
    thumb: thumb2,
    image: image2
  },
  {
    thumb: thumb3,
    image: image3
  },
  {
    thumb: thumb4,
    image: image4
  }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Catalog Viewer',
      catalogs: [...catalogs],
      currentIndex: 0,
      catalogSelected: catalogs[0],
      slideActive: false,
      slideTimer: null,
      slideDuration: 3000,
    };
    this.selectedCatalog = this.selectedCatalog.bind(this);
    this.previousClick = this.previousClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.slideChange = this.slideChange.bind(this);
    this.resetSlideTimer = this.resetSlideTimer.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);
  }

  selectedCatalog(index) {
    let self = this;
    self.setState({currentIndex: parseInt(index, 10)}, ()=>{
      self.setState({catalogSelected: self.state.catalogs[self.state.currentIndex]})
    })
  }

  previousClick() {
    let self = this;
    if(self.state.currentIndex === 0){
      this.setState({currentIndex: 3}, ()=>{
        self.setState({catalogSelected: self.state.catalogs[self.state.currentIndex]})
      })
    }else{
      this.setState({currentIndex: self.state.currentIndex - 1}, ()=>{
        self.setState({catalogSelected: self.state.catalogs[self.state.currentIndex]})
      })
    }
  }

  nextClick() {
    let self = this;
    if(self.state.currentIndex === self.state.catalogs.length -1){
      this.setState({currentIndex: 0}, ()=>{
        self.setState({catalogSelected: self.state.catalogs[self.state.currentIndex]})
      })
    }else{
      this.setState({currentIndex: self.state.currentIndex + 1}, ()=>{
        self.setState({catalogSelected: self.state.catalogs[self.state.currentIndex]})
      })
    }
  }

  slideChange(event) {
    const target = event.target;
    const value = target.name === 'slideActive' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.onSlideChange();
  }

  resetSlideTimer(isActive = false) {

  }

  onSlideChange() {
    let self = this; 
    let timeOut = setInterval(nextImage, self.state.slideDuration);
    function nextImage() {
      if(!self.state.slideActive){
        clearInterval(timeOut);
      }else{
        self.nextClick();
      }
    }
  }

  render() {
    return (
        <Fragment>
          <div className="title" data-testid="app-title"> {this.state.title} </div>
          <div className="catalog-outer">
            <div className="catalog-view">
              <div className="text-center">
                <div className="view-outter text-center">
                  <Viewer catalog={this.state.catalogSelected.image}/>
                </div>
              </div>
            </div>
            <div className="catalog-items">
              <div className="previous" onClick={this.previousClick} data-testid="prev-icon">
                <img src={previousIcon} alt="prev" />
              </div>
              <div className="next" onClick={this.nextClick} data-testid="next-icon">
                <img src={nextIcon} alt="next" />
              </div>
              <Thumbs items={this.state.catalogs} currentIndex={this.state.currentIndex} selectedCatalog={this.selectedCatalog}/>
            </div>

            <div className="slide-input">
              <input type="checkbox" onChange={this.slideChange} name="slideActive" checked={this.state.slideActive} className="test" data-testid="slide"/> Slide
            </div>
          </div>
        </Fragment>
    );
  }
}

export default App;
