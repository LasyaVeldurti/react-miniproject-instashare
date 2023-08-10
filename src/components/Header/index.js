import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
// import {ImCross} from 'react-icons/im'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

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
            //  onClick={this.onClickHamburgerIcon}
            testid="hamburgerMenuIcon"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>

      <div className="nav-links-container">
        <ul className="list-container">
          <li className="search-container">
            <input
              //  onChange={this.enterInputText}
              className="search-bar"
              placeholder="Search Caption"
              type="search"
            />
          </li>
          <li>
            <button
              //   onClick={this.onClickSearchIcon}
              className="search-btn"
              type="button"
            >
              <FaSearch />
            </button>{' '}
          </li>
        </ul>
        <ul className="logo-container">
          <Link className="link-items" to="/">
            <li>
              <p>Home</p>
            </li>
          </Link>
          <Link className="link-items" to="/my-profile">
            <li>
              <p>Profile</p>
            </li>
          </Link>

          <li>
            <button
              onClick={onClickLogout}
              className="logout-btn"
              type="button"
            >
              Logout
            </button>
          </li>
          <button
            className="ham-btn"
            //  onClick={this.onClickCloseBtn}
            testid="closeIcon"
            type="button"
          >
            close
          </button>
        </ul>
      </div>
    </header>
  )
}
export default withRouter(Header)
