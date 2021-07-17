import React from 'react';
import { deleteCampus, updateCampus } from '../store/effects';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EditCampus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campusName: '',
            address: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.campus.id) {
            this.setState({
                campusName: this.props.campus.campusName,
                address: this.props.campus.address,
                description: this.props.campus.description
            });
        };
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateCampus({...this.props.campus, ...this.state});
    }


    render() {
        const {campusName, address, description } = this.state;
        const { handleChange, handleSubmit } = this;
        return (
            <div id='editCampusPage'>
                <h3>Edit Campus</h3>
                <form id= 'editCampusForm' onSubmit= {handleSubmit}>
                    <label htmlFor='campusName'>Campus Name</label>
                    <input name= 'campusName' onChange= {handleChange} value= {campusName} />
                    <label htmlFor='address'>Address</label>
                    <input name= 'address' onChange= {handleChange} value= {address} />
                    <label htmlFor='description'>Description</label>
                    <input name= 'description' onChange= {handleChange} value= {description} />
                    <button type= 'submit'>Submit</button>

                    <button className= 'delete' onClick= {()=>this.props.deleteCampus(this.props.campus)}>
                        Delete Campus
                    </button>
                    <button>
                        <Link to= '/campuses'>Cancel</Link>
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ campuses }, { match }) => {
    const campusId = match.params.id;
    const campus = campuses.find((campus) => campus.id === campusId) || {};
    return ({
        campus
    })
};

const mapDispatchToProps = (dispatch, { history }) => ({
    updateCampus: (campus) => dispatch(updateCampus(campus, history)),
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus);