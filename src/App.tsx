import React, {Component} from 'react';
import './App.css';
import UserList from "./components/UserList";
import MessageList from "./components/MessageList";
import {observable, action, runInAction, makeObservable} from 'mobx';
import {observer} from "mobx-react";

class InfoStore {
    @observable users: any[];
    @observable user_id?: string;
    @observable user_search?: string;
    @observable message_search?: string;
    @observable messages_desc: boolean;
    @observable messages: any[];
    @observable fetching: boolean;

    constructor() {
        this.messages = [];
        this.users = [];
        this.fetching = false;
        this.messages_desc = false;
        makeObservable(this);
    }

    get users_found() {
        return this.user_search ? this.users.filter((x: any) =>
            x.username.includes(this.user_search) ||
            x.name.includes(this.user_search) ||
            x.user_id === this.user_id
        ) : this.users
    }

    get messages_found() {
        let m_f = this.message_search ? this.messages.filter((x: any) =>
            x.userId === this.user_id && x.body.includes(this.message_search)
        ) : this.messages.filter((x: any) => x.userId === this.user_id);
        return m_f.sort((a: any, b: any) => {
            if (this.messages_desc) return a.timestamp - b.timestamp;
            else return b.timestamp - a.timestamp;
        });
    }

    @action
    changeUser(id: string) {
        this.user_id = id;
    }

    @action
    filterUsers(val: string) {
        this.user_search = val;
    }

    @action
    filterMessages(desc: boolean, val: string) {
        this.messages_desc = desc;
        this.message_search = val;
    }

    async fetchInfo(endpoint:string) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
        return await response.json();
    }

    @action
    load = async () => {
        this.fetching = true;
        const [users, messages] = await Promise.all([
            this.fetchInfo(`users`),
            this.fetchInfo(`posts`),
        ]);
        runInAction(() => {
            this.users = users.map((x: any) => {
                x.messages = messages.filter((y: any) => y.userId === x.id).length;
                return x;
            });
            this.user_id = users.length ? users[0].id : 0;
            this.messages = messages.map((x: any) => {
                let users_by_id = users.filter((y: any) => y.id === x.userId);
                x.userName = users_by_id.length ? users_by_id[0].name : "Имя не найдено";
                x.timestamp = Date.now() - Math.floor(Math.random() * 36000000);
                x.dateTime = new Date(x.timestamp);
                return x;
            });
            this.fetching = false;
        });
    };
}


@observer
export default class App extends Component<any, any> {
    constructor (props: any) {
        super(props)
        this.state ={
            infoStore: new InfoStore()
        }
    }

    componentDidMount() {
        this.state.infoStore.load();
    }

    render () {
        let {infoStore} = this.state;
        return (
            <div className="App">
                <UserList
                    userList={infoStore.users_found}
                    user_id={infoStore.user_id}
                    onClick={(id: string) => infoStore.changeUser(id)}
                    onChange={(val: string) => infoStore.filterUsers(val)}/>
                <MessageList
                    messageList={infoStore.messages_found}
                    user_id={infoStore.user_id}
                    descending={infoStore.messages_desc}
                    onChange={(desc: boolean, val: string) => infoStore.filterMessages(desc, val)}/>
            </div>
        )
    }
}
