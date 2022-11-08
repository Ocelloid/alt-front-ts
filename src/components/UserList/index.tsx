import React, {Component} from 'react';
import './index.css';
import User from "../User";
import Filter from "../Filter";

export default class UserList extends Component<any, any> {
    constructor (props: any) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    onChange = (desc: boolean, val: string) => this.props.onChange(val);
    onClick = (id: number) => this.props.onClick(id);

    render () {
        const props = this.props;
        return (
            <div className={"user-list-wrapper"}>
                <Filter isMessages={false} onChange={this.onChange}/>
                {props.userList.map((user: any, i: number) => <User
                    selected={user.id === props.user_id}
                    user={user}
                    key={i}
                    onClick={() => this.onClick(user.id)}/>)}
            </div>
        )
    }
}
