import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom'
import Qa from "../qAScreen"
class QCol extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
        }
    }

    render() {
        return (

            <Col sm={2} >
                <Row style={styles["category"]} className='text-center justify-content-center border border-black'>{this.props.category}</Row>
                <Row onClick={() => this.props.showQ(this.props.questions[1],this.props.answers[1],1,this.props.c)} style={styles["question"]} className='text-center justify-content-center border border-black'>{this.props.points[1]}</Row>
                <Row onClick={() => this.props.showQ(this.props.questions[2],this.props.answers[2],2,this.props.c)} style={styles["question"]} className='text-center justify-content-center border border-black'>{this.props.points[2]}</Row>
                <Row onClick={() => this.props.showQ(this.props.questions[3],this.props.answers[3],3,this.props.c)} style={styles["question"]} className='text-center justify-content-center border border-black'>{this.props.points[3]}</Row>
                <Row onClick={() => this.props.showQ(this.props.questions[4],this.props.answers[4],4,this.props.c)} style={styles["question"]} className='text-center justify-content-center border border-black'>{this.props.points[4]}</Row>
                <Row onClick={() => this.props.showQ(this.props.questions[5],this.props.answers[5],5,this.props.c)} style={styles["question"]} className='text-center justify-content-center border border-black'>{this.props.points[5]}</Row>

                {/* <Row style={styles["category"]} className='text-center justify-content-center border border-black'>{this.props.category}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[1]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[2]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[3]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[4]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[5]}</Row> */}
            </Col>
        );
    }
}

const styles = {
    'vertical-center': {
        position: 'relative',
        height: '100vh',
        top: 70,
    },
    'category': {
        position: 'relative',
        height: '16.6vh',
        paddingTop: 50,
        fontSize: 34,
        backgroundColor: '#060ce9',
        borderWidth: 2,
        color: '#fff',
        fontWeight: 'bold',
    },
    'question': {
        position: 'relative',
        height: '16.6vh',
        paddingTop: 50,
        backgroundColor: '#060ce9',
        color: '#ffcc00',
        borderColor:"#000",
        fontSize: 34,
        fontWeight: 'bold',
    },
};
export default QCol;