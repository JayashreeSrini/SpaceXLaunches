import React from 'react';
import Launches from '../launches/launches-container'
import Header from '../header/header'

class App extends React.Component {
    render() {
        return (
            <div className="app-container" >
                <Header title='This is title' />
                <Launches />
            </div>
        );
    }

}
export default App