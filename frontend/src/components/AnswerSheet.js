import React, { Component } from "react";
import axios from "axios";
import moment from 'moment-timezone'
import { Link, Redirect } from "react-router-dom";

import {
    Button,
    Label,
    ButtonGroup
} from "reactstrap";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

class AnswerSheet extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.audio = new Audio(this.props.location.state.audio);
        this.state = {
            answers: [],
            questions: [],
            submitted: false
        };
    }
    componentDidMount() {
        this._isMounted = true;
        this.refreshData();
    }
    componentWillUnmount() {
        this.audio.pause();
    }
    refreshData() {
        axios.get(
            "/api/questions/get_questions/",
            {
                params: {
                    suite: this.props.location.state.suite
                }
            }
        ).then((res) => {
            if (res.data.success) {
                if (this._isMounted) {
                    this.setState({
                        questions: res.data.result,
                        answers:
                            Array.from(Array(16).keys()).map((i) => {
                                return {
                                    question: res.data.result[i].id,
                                    user: this.props.location.state.userName,
                                    ans: "",
                                    timestamp: ""
                                };
                            })
                    });
                    this.audio.play();
                }
            } else {
                alert("Failed");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    renderForm() {
        if (this.state.submitted) {
            return (
                <Redirect
                    to={{
                        pathname: "/landing",
                        state: {
                            userName: this.props.location.state.userName
                        }
                    }}
                />
            );
        }
        return Array.from(Array(16).keys()).map((i) => {
            return (
                <li
                    key={i}
                    className="list-group-item"
                >
                    <Label>Question {i + 1}</Label>
                    <ul
                        className="list-group"
                    >
                        <li
                            className="list-group-item"
                        >
                            <ul
                                className="list-group"
                            >
                                {
                                    ["A", "B", "C", "D"].map((j) => {
                                        return (
                                            <li
                                                key={`${i}-${j}`}
                                                className="list-group-item"
                                            >
                                                <Label>{j}</Label>
                                                <p>
                                                    {
                                                        this.state.questions[i] !== undefined ?
                                                        this.state.questions[i][`txt_${j.toLowerCase()}`] :
                                                        ""
                                                    }
                                                </p>
                                            </li>

                                        );
                                    })
                                }
                            </ul>
                        </li>
                        <li
                            className="list-group-item"
                        >
                            <ul
                                className="list-group"
                            >
                                <Label>
                                    Answer: {
                                        this.state.answers[i] !== undefined ?
                                        this.state.answers[i].ans :
                                        ""
                                    }
                                </Label>
                                <ButtonGroup>
                                    {
                                        ["A", "B", "C", "D"].map((j) => {
                                            return (
                                                <Button
                                                    key={`${i}-${j}`}
                                                    onClick={
                                                        (e) => {
                                                            let data =
                                                                [...this.state.answers];
                                                            data[i].ans = j;
                                                            this.setState({answers: data});
                                                        }
                                                    }
                                                >
                                                    {j}
                                                </Button>
                                            );
                                        })
                                    }
                                </ButtonGroup>
                            </ul>
                        </li>
                    </ul>
                </li>
            )
        });
    }
    render() {
        return (
            <main className="container">
                <h1>{this.props.location.state.suite}</h1>
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
                    <li
                        className="list-group-item"
                    >
                        <Label>Questions</Label>
                        <ul className="list-group">
                            { this.renderForm() }
                        </ul>
                    </li>
                    <li
                        className="list-group-item"
                    >
                        <Button
                            onClick={
                                (e) => {
                                    this.setState({submitted: true});
                                    let timestamp = moment().format();
                                    let ans = [...this.state.answers];
                                    ans.forEach((item) => {
                                        item.timestamp = timestamp;
                                    });
                                    axios.post(
                                        "/api/answers/submit_answers/",
                                        ans
                                    ).then((res) => {
                                        if (!res.data.success) {
                                            alert("Failed");
                                        } else {
                                            alert("submitted");
                                        }
                                    }).catch((err) => {
                                        alert("Failed");
                                    });
                                }
                            }
                        >
                            Submit
                        </Button>
                    </li>
                </ul>
            </main>
        );
    }
}

export default AnswerSheet;
