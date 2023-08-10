import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: '', showSubmitErr: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errMsg: data.error_msg, showSubmitErr: true})
    }
  }

  render() {
    const {username, password, errMsg, showSubmitErr} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <img
          className="landing-img"
          src="https://res.cloudinary.com/dpwjw4iaw/image/upload/v1689320648/insta-share/login_ukxbg6.png"
          alt="website login"
        />
        <div className="login-form-container">
          <img
            className="logo-img"
            src="https://res.cloudinary.com/dpwjw4iaw/image/upload/v1689320648/insta-share/insta_logo_ihjpfu.png"
            alt="website logo"
          />
          <h1 className="insta-share-heading">Insta Share</h1>
          <form className="login-form" onSubmit={this.onSubmitLoginForm}>
            <label className="label-text" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.onChangeUsername}
              value={username}
              id="username"
              type="text"
              placeholder="Username"
            />
            <label className="label-text" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.onChangePassword}
              value={password}
              id="password"
              type="password"
              placeholder="Password"
            />
            {showSubmitErr && <p className="error">{errMsg}</p>}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
