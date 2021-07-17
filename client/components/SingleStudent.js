
import React from 'react';
import { connect } from 'react-redux';
import { viewStudentDB, deleteStudentDB } from '../../store';
import CampusDropdown from './CampusDropdown';
import Campus from './Campus';
import { withRouter } from "react-router";

class _Student extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    await this.props.viewStudentDB(id);
//    await this.props.viewCampusDB(id.campusId);
  }

  async componentDidUpdate (prevProps, prevState) {
    const { id } = this.props.match.params;
    await this.props.viewStudentDB(id);
  }

  handleEditClick = () => {
    this.props.history.push({
      pathname: '/student/add',
      state: { mode: 'EDIT'}
    })
  }

  render () {
    const selectedStudent = this.props.selectedStudent;
    if (selectedStudent.id === 0) return <div> </div>
    if (this.props.match.params.id*1 !== selectedStudent.id) {
      return (
        <div className="navigationerror">
          <h1>Please only use the navigation items from the website to navigate</h1>
          <h2>Do not manually change the URL</h2>
          <h3>Use the Nav bar or clickable links to navigate</h3>
        </div>
      )
    }

    return (
      <div>
        <div id="single-student-container">
          <img id="single-student-image" src={selectedStudent.imageUrl} />
          <div id='student-detail-container'>
              <div id='single-student-top'>
                <h2>{ selectedStudent.firstName + ' ' + selectedStudent.lastName }</h2>
                <p>ID: {selectedStudent.id}</p>
                <p>GPA: {selectedStudent.gpa}</p>
                <p>Email: {selectedStudent.email}</p>
              </div>
              <div id="student-footer-buttons">
                <button onClick={this.handleEditClick}>edit</button>  

                
                <button onClick={() => this.props.deleteStudent(selectedStudent.id)}>delete</button>
              </div>
          </div>
        </div>
        <div id='single-student-campus-container'>
          <h2>This student is {selectedStudent.campusId ? '' : 'not'} registered to a campus</h2>
          {selectedStudent.campusId ? 
            <div>
              <Campus selectedCampus={selectedStudent.campus} studentId={selectedStudent.id} /> 
              <CampusDropdown type='EDIT' studentId={selectedStudent.id} campusId={selectedStudent.campusId}/> 
            </div>
            :
            <CampusDropdown type='ADD' studentId={selectedStudent.id}/>
          }
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    selectedStudent: state.selectedStudent,
    selectedCampus: state.selectedCampus
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewStudentDB: (id) => dispatch(viewStudentDB(id)),
    deleteStudent: (id) => {
      dispatch(deleteStudentDB(id));
      ownProps.history.push('/students');
    }
  }
}

const Student = connect(mapStateToProps, mapDispatchToProps)(_Student)
export default withRouter(Student);