import {Component} from 'react'

import Cookies from 'js-cookie'
import {FcLike} from 'react-icons/fc'

import {FaRegComment} from 'react-icons/fa'

import {BsHeart} from 'react-icons/bs'

import {BiShareAlt} from 'react-icons/bi'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Posts extends Component {
  state = {isLiked: false}

  onClickToggleLike = async () => {
    const {isLiked} = this.state
    this.setState(prevState => ({isLiked: !prevState.isLiked}))

    const {postDetails} = this.props
    const {postId} = postDetails
    const likedRequestBody = {
      like_status: isLiked,
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likedRequestBody),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)
  }

  render() {
    const {isLiked} = this.state
    const {postDetails} = this.props
    const {
      userId,
      userName,
      profilePic,
      postImageUrl,
      likesCount,
      caption,
      comments,
      created,
    } = postDetails
    return (
      <li className="posts-li-container">
        <div className="profilepic-container">
          <img
            className="profile-img"
            src={profilePic}
            alt="post author profile"
          />
          <Link className="link-items" to={`/users/${userId}`}>
            <p className="user-name">{userName} </p>
          </Link>
        </div>
        <img className="posts-img" src={postImageUrl} alt="post" />
        <div className="post-desription-container">
          <div className="icon-container">
            <button
              className="icon-btn"
              onClick={this.onClickToggleLike}
              testid="unlikeIcon"
              type="button"
            >
              {isLiked && <FcLike className="comment-icon" />}
            </button>
            <button
              className="icon-btn"
              onClick={this.onClickToggleLike}
              testid="likeIcon"
              type="button"
            >
              {!isLiked && <BsHeart className="comment-icon" />}
            </button>

            <button className="icon-btn" type="button">
              <FaRegComment className="comment-icon" />
            </button>

            <button className="icon-btn" type="button">
              <BiShareAlt className="comment-icon" />
            </button>
          </div>

          <p className="likes-count">{likesCount} likes </p>
          <p>{caption}</p>
          <ul className="comment-ul-container">
            {comments.map(eachComment => (
              <li className="comment-text" key={eachComment.commentsUserId}>
                <p className="user-name">{eachComment.commentsUserName} </p>
                <p>{eachComment.comment} </p>
              </li>
            ))}
          </ul>
          <p className="created-at">{created}</p>
        </div>
      </li>
    )
  }
}

export default withRouter(Posts)
