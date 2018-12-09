import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
            errors: {},
            isLoading: false
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChange(e) {
        //console.log("---e.target.name-------", e.target.name);
        //console.log("---e.target.value-------", e.target.value);
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("---this state---", this.state);
        this.props.userSignupRequest(this.state).then(
            () => {},
            (err) => {
                 //console.log(err.response.data);
                 this.setState({errors: err.response.data.errors});
            }
        );
    }

    render() {
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Signup Form</h1>
                <div className= {classnames("form-group", {'has-error': errors.username})}>
                    <label className="control-label">UserName</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                    {errors.username && <span className="help-block">{errors.username}</span> }
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Timesone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className="form-control"
                    >
                        <option value="" disabled>Chosen Your Timezone</option>
                        {options}
                    </select>
                </div>

                <div className="from-group">
                    <button className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}
export default SignupForm;
