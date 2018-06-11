import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
const FormItem = Form.Item;

const mapStateToProps = state => ({
  user: state.user,
});

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      linkedIn: '',
    };
  }

  handleProfileChangeFor = profile => (event) => {
    this.setState({
      [profile]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios.post('/profile', this.state)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('post error', error);
    })
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Update Profile
          </p>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        <Form onSubmit={this.handleSubmit} className="update-profile-form">
          <FormItem>
            <Input type="text" name="firstName" placeholder="First Name" onChange={this.handleProfileChangeFor('firstName')} />
          </FormItem>
          <FormItem>
            <Input type="text" name="lastName" placeholder="Last Name" onChange={this.handleProfileChangeFor('lastName')} />
          </FormItem>
          <FormItem>
            <Input type="text" name="email" placeholder="Email" onChange={this.handleProfileChangeFor('email')} />
          </FormItem>
          <FormItem>
            <Input type="integer" name="phoneNumber" placeholder="Phone Number" onChange={this.handleProfileChangeFor('phoneNumber')} />
          </FormItem>
          <FormItem>
            <Input type="integer" name="linkedIn" placeholder="LinkedIn" onChange={this.handleProfileChangeFor('linkedIn')} />
          </FormItem>
          <FormItem>
            <Button type="primarty" htmlType="submit" className="update-profile-button">
            Update
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UpdateProfile);
