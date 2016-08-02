import React from 'react';
import Service from './Service';
import io from 'socket.io-client';

class Services extends React.Component {
    render() {
        let services = [];
        let style = {
            display: 'flex',
            justifyContent: 'center',
            marginLeft: -20
        };

        this.props.services.forEach((service, index) => {
            services.push(<Service
                name={service.name}
                slug={service.slug}
                warnAfter={service.warnAfter}
                deadAfter={service.deadAfter}
                key={index}
                url={this.props.url}
            />);
        });

        return <div style={style}>{services}</div>;
    }
}

module.exports = Services;
