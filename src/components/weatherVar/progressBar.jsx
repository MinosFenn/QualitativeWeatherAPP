import React from "react";

export const ProgressBar = ({ status, progressColor }) => (
    <div style={{ background: '#fff', border: '1px solid #000', overflow: 'hidden' }}>
        <div style={{ transform: `scaleX(${status})`, transformOrigin: '0 0', transition: 'transform 1s', height: 10, background: progressColor }} />
    </div>
);

class progressBar extends React.Component {
    constructor(props) {
        super(props);
        const now = new Date().valueOf();
        const start = Math.floor(now / 60000) * 60000; // current minute
        const end = start + 60000; // start + 1 minute
        this.state = {
            progress: this.getProgress(),
        }
    }

    getProgress() {
        const { start, end } = this.props;
        // console.log(start)
        const now = new Date().valueOf();
        return (now - start) / (end - start);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const progress = this.getProgress();
            if (progress > 1) {
                clearInterval(this.interval);
            }
            this.setState({
                progress
            });
        }, 1000);
    }

    render() {
        return (
            <div>
                <div>
                    <ProgressBar status={this.state.progress} progressColor={"#1725b5"} />
                </div>
            </div>
        )
    }
}

export default progressBar