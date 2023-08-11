import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {ImCross} from 'react-icons/im'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {showNavMenu: false}

  enterInputText = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onClickSearchIcon = () => {
    const {enterSearchInput} = this.props
    enterSearchInput()
  }

  onClickHamburgerIcon = () => {
    this.setState(prevState => ({showNavMenu: !prevState.showNavMenu}))
  }

  onClickCloseBtn = () => {
    this.setState({showNavMenu: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showNavMenu} = this.state
    return (
      <header>
        <nav>
          <div className="header-container">
            <ul className="logo-container">
              <Link className="link-items" to="/">
                <li>
                  <img
                    className="logo-img"
                    src="https://res.cloudinary.com/dpwjw4iaw/image/upload/v1689320648/insta-share/insta_logo_ihjpfu.png"
                    alt="website logo"
                  />
                </li>
              </Link>
              <li>
                <h1 className="insta-share-logo-heading">Insta Share</h1>
              </li>
            </ul>
            <button
              type="button"
              className="ham-btn"
              onClick={this.onClickHamburgerIcon}
              data-testid="hamburgerMenuIcon"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </nav>
        {showNavMenu && (
          <div className="nav-links-container">
            <div className="search-container">
              <input
                onChange={this.enterInputText}
                className="search-bar"
                placeholder="Search Caption"
                type="search"
              />
              <button
                onClick={this.onClickSearchIcon}
                className="search-btn"
                type="button"
                data-testid="searchIcon"
              >
                <FaSearch />
              </button>
            </div>

            <ul className="logo-container">
              <Link className="link-items" to="/">
                <li className="nav-items">
                  <p>Home</p>
                </li>
              </Link>
              <Link className="link-items" to="/my-profile">
                <li className="nav-items">
                  <p>Profile</p>
                </li>
              </Link>

              <li>
                <button
                  onClick={this.onClickLogout}
                  className="logout-btn"
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              className="ham-btn"
              onClick={this.onClickCloseBtn}
              data-testid="closeIcon"
              type="button"
            >
              <ImCross className="close-icon" />
            </button>
          </div>
        )}
      </header>
    )
  }
}
export default withRouter(Header)
