import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import UserCard from '../YourCard/YourCard';



const mapStateToProps = state => ({
  user: state.user,
});

class YourProfile extends Component {
  constructor() {
    super();
    // Keep track of the student list
    this.state = {
      userProfile: []
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getProfile();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

getProfile = () => {
  axios.get('/profile/get')
  .then(response => {
    console.log('get profile', response.data);
    this.setState({
      userProfile: response.data
    })
  })
  .catch(error => {
    console.log('did not get profile', error);
  })
}

  render() {
    // let content = null;

    // if (this.props.user.userName) {
    //   content = (
    //     <div>
    //       <h1
    //         id="welcome"
    //       >
    //         Welcome, { this.props.user.userName }!
    //       </h1>
    //       <button
    //         onClick={this.logout}
    //       >
    //         Log Out
    //       </button>
    //     </div>
    //   );
    // }
    let content = null
    if (this.state.userProfile){
      content = (
      <div>
        <UserCard userCard={this.state.userProfile}/>
      </div>
      );
    }
      return(
        <div>
          <Nav />
          {content}
        </div>
      ); 
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(YourProfile);

