import React, { Component } from 'react';
import PropType from 'prop-types';

import Form from './Form';

import { isValid } from '../../utils/formValidator';

import { HEADINGS } from '../../constants';
import { ROUTES } from '../../Routes.constants';
import { FORM_FIELDS } from './Login.config';



export default class LoginPage extends Component {
    state = {
        email: {
            value: '',
            error: ''
        },
        password: {
            value: '',
            error: ''
        }
    }

    componentDidUpdate(prevProps) {
        const { loading, error } = this.props;
        if (prevProps.loading && !loading && !error) {
            this.props.history.push(ROUTES.HOME);
        }
        if (prevProps.loading && !loading && error) {
            /* replace with approp component to show error */
            // eslint-disable-next-line no-alert
            alert(error);
        }
    }

    inputChange = async (e) => {
        const { name, value } = e.target;
        const data = await isValid({ fields: FORM_FIELDS, key: name, value });
        this.setState({
            [e.target.name]: {
                value,
                error: data.error || null
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { signIn } = this.props;
        signIn({ email: e.target.email.value, password: e.target.password.value })
    };

    render() {
        const { loading } = this.props;
        return (
            <section className="loginWrapper">
                <div className="login">
                    <div className="login__header">
                        <h2>{HEADINGS.LOGIN_HERE}</h2>
                    </div>
                    <div className="login__forms">
                        <Form
                            {...this.state}
                            inputChange={this.inputChange}
                            onSubmit={this.handleSubmit}
                            loading={loading}
                        />
                    </div>
                </div>
            </section>
        );
    }
}
LoginPage.PropType = {
    className: PropType.string,
    value: PropType.string,
    emailError: PropType.string,
    type: PropType.string,
};
