import React, { Component } from 'react'
import ErrorMessage from './ErrorMessage'
export default class StandardErrorBoundry extends Component {
    constructor(){
         super();

         this.state = {
            hasError:false,
            error :null
         }
    }

    static getDerivedStateFromError(e){
      return{
        hasError:true,
        error :e
      }
    }

    componentDidCatch(error){
        console.error(error)
    }
  render() {
    return (
      <div className="">
        {this.state.hasError?<ErrorMessage/>:this.props.children}
      </div>
    )
  }
}
