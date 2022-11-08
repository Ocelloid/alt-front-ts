import React, {Component} from 'react';
import './index.css';
import {observer} from "mobx-react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

@observer
export default class Filter extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            descending: this.props.descending,
            value: ""
        }
        this.onChange = this.onChange.bind(this)
        this.valueChange = this.valueChange.bind(this)
        this.orderChange = this.orderChange.bind(this)
    }

    onChange = () => this.props.onChange(this.state.descending, this.state.value);
    valueChange = (value: string) => {
        this.setState({...this.state, value: value}, () => this.onChange());
    }
    orderChange = (descending: boolean) => {
        this.setState({...this.state, descending}, () => this.onChange());
    }

    render () {
        const props = this.props;
        let {descending} = this.state;
        return (
            <div className={"filter-wrapper"}>
                {props.isMessages && <div className={"filter-buttons"}>
                    <Button class={"filter " + (descending ? "" : "active")}
                            onClick={() => this.orderChange(false)}>
                        Новые
                    </Button>
                    <Button class={"filter " + (!descending ? "" : "active")}
                            onClick={() => this.orderChange(true)}>
                        Старые
                    </Button>
                </div>}
                <Input onChange={(evt: any) => this.valueChange(evt.target.value)} value={this.state.value}/>
            </div>
        )
    }
}
