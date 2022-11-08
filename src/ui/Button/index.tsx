import React, {Component} from 'react'
import {observer} from 'mobx-react'
import "./index.css"

@observer
export default class Button extends Component<any, any> {
    constructor (props: any) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    onClick = (event: any) => this.props.onClick(event)
    render () {
        const button = this.props
        return (
            <button className={("m_button " + this.props.class)} onClick={this.onClick}>
                {button.children}
            </button>
        )
    }
}
