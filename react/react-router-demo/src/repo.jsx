'use strict';
import React from 'react'

class Repo extends React.Component {

    render() {
        const {categroy, repoName} = this.props.params;
        const text = categroy + '  ' + repoName;
        return (
            <div>
                <h2>{text}</h2>
            </div>
        );
    }
}

export default Repo;