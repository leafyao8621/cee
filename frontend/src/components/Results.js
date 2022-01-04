import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Results extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this._isMounted = true;
        this.refreshData();
    }
    refreshData() {
        axios.get(
            "/api/answers/get_attempts/",
            {
                params: {
                    user: this.props.location.state.userName,
                    suite: this.props.location.state.suite
                }
            }
        ).then((res) => {
            if (res.data.success) {
                if (this._isMounted) {
                    this.setState({data: res.data.result});
                }
            } else {
                alert("Failed");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    renderAttempts() {
        return (
            this.state.data.map((item) => {
                return (
                    <li
                        className="list-group-item"
                        key={item.timestamp}
                    >
                        <Link
                            to={{
                                pathname: "/result-detail",
                                state: {
                                    userName: this.props.location.state.userName,
                                    suite: this.props.location.state.suite,
                                    timestamp: item.timestamp
                                }
                            }}
                        >
                            {item.timestamp}
                        </Link>
                    </li>
                );
            })
        );
    }
    render() {
        return (
            <main className="container">
                <h1>Results for {this.props.location.state.suite}</h1>
                <ul
                    className="list-group"
                >
                    <li
                        className="list-group-item"
                    >
                        <Link
                            to={{
                                pathname: "/landing",
                                state: {
                                    userName: this.props.location.state.userName
                                }
                            }}
                        >
                            Back
                        </Link>
                    </li>
                    { this.renderAttempts() }
                </ul>
            </main>
        );
    }
}

export default Results;
