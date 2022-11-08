import React, {Component} from 'react';
import './index.css';
import Button from "../../ui/Button";

export default class User extends Component<any, any> {
    constructor (props: any) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    onClick = (event: any) => this.props.onClick(event)

    render () {
        const {user, selected} = this.props;
        return (
            <div className={"user-wrapper"}>
                <Button class={"user" + (selected ? " selected" : "")} onClick={this.onClick}>
                    <span>{user.name}</span>
                    <span>{user.messages}</span>
                </Button>
            </div>
        )
    }
}
