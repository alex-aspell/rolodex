import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
const FormItem = Form.Item;

const mapStateToProps = state => ({
  user: state.user,
});

class UpdateProfile extends Component {
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
            <Input type="text" name="firstName" placeholder="First Name" />
          </FormItem>
        </Form>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UpdateProfile);
