import React, { Component } from 'react'
import './cogbook.css'
// import CogBookData from './cogbook.json'
import axios from 'axios';

class CogBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CogBookData: {}
        }
    }

    componentDidMount() {
        this.getCogBookData();
    }

    async getCogBookData() {
        try {
            const response = await axios.get(`https://9hu0ztgsi6.execute-api.us-east-2.amazonaws.com/test/student/grade/`);
            this.setState({
                CogBookData: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    renderGrades(grades) {
        const header = this.state.CogBookData && this.state.CogBookData.clsassignments || []
        return header.map((section, index) => {
            const sectionGrade = grades.find((p, i) => { return p.sectionid === section.sectionid });
            const percentage = (sectionGrade && sectionGrade.gradePer) || '0%';
            return <td key={section.sectionid}>{percentage}</td>
        })
    }
    renderCogbookData() {
        const gradedata = this.state.CogBookData && this.state.CogBookData.gradedata || [];
        return gradedata.map((studentDetail, index) => {
            const grade = studentDetail.grades;
            return (
                <tr key={studentDetail.studentid}>
                    <td key={studentDetail.studentName}>{studentDetail.studentName}</td>
                    {this.renderGrades(grade)}
                </tr>
            )
        })
    }

    renderCogbookHeader() {
        const header = this.state.CogBookData && this.state.CogBookData.clsassignments || [];
        return header.map((assignment, index) => {
            return <th key={assignment.sectionid}>{assignment.sectionname}</th>
        })
    }
    render() {
        return (
            <view className='box'>
                <table id='studentid'>
                    <thead>
                        <tr>
                            <th key='studentid'>Student Name</th>
                            {this.renderCogbookHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCogbookData()}
                    </tbody>
                </table>
            </view>
        )
    }
}


export default CogBook
