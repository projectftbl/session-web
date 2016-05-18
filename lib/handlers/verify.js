import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { verify } from '../ducks/session';

export class Verify extends Component {
  componentDidMount() {
    const { verify, code } = this.props;

    verify(code);
  }

  render() {
    return <span/>;
  }
};

const mapStateToProps = (state, props) => {
  return {
    session: state.session
  , code: props.params.code
  };  
};

export default connect(mapStateToProps, { verify })(Verify);
