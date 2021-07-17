
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { deleteCampus } from '../store/campuses'

class Campuses extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    const { campuses, deleteCampus } = this.props;
   
    return (     
      <div className='campuses-list'>
          <div className="row justify-content-between"> 
            <div className="col">
              <h2> All Campuses ({ campuses.length }) </h2>
            </div>
            <div className="col text-end">
              <Link to='/campuses/create'> <button className="btn-primary"> Add a Campus  </button> </Link>
            </div>
          </div>
         
          <div className="campus-outer">
            {
              campuses.map(campus => {
                const studentList = campus.students;
                return (
                  <div className="campus-inner" key={ campus.id }>
                    <div className="campus-detail">
                      <div> <h3 className="underline"> <Link to={`/campuses/${campus.id}`}> { campus.name } <span class="chevron"></span></Link>  </h3> </div>
                      <div> Address:  { campus.address } </div>
                      <div> { campus.students.length } students are currently assigned to this campus </div>
                    </div>
                    
                      <div className="view"> <Link to={`/campuses/${campus.id}`}> <FontAwesomeIcon icon={faEye} />

</Link> </div>
                      <div className="delete"><button onClick={ () => deleteCampus(campus) }> <FontAwesomeIcon icon={faBan} /> </button> </div>
                  </div>
                )
              })
            }
          </div>
      </div>
    )
  }
}

const mapStateToProps = ({ campuses }) => {
  console.log(`mapStateToProps campuses => ${campuses.length}`)
    return {
      campuses
    };
  };

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Campuses);