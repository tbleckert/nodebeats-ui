import React from 'react';
import Moment from 'moment';
import 'whatwg-fetch';
import io from 'socket.io-client';
import { css } from 'aphrodite';
import { styles } from './style';

class Service extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastUpdate: null,
            data: null,
            lastStatus: null,
            status: null
        };

        this.timer = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.data && prevState.lastUpdate !== this.state.lastUpdate) {
            this.checkHealth();
        }
    }

    componentDidMount() {
        this.fetchInitialData(this.connectToWS);
    }

    fetchInitialData(callback) {
        fetch([this.props.url, '/', this.props.slug, '/lastBeat'].join(''))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            }).then((json) => {
                this.gotData(json);
                callback.call(this);
            }).catch((e) => {
                if (e.response.status === 404) {
                    this.setState({status: 'dead', lastStatus: this.state.status});
                } else {
                    this.setState({status: 'error', lastStatus: this.state.status});
                }

                callback.call(this);
            });
    }

    connectToWS() {
        let socket = io(this.props.url);

        socket.on('beat:' + this.props.slug, (data) => {
            this.gotData(data);
        });
    }

    gotData(json) {
        this.setState({data: json, lastUpdate: Date.now()});
    }

    checkHealth() {
        clearTimeout(this.timer);

        if (!this.state.data) {
            return;
        }

        let lastBeat   = Moment(this.state.data.date);
        let secondsAgo = Moment().diff(lastBeat, 'seconds');

        console.log(secondsAgo);

        if (secondsAgo >= this.props.deadAfter) {
            this.setState({status: 'dead', lastStatus: this.state.status});
        } else if (secondsAgo >= this.props.warnAfter) {
            this.setState({status: 'ill', lastStatus: this.state.status});
        } else {
            this.setState({status: 'healthy', lastStatus: this.state.status});
        }

        this.timer = setTimeout(this.checkHealth.bind(this), 30000);
    }

    render() {
        let status     = this.state.status || 'dead';
        let stateStyle = styles[status + 'State'];
        let pulse      = this.state.status === this.state.lastStatus ? styles.pulse : null;
        let lastBeat   = this.state.data ? Moment(this.state.data.date).format('MM/DD HH:mm:ss') : 'N/A';

        return (
            <div className={css(styles.serviceOuter)}>
                <div className={css(styles.serviceInner)}>
                    <div className={css(styles.serviceState, stateStyle, pulse)} key={Date.now()}>
                        <span>{this.props.name}</span>
                        <small className={css(styles.lastBeat)}>{lastBeat}</small>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Service;
