import React, {Component} from 'react';
import './index.css';

function getFormat(date: Date) {
    return date.toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})
        + " " + date.toLocaleTimeString('ru-RU');
}

export default class Message extends Component<any, any> {
    render () {
        const {message} = this.props;
        return (
            <div className={"message-wrapper"}>
                <div className={"message-user-name"}>{message.userName} <span>{getFormat(message.dateTime)}</span></div>
                <div className={"message-body"}>{message.body}</div>
            </div>
        )
    }
}
