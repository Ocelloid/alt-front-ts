import React, {Component} from 'react';
import './index.css';
import Message from "../Message";
import Filter from "../Filter";

export default class MessageList extends Component<any, any> {
    constructor (props: any) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    onChange = (desc: boolean, val: string) => this.props.onChange(desc, val);

    render () {
        const props = this.props;
        return (
            <div className={"message-list-wrapper"}>
                <Filter isMessages={true} onChange={this.onChange} descending={props.descending}/>
                <div className={"messages-wrapper"}>
                {props.messageList.map((message: any, i: number) => <Message
                    message={message} key={i}/>)}
                </div>
            </div>
        )
    }
}
