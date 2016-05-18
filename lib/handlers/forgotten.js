import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../ducks/forgotten';
import ForgottenForm from '../components/forgotten';

export class Forgotten extends Component {
  render() {
    const { resetPassword } = this.props;

    return (
      <ForgottenForm onSubmit={resetPassword}/>
    );
  }
}

export default connect(state => ({ forgotten: state.forgotten }), { resetPassword })(Forgotten);
