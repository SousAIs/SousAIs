import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, fetchProducts } from '../store';


/**
 * COMPONENT
 */
const SignUp = (props) => {
  const { name, handleSubmit, error } = props;
  return (
    <div className="py-5">
      <div className="container">
        <div className="row auth-form">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} name={name}>
              <div className="form-group">
                <label htmlFor="email"><small>Name</small></label>
                <input className="form-control" name="fname" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="email"><small>Email</small></label>
                <input className="form-control" name="email" type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="password"><small>Password</small></label>
                <input className="form-control" name="password" type="password" />
              </div>
              <div className="form-group">
                <button type="submit">Sign Up</button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
            {/* <button id="google">
              <a href="/auth/google">{}</a>
            </button>
            <button
              id="amazon"
              onClick={() => {
                axios.get('/auth/amazon')
                .then(() => {
                  console.log('success');
                });
            }}
            >
              <a href="/auth/amazon">{}</a>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapLogin = state => ({
//   name: 'login',
//   displayName: 'Login',
//   error: state.user.error,
// });

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
});

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const name = evt.target.fname.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName, name));
    dispatch(fetchProducts());
  },
});

export default connect(mapSignup, mapDispatch)(SignUp);

/**
 * PROP TYPES
 */
SignUp.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};