import React, { Component } from 'react';

import ButtonElement from '../../../Components/ButtonElement';
import InputField from '../../../Components/InputField';


export default class Form extends Component {
  render() {
    const { email, password, loading, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <ul className={"formsBlock__list"}>
          <li>
           
 <InputField
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              required          
            />
          </li>
          <li>
            <InputField
              id="password"
              name='password'
              placeholder='Password'
              type='password'
              required
            />
          </li>
          <li>
            <ButtonElement
              disable={
                (password.error || email.error) ||
                (!email.value || !password.value) ||
                loading
              }
              children={loading ? 'Please wait' : 'Login'}
            />
          </li>
        </ul>
      </form>
    );
  }
}