import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent } from '../redux/actions'
import { v4 as uuidv4 } from 'uuid'
import {
    Link
} from 'react-router-dom'

const iniState = {
    firstName: '',
    lastName: '',
    imageUrl: '',
    gpa: '',
    error: ''
}

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = iniState
    }

    onSave = async (ev) => {
        ev.preventDefault();
        const { state } = this
        try {
            await this.props.addStudent({
                firstName: state.firstName,
                lastName: state.lastName,
                imageUrl: state.imageUrl,
                gpa: state.gpa,
                id: uuidv4
            })
        this.setState(iniState)
        this.props.history.push('/students')
        } catch (error) {
            console.log(error)
        }
    }

    onChange = (ev) => {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change)
    }

    render() {
       
        const { onChange, onSave } = this;
        const { firstName, lastName, imageUrl, gpa } = this.state
        return ( 
        <div>
            <h2>Add Student</h2>
            <form className='editForm' onSubmit={onSave}>
                <div className='editFormField'>
                    <div>First Name</div>
                    <input name='firstName' value= {firstName} onChange={ onChange }
                    required={true} />
                </div>

                <div className='editFormField'>
                    <div>Last Name</div>
                    <input name='lastName' value= {lastName} onChange={ onChange }
                    required={true}/>
                </div>

                <div className='editFormField'>
                    <div>Image URL</div>
                    <input name='imageUrl' value= {imageUrl} onChange={ onChange }
                    required={true}/>
                </div>

                <div className='editFormField'>
                    <div>GPA</div>
                    <input name='gpa' value= {gpa} onChange={ onChange }
                    min="0" max="4" required={true}/>
                </div>
                <button>Save</button>
            </form>
        </div>
         );
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = {
    addStudent
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);