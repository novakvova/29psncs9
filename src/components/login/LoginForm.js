import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { login } from '../../actions/authActions';
//Використовується для передачі даних компоненту через props
import { connect } from 'react-redux';
//Для перевірки props компонента
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({errors: {}, isLoading: true});
        console.log("Hello submit", this.state);
        this.props.login(this.state).then(
            ()=>this.context.router.push('/'),
            (error) => {
                var data=error.response.data;
                this.setState({errors: data.errors, isLoading: false});
                console.log(data);
            }
        );
        //var self=this;

        // setTimeout(f => {
        //     this.setState({errors: {}, isLoading: false});
        //     console.log("Hello submit complete", this.state);
        //     this.context.router.push('/');
        // }, 5000);
        
    }


    render() {
        const {errors, email, password, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                    type="email"
                />

                <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                <div className="from-group">
                    <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
