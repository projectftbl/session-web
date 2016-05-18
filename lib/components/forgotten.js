import React, { Component, PropTypes } from 'react';
import { reduxForm }  from 'redux-form';
import { Form, Input, Button } from '@ftbl/form';
import { Email } from '@ftbl/icons';
import { Heading } from '@ftbl/component';
import validate from '../validate/forgotten';

export class Forgotten extends Component {

  render() {
    const { fields, handleSubmit } = this.props;
    
    return (
      <Form onSubmit={handleSubmit} name='forgotten'>
        <Heading>Reset your password</Heading>

        <Input label='Your Email' field={fields.email} Icon={Email} focus={true} />

        <Button label='Reset' onClick={handleSubmit} name='reset' />
      </Form>
    );
  }
}

export default reduxForm({ form: 'forgotten', fields: [ 'email' ], validate })(Forgotten);