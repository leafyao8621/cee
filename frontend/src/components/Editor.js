import React, { Component } from "react";
import axios from "axios";

import {
    Button,
    Input,
    Label,
    ButtonGroup
} from "reactstrap";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

class Editor extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data:
                Array.from(Array(16).keys()).map((i) => {
                    return {
                        suite: "",
                        idx: i,
                        txt_a: "",
                        txt_b: "",
                        txt_c: "",
                        txt_d: "",
                        ans: "",
                    }
                })
        };
    }
    renderForm() {
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
                            <Label>Text</Label>
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
                                                <Input
                                                    type="text"
                                                    placeholder="Enter text"
                                                    onChange={
                                                        ({target}) => {
                                                            let data =
                                                                [...this.state.data];
                                                            data[i][`txt_${j.toLowerCase()}`] =
                                                                target.value;
                                                            this.setState({data: data});
                                                        }
                                                    }
                                                />
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
                                <Label>Answer: {this.state.data[i].ans}</Label>
                                <ButtonGroup>
                                    {
                                        ["A", "B", "C", "D"].map((j) => {
                                            return (
                                                <Button
                                                    onClick={
                                                        (e) => {
                                                            let data =
                                                                [...this.state.data];
                                                            data[i].ans = j;
                                                            this.setState({data: data});
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
                <h1>Editor</h1>
                <ul
                    className="list-group"
                >
                    <li
                        className="list-group-item"
                    >
                        <Label>Suite</Label>
                        <Input
                            type="text"
                            placeholder="Enter a suite name"
                            onChange={
                                ({target}) => {
                                    let data = [...this.state.data];
                                    Array
                                        .from(Array(16).keys())
                                        .forEach((i) => {
                                        data[i].suite = target.value;
                                    });
                                    this.setState({data: data});
                                }
                            }
                        />
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
                                    console.log(this.state.data);
                                    axios.post(
                                        "/api/questions/create_suite/",
                                        this.state.data
                                    ).then((res) => {
                                        if (!res.data.success) {
                                            alert("Failed");
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

export default Editor;
