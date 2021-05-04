import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'

//CLASS COMPONENTS
class App extends React.Component {
    /*constructor(props){
        super(props);

        //ONLY DIRECT ASSIGN STATE ON INIT
        this.state = {lat: null, long: null, errorMessage: ''};
    }*/
    
    state = {lat: null, long: null, errorMessage: ''};

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => {
                //SETSTATE!!! NOT this.state.lat
                this.setState({ 
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
                
            }, //success callback
            err => this.setState({errorMessage: err.message})
        );
    }

    componentDidUpdate(){
        console.log("component updated");        
    }

    componentWillUnmount(){ //cleanup

    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat && !this.state.long){
            return <div>
                Error: {this.state.errorMessage}
            </div>
        };
        if(!this.state.errorMessage && this.state.lat && this.state.long){
            return <div>
                <SeasonDisplay lat={this.state.lat} long={this.state.long} />
            </div>
        }
        return <div><Spinner message="Please acept location request"/></div>;
    }

    render() {
        return (
            <div>{this.renderContent()}</div>
        )
    };
}

ReactDOM.render(<App />, document.querySelector('#root'));
