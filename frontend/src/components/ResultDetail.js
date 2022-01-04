import React, { Component } from "react";
import axios from "axios";
import { Label } from "reactstrap";
import moment from 'moment-timezone'
import { Link } from "react-router-dom";

class ResultDetail extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data: [],
            score: 0
        };
    }
    componentDidMount() {
        this._isMounted = true;
        this.refreshData();
    }
    refreshData() {
        axios.get(
            "/api/answers/get_answers/",
            {
                params: {
                    user: this.props.location.state.userName,
                    suite: this.props.location.state.suite,
                    timestamp: this.props.location.state.timestamp
                }
            }
        ).then((res) => {
            if (res.data.success) {
                if (this._isMounted) {
                    this.setState({data: res.data.result});
                    let score = 0;
                    for (const item of res.data.result) {
                        score += item.ans === item.question__ans;
                    }
                    this.setState({score: score});
                }
            } else {
                alert("Failed");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    renderAnswers() {
        return (
            this.state.data.map((item) => {
                return (
                    <li
                        className="list-group-item"
                        key={item.question__idx}
                    >
                        <Label>Question {item.question__idx + 1}</Label>
                        <ul
                            className="list-group"
                        >
                            <li
                                className="list-group-item"
                            >
                                Your answer: {item.ans}
                            </li>
                            <li
                                className="list-group-item"
                            >
                                Correct answer: {item.question__ans}
                            </li>
                            <li
                                className="list-group-item"
                            >
                                {
                                    item.ans === item.question__ans ?
                                    "Correct" :
                                    "Incorrect"
                                }
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
                <h1>
                    Result for {this.props.location.state.suite}
                </h1>
                <ul
                    className="list-group"
                >
                    <li
                        className="list-group-item"
                    >
                        <Link
                            to={{
                                pathname: "/results",
                                state: {
                                    userName: this.props.location.state.userName,
                                    suite: this.props.location.state.suite
                                }
                            }}
                        >
                            Back
                        </Link>
                    </li>
                    <li
                        className="list-group-item"
                    >
                        Completion Time: {moment(this.props.location.state.timestamp).format("LLL")}
                    </li>
                    <li
                        className="list-group-item"
                    >
                        Score: {this.state.score}/16
                    </li>
                    { this.renderAnswers() }
                </ul>
            </main>
        );
    }
}

export default ResultDetail;
