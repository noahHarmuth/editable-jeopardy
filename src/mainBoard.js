import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import QCol from './components/qCol';
import Qa from './qAScreen';
class Mainasd extends React.Component {

    constructor(props) {
        super(props);
        this.showQ.bind(this);
        this.hideQ.bind(this);
        this.state = {
            column: 0,
            row: 0,
            q: "",
            cat: "",
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
            text: "",
            aText: "",
            isSingle: false,
            a: "",
        }
    };
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    _onPress = () => {
        let qs = this.state.questions;
        let aS = this.state.answers;
        console.log(qs);
        aS[this.state.column][this.state.row] = this.state.a;
        qs[this.state.column][this.state.row] = this.state.q;
        this.setState({ answers: aS, questions: qs });
        //this.setState({isFilled: !this.state.isFilled});
        console.log();
    }
    changeCat = () => {
        let qs = this.state.categories;
        qs[this.state.column] = this.state.cat;
        this.setState({
            categories: qs,
        })
    }
    showQ = (blah, beck, r, c) => {
        let qs = this.state.points;
        qs[c][r] = "";
        this.setState({ points: qs });
        this.setState({ aText: beck, text: blah, isSingle: true });
    }
    hideQ = () => {
        this.setState({ text: "", isSingle: false });
    }
    render() {
        return (
            <div className="App">
                {
                    this.state.isSingle ?
                        <Qa hideQ={this.hideQ} qText={this.state.text} aText={this.state.aText}></Qa>
                        :

                        <Container fluid>
                            <Row style={{ borderWidth: 2 }}>
                                <QCol c={1} showQ={this.showQ} category={this.state.categories[1]} questions={this.state.questions[1]} answers={this.state.answers[1]} points={this.state.points[1]}></QCol>
                                <QCol c={2} showQ={this.showQ} category={this.state.categories[2]} questions={this.state.questions[2]} answers={this.state.answers[2]} points={this.state.points[2]}></QCol>
                                <QCol c={3} showQ={this.showQ} category={this.state.categories[3]} questions={this.state.questions[3]} answers={this.state.answers[3]} points={this.state.points[3]}></QCol>
                                <QCol c={4} showQ={this.showQ} category={this.state.categories[4]} questions={this.state.questions[4]} answers={this.state.answers[4]} points={this.state.points[4]}></QCol>
                                <QCol c={5} showQ={this.showQ} category={this.state.categories[5]} questions={this.state.questions[5]} answers={this.state.answers[5]} points={this.state.points[5]}></QCol>
                            </Row>
                            <Row sm={12}><p>change question  :  row:</p><input id="row" name="row" value={this.state.row} onChange={this.handleChange.bind(this)}></input>
        column:<input id="column" name="column" value={this.state.column} onChange={this.handleChange.bind(this)}></input>
        question:<input id="q" name="q" value={this.state.q} onChange={this.handleChange.bind(this)}></input>
        answer:<input id="a" name="a" value={this.state.a} onChange={this.handleChange.bind(this)}></input>
                                <Button onClick={this._onPress.bind(this)} className={'btn btn-primary'}>Send</Button></Row>
                            <Row sm={12}><p>change cat: </p>
        column:<input name="column" id="column" value={this.state.column} onChange={this.handleChange.bind(this)}></input>
        category:<input name="cat" value={this.state.cat} onChange={this.handleChange.bind(this)}></input>
                                <Button onClick={this.changeCat.bind(this)} className={'btn btn-primary'}>Send</Button></Row>
                        </Container>
                }
            </div>
        );
    }
}


export default Mainasd;