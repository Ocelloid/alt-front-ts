import React, {Component} from 'react'
import {observer} from 'mobx-react'
import "./index.css"

@observer
export default class Input extends Component<any, any> {
    constructor (props: any) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    onChange = (event: any) => this.props.onChange(event.target.name, event.target.value)
    render () {
        return (
            <input
                className="m_input"
                id={this.props.id}
                name={this.props.name}
                onChange={this.props.onChange}
                type={this.props.type}
                value={this.props.value}/>
        )
    }
}
