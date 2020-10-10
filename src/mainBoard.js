import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from "firebase/app";
import "firebase/database"
import React from 'react';
import './App.css';
import { Container, Col, Row, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import QCol from './components/qCol';
import Qa from './qAScreen';
import FinalJ from './finalJ'
const axios = require('axios');

// LIVE DB
// var firebaseConfig = {
//     apiKey: "AIzaSyDZRTy4sdtarEGiJpVkuB4SyZB6YWg8NwY",
//     authDomain: "thursday-jeopardy.firebaseapp.com",
//     databaseURL: "https://thursday-jeopardy.firebaseio.com",
//     projectId: "thursday-jeopardy",
//     storageBucket: "thursday-jeopardy.appspot.com",
//     messagingSenderId: "1095829091044",
//     appId: "1:1095829091044:web:f1aed06c5db5bd371fb2f1"
// };

// TEST DB
var firebaseConfig = {
    apiKey: "AIzaSyCz08B5rqn852s_s86MCdNrhrFxJEXkDUk",
    authDomain: "dev-thursday-jeopardy.firebaseapp.com",
    databaseURL: "https://dev-thursday-jeopardy.firebaseio.com",
    projectId: "dev-thursday-jeopardy",
    storageBucket: "dev-thursday-jeopardy.appspot.com",
    messagingSenderId: "290690740567",
    appId: "1:290690740567:web:81e3c003c235acf515ce12"
};
// Initialize Firebase

class Mainasd extends React.Component {

    constructor(props) {
        super(props);
        this.showQ.bind(this);
        this.hideQ.bind(this);
        this.addPoints = this.addPoints.bind(this);
        this.updateDropdown = this.updateDropdown.bind(this);
        this.loadFinal = this.loadFinal.bind(this);
        firebase.initializeApp(firebaseConfig);
        this.state = {
            addCategory: "",
            column: 0,
            q: "",
            cat: "",
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            a1: "",
            a2: "",
            a3: "",
            a4: "",
            a5: "",
            dropList: [],
            t1: 0,
            t2: 0,
            categories: {
                1: "Suff",
                2: "thing",
                3: "asdf",
                4: "foo",
                5: "bar",
            },
            isFilled: false,
            questions: {
                1: {
                    1: "What is dog",
                    2: "What is dog2",
                    3: "What is dog3",
                    4: "What is dog4",
                    5: "What is dog5",
                },
                2: {
                    1: "What is dog",
                    2: "What is dog2",
                    3: "What is dog3",
                    4: "What is dog4",
                    5: "What is dog5",
                },
                3: {
                    1: "What is dog",
                    2: "What is dog2",
                    3: "What is dog3",
                    4: "What is dog4",
                    5: "What is dog5",
                },
                4: {
                    1: "What is dog",
                    2: "What is dog2",
                    3: "What is dog3",
                    4: "What is dog4",
                    5: "What is dog5",
                },
                5: {
                    1: "What is dog",
                    2: "What is dog2",
                    3: "What is dog3",
                    4: "What is dog4",
                    5: "What is dog5",
                },
            },
            answers: {
                1: {
                    1: "What is cat1",
                    2: "What is cat2",
                    3: "What is cat3",
                    4: "What is cat4",
                    5: "What is cat5",
                },
                2: {
                    1: "What is cat1",
                    2: "What is cat2",
                    3: "What is cat3",
                    4: "What is cat4",
                    5: "What is cat5",
                },
                3: {
                    1: "What is cat1",
                    2: "What is cat2",
                    3: "What is cat3",
                    4: "What is cat4",
                    5: "What is cat5",
                },
                4: {
                    1: "What is cat1",
                    2: "What is cat2",
                    3: "What is cat3",
                    4: "What is cat4",
                    5: "What is cat5",
                },
                5: {
                    1: "What is cat1",
                    2: "What is cat2",
                    3: "What is cat3",
                    4: "What is cat4",
                    5: "What is cat5",
                },
            },
            points: {
                1: {
                    1: "100",
                    2: "200",
                    3: "300",
                    4: "400",
                    5: "500",
                },
                2: {
                    1: "100",
                    2: "200",
                    3: "300",
                    4: "400",
                    5: "500",
                },
                3: {
                    1: "100",
                    2: "200",
                    3: "300",
                    4: "400",
                    5: "500",
                },
                4: {
                    1: "100",
                    2: "200",
                    3: "300",
                    4: "400",
                    5: "500",
                },
                5: {
                    1: "100",
                    2: "200",
                    3: "300",
                    4: "400",
                    5: "500",
                },

            },
            finalJeopardy: {
                question: "How many episodes of Jeopardy are there?(within 500)",
                answer: "9200",
                category: "Jeopardy"
            },
            finalC: "",
            finalQ: "",
            finalA: "",
            isFinalJep: false,
            text: "",
            aText: "",
            isSingle: false,
            a: "",
        }
    };
    componentDidMount = () => {
        this.updateDropdown();
        this.loadFinal();
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    loadFinal = () => {
        let ref = firebase.database().ref("/finalJeopardy/");
        ref.on("value", snapshot => {
            if (snapshot.val() != null) {
                console.log(snapshot.val());
                this.setState({ finalJeopardy: snapshot.val() })
            }
        })
    }
    changeFinal = () => {
        let aq = this.state.finalJeopardy;
        aq.question = this.state.finalQ;
        aq.answer = this.state.finalA;
        aq.category = this.state.finalC;
        this.setState({ finalJeopardy: aq });
        firebase.database().ref("/finalJeopardy").set({
            answer: this.state.finalJeopardy.answer,
            category: this.state.finalJeopardy.category,
            question: this.state.finalJeopardy.question
        })
    }
    updateDropdown = () => {
        let ref = firebase.database().ref("/categories/");
        let tempList = [];
        ref.on("value", snapshot => {
            for (const key in snapshot.val()) {
                console.log(key.toString())
                tempList.push(<option value={key.toString()} name={key.toString()}>{key.toString()}</option>);
            }
            this.setState({ dropList: tempList })
        })
    }
    updateCategory = () => {
        let ref = firebase.database().ref("/categories/" + this.state.addCategory);
        ref.once("value", snapshot => {
            console.log(this.state.addCategory)
            console.log(snapshot.val().questions.toString())
            console.log(snapshot.val().answers.toString())
            let tempQ = this.state.questions;
            let tempA = this.state.answers;
            let tempCat = this.state.categories;
            tempCat[this.state.column] = this.state.addCategory
            tempQ[this.state.column] = snapshot.val().questions;
            tempA[this.state.column] = snapshot.val().answers;
            this.setState({ questions: tempQ, answers: tempA, categories: tempCat })
        });
    }
    showQ = (blah, beck, r, c) => {
        let qs = this.state.points;
        qs[c][r] = "";
        this.setState({ points: qs });
        this.setState({ aText: beck, text: blah, isSingle: true });
    }
    hideQ = () => {
        this.setState({ text: "", isSingle: false, isFinalJep: false });
    }
    finalJep = () => {
        this.setState({ isFinalJep: true });
    }
    addPoints = () => {
        let x = this.state.t1;
        x = x + 100
        this.setState({ t1: x })
        console.log(this.state.t1)
    }
    addCatToDB = () => {
        firebase.database().ref("categories/" + this.state.cat).set({
            questions: {
                1: this.state.q1,
                2: this.state.q2,
                3: this.state.q3,
                4: this.state.q4,
                5: this.state.q5
            },
            answers: {
                1: this.state.a1,
                2: this.state.a2,
                3: this.state.a3,
                4: this.state.a4,
                5: this.state.a5
            }
        })
        this.updateDropdown();
    }
    render() {
        return (
            <div className="App">
                {

                    this.state.isFinalJep ?
                        <FinalJ hideQ={this.hideQ} qText={this.state.finalJeopardy.question} aText={this.state.finalJeopardy.answer} catText={this.state.finalJeopardy.category}></FinalJ>
                        :
                        this.state.isSingle ?
                            <Qa hideQ={this.hideQ} qText={this.state.text} aText={this.state.aText}></Qa>
                            :
                            <Container fluid>
                                <Row sm={12} style={{ borderWidth: 2 }}>
                                    <QCol c={1} showQ={this.showQ} category={this.state.categories[1]} questions={this.state.questions[1]} answers={this.state.answers[1]} points={this.state.points[1]}></QCol>
                                    <QCol c={2} showQ={this.showQ} category={this.state.categories[2]} questions={this.state.questions[2]} answers={this.state.answers[2]} points={this.state.points[2]}></QCol>
                                    <QCol c={3} showQ={this.showQ} category={this.state.categories[3]} questions={this.state.questions[3]} answers={this.state.answers[3]} points={this.state.points[3]}></QCol>
                                    <QCol c={4} showQ={this.showQ} category={this.state.categories[4]} questions={this.state.questions[4]} answers={this.state.answers[4]} points={this.state.points[4]}></QCol>
                                    <QCol c={5} showQ={this.showQ} category={this.state.categories[5]} questions={this.state.questions[5]} answers={this.state.answers[5]} points={this.state.points[5]}></QCol>
                                    <Col sm={2}>
                                        <h1>Team 1</h1>
                                        <h3>{this.state.t1}</h3>
                                        <Row className="justify-content-center">
                                            <Button onClick={() => { let x = this.state.t1; this.setState({ t1: x - 100 }) }} className="btn btn-danger pad1">Subtract</Button>
                                            <Button onClick={() => { let x = this.state.t1; this.setState({ t1: x + 100 }) }} className="btn btn-success pad1">Add Points</Button>
                                        </Row>
                                        <h1>Team 2</h1>
                                        <h3>{this.state.t2}</h3>
                                        <Row className="justify-content-center">
                                            <Button onClick={() => { let x = this.state.t2; this.setState({ t2: x - 100 }) }} className="btn btn-danger pad1">Subtract</Button>
                                            <Button onClick={() => { let x = this.state.t2; this.setState({ t2: x + 100 }) }} className="btn btn-success pad1">Add Points</Button>
                                        </Row>
                                        <Button style={{ marginTop: 90 }} className="btn btn-warning" onClick={this.finalJep.bind(this)}>Final Jeopardy</Button>
                                    </Col>
                                </Row>
                                <Col style={{ margin: 4, textAlign: "center", backgroundColor: "#345b99", borderRadius: 4 }} sm={12}>
                                    <Row>
                                        <Col sm={2}>
                                            <Row><h3>Category</h3></Row>
                                            <Row><input name="cat" value={this.state.cat} onChange={this.handleChange.bind(this)}></input></Row>
                                        </Col>
                                        <Col sm={2}>
                                            <Row style={{ textAlign: "center" }}><h3 style={{ textAlign: "center" }}>Questions</h3></Row>
                                            <Row><input placeholder="question 1" name="q1" value={this.state.q1} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="question 2" name="q2" value={this.state.q2} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="question 3" name="q3" value={this.state.q3} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="question 4" name="q4" value={this.state.q4} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="question 5" name="q5" value={this.state.q5} onChange={this.handleChange.bind(this)}></input></Row>
                                        </Col>
                                        <Col className="border-right border-black" sm={2}>
                                            <Row><h3>Answers</h3></Row>
                                            <Row><input placeholder="answer 1" name="a1" value={this.state.a1} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="answer 2" name="a2" value={this.state.a2} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="answer 3" name="a3" value={this.state.a3} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="answer 4" name="a4" value={this.state.a4} onChange={this.handleChange.bind(this)}></input></Row>
                                            <Row><input placeholder="answer 5" name="a5" value={this.state.a5} onChange={this.handleChange.bind(this)}></input></Row>
                                        </Col>
                                        <Col style={{ margin: 4, textAlign: "center", borderRadius: 4 }} sm={2}>
                                            <h3>Column</h3>
                                            <input name="column" value={this.state.column} onChange={this.handleChange.bind(this)}></input>
                                            <select name="addCategory" onChange={this.handleChange.bind(this)}>
                                                <option>Select Category</option>
                                                {this.state.dropList}
                                            </select>
                                            <Col className="align-content-center justify-content-center mt-4"><Button className="btn btn-primary" onClick={this.updateCategory.bind(this)}>Update Column</Button></Col>
                                        </Col>
                                        <Col className="align-content-center justify-content-center mt-4 border-right border-black" sm={6}><Button onClick={this.addCatToDB.bind(this)} className="btn btn-primary">Add Category</Button></Col>
                                    </Row>
                                </Col>
                                <Row>
                                    <p>final category:</p><input name="finalC" value={this.state.finalC} onChange={this.handleChange.bind(this)}></input><p>final question:</p><input name="finalQ" value={this.state.finalQ} onChange={this.handleChange.bind(this)}></input><p>final answer:</p><input name="finalA" value={this.state.finalA} onChange={this.handleChange.bind(this)}></input><Button onClick={this.changeFinal.bind(this)} className={'btn btn-primary'}>Change Final Jeopardy</Button>
                                </Row>
                            </Container>
                }
            </div>
        );
    }
}


export default Mainasd;