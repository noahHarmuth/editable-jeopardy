import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, View } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
class FinalJ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isC:true,
            isQ: false,
        }
    }
    sendBack = () => {
        if(this.state.isC){
            this.setState({
                isC: false,
                isQ: true,
            })
            return;
        }
        if(!this.state.isQ){
            this.props.hideQ();
        }else{
            this.setState({
                isQ: false,
            })
        }
    }
    render() {
        return (
            <div onClick={this.sendBack.bind(this)} style={{ height: "100vh" }}>
                <div style={{ margin: 'auto', paddingTop: '43vh', color: '#ffcc00', }}>
                    {this.state.isC ?
                        <h1>{this.props.catText}</h1>
                        :this.state.isQ ?
                        <h1>{this.props.qText}</h1>
                        :
                        <h1>{this.props.aText}</h1>
                    }
                    {/* <Row style={styles["category"]} className='text-center justify-content-center border border-black'>{this.props.category}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[1]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[2]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[3]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[4]}</Row>
                <Row style={styles["question"]} className='text-center justify-content-center'>{this.props.questions[5]}</Row> */}
                </div>
            </div>
        );
    }
}

const styles = {
    'vertical-center': {
        position: 'relative',
        height: '100%',
        top: 70,
    },
    'category': {
        position: 'relative',
        height: '140px',
        paddingTop: 70,
        backgroundColor: '#060ce9',
        borderWidth: 2,
        color: '#fff',
    },
    'question': {
        position: 'relative',
        height: '140px',
        paddingTop: 70,
        backgroundColor: '#060ce9',
        color: '#ffcc00',
    },
};
export default FinalJ;