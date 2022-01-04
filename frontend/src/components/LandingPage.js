import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class LandingPage extends Component {
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
            "/api/suites/get_suites/"
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
    renderSuites() {
        return (
            this.state.data.map((item) => {
                return (
                    <li
                        className="list-group-item"
                        key={item.id}
                    >
                        <ul
                            className="list-group"
                        >
                            <li
                                className="list-group-item"
                            >
                                <Link
                                    to={{
                                        pathname: "/answer-sheet",
                                        state: {
                                            userName: this.props.location.state.userName,
                                            suite: item.name,
                                            audio: item.audio
                                        }
                                    }}
                                >
                                    {item.name}
                                </Link>
                            </li>
                            <li
                                className="list-group-item"
                            >
                                <Link
                                    to={{
                                        pathname: "/results",
                                        state: {
                                            userName: this.props.location.state.userName,
                                            suite: item.name
                                        }
                                    }}
                                >
                                    Results
                                </Link>
                            </li>
                        </ul>
                    </li>
                );
            })
        );
    }
    render() {
        return (
            <main className="container">
                <h1>Logged in as {this.props.location.state.userName}</h1>
                <ul
                    className="list-group"
                >
                    <li
                        className="list-group-item"
                    >
                        <Link
                            to={{
                                pathname: "/"
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                    { this.renderSuites() }
                </ul>
            </main>
        );
    }
}

export default LandingPage;
