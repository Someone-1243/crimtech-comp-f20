import './App.css';
import React from 'react';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { start_time: 0, ran_once: false, counting: false, true_duration: 0, reaction_time: 0, color: 'green'};
        this.process_click = this.process_click.bind(this);
    }

    handle_color = (duration) => {
        setTimeout(function () {
            this.setState({ color: 'green' });
        }
            .bind(this), duration);
    }

    start_count() {
        let now = window.performance.now();
        let duration = (Math.random() * 2 + 5) * 1000 + this.state.start_time;
        this.setState({
            start_time: now,
            true_duration: duration + now,
            color: 'darkred',
            counting: true
        }); 
        this.handle_color(duration);
    }

    end_count() {
        let now = window.performance.now(); 
        if (now > this.state.true_duration) {
            this.setState({
                ran_once: true,
                counting: false,
                reaction_time: now - this.state.true_duration
            });
        }
    }

    process_click() {
        if (this.state.counting) {
            this.end_count();
        } else {
            this.start_count();
        }
    }

    render() {
        let msg;
        if (this.state.counting && this.state.color === 'darkred') {
            msg = "Wait For Green";
        }

        else if (this.state.counting && this.state.color === 'green') {
            msg = "Click!";
        }
        else if (this.state.ran_once) {
            msg = "Your reaction time is " + this.state.reaction_time.toFixed(2) + " ms";
        }
        else {
            msg = "Click here to begin!";
        }

        return (
            <div className = "PanelContainer" onClick = {this.process_click} style={ { background: this.state.color} }>
                <div className = "Panel">{msg}</div>
            </div>
        );
    }
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className =  "Header">How Fast is your Reaction Time?</h1>
                <Panel />
                <p>Click as soon as the red box turns green. Click anywhere in the box to start.</p>
            </header>
        </div>
  );
}

export default App;
