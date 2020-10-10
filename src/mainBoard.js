import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from "firebase/app";
import "firebase/database"
import React from 'react';
import './App.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import QCol from './components/qCol';
import Qa from './qAScreen';
import FinalJ from './finalJ'
const axios = require('axios');

var firebaseConfig = {
    apiKey: "AIzaSyDZRTy4sdtarEGiJpVkuB4SyZB6YWg8NwY",
    authDomain: "thursday-jeopardy.firebaseapp.com",
    databaseURL: "https://thursday-jeopardy.firebaseio.com",
    projectId: "thursday-jeopardy",
    storageBucket: "thursday-jeopardy.appspot.com",
    messagingSenderId: "1095829091044",
    appId: "1:1095829091044:web:f1aed06c5db5bd371fb2f1"
};
// Initialize Firebase

class Mainasd extends React.Component {

    constructor(props) {
        super(props);
        this.showQ.bind(this);
        this.hideQ.bind(this);
        this._onPress = this._onPress.bind(this);
        this.addPoints = this.addPoints.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        firebase.initializeApp(firebaseConfig);
        this.state = {
            column: 0,
            row: 0,
            q: "",
            cat: "",
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
        this.updateBoard();
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    _onPress = async () => {
        let qs = this.state.questions;
        qs[this.state.column][this.state.row] = this.state.q;
        this.setState({ questions: qs });
        firebase.database().ref("questions").set({
            questions: this.state.questions
        })
        let aq = this.state.answers;
        aq[this.state.column][this.state.row] = this.state.a;
        this.setState({ answers: aq });
        firebase.database().ref("answers").set({
            answers: this.state.answers
        })
    }
    changeCat = () => {
        let aq = this.state.categories;
        aq[this.state.column] = this.state.cat;
        this.setState({ categories: aq });
        firebase.database().ref("categories").set({
            categories: this.state.categories
        })
    }
    changeFinal = () => {
        let aq = this.state.finalJeopardy;

        aq.question = this.state.finalQ;
        aq.answer = this.state.finalA;
        aq.category = this.state.finalC;
        this.setState({ finalJeopardy: aq });
        firebase.database().ref("finalJeopardy").set({
            finalJeopardy: this.state.finalJeopardy
        })
    }
    updateBoard = () => {
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot => {
            console.log(snapshot.val())
            console.log(snapshot.val().questions.questions)
            this.setState({ questions: snapshot.val().questions.questions, answers: snapshot.val().answers.answers, categories: snapshot.val().categories.categories, finalJeopardy: snapshot.val().finalJeopardy.finalJeopardy })
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

                                <Row sm={12}><p>change question  :  row:</p><input id="row" name="row" value={this.state.row} onChange={this.handleChange.bind(this)}></input>
        column:<input id="column" name="column" value={this.state.column} onChange={this.handleChange.bind(this)}></input>
        question:<input id="q" name="q" value={this.state.q} onChange={this.handleChange.bind(this)}></input>
        answer:<input id="a" name="a" value={this.state.a} onChange={this.handleChange.bind(this)}></input>
                                    <Button onClick={this._onPress} className={'btn btn-primary'}>Send</Button></Row>
                                <Row sm={12}><p>change category: </p>
        column:<input name="column" id="column" value={this.state.column} onChange={this.handleChange.bind(this)}></input>
        category:<input name="cat" value={this.state.cat} onChange={this.handleChange.bind(this)}></input>
                                    <Button onClick={this.changeCat.bind(this)} className={'btn btn-primary'}>Send</Button></Row>
                                    <Row sm={12}><p>final category:</p><input name="finalC" value={this.state.finalC} onChange={this.handleChange.bind(this)}></input><p>final question:</p><input name="finalQ" value={this.state.finalQ} onChange={this.handleChange.bind(this)}></input><p>final answer:</p><input name="finalA" value={this.state.finalA} onChange={this.handleChange.bind(this)}></input><Button onClick={this.changeFinal.bind(this)} className={'btn btn-primary'}>Send</Button></Row>
                            </Container>
                }
            </div>
        );
    }
}


export default Mainasd;