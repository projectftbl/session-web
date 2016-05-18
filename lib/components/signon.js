import React, { Component, PropTypes } from 'react';
import { reduxForm }  from 'redux-form';
import { Form, Input, Button, Message } from '@ftbl/form';
import { Email, Question, Err } from '@ftbl/icons';
import { Heading } from '@ftbl/component';
import validate from '../validate/signon';

export class SignOn extends Component {
  render() {
    const { fields, session: { isSigningOn, error }, handleSubmit } = this.props;
    
    return (
      <Form onSubmit={handleSubmit} name='signon'>
        <Heading>Sign On</Heading>

        <Input label='Email' field={fields.email} Icon={Email} focus={true} />
        <Input label='Password' type='password' field={fields.password} Icon={Question} />

        <Button label={isSigningOn ? 'Signing On...' : 'Sign On'}
                disabled={isSigningOn}
                onClick={handleSubmit} name='signon' />
        <Message>{error}</Message>
      </Form>
    );
  }
}

export default reduxForm({ form: 'signon', fields: [ 'email', 'password' ], validate })(SignOn);