import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

class SearchPostCard extends Component {
  state = {isLiked: false, counter: 0}

  renderPostLikeStatus = async () => {
    const {isLiked} = this.state
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

  onClickIncrementLike = () => {
    this.setState(prevState => ({counter: prevState.counter + 1}))
    this.setState({isLiked: true}, this.renderPostLikeStatus)
  }

  onClickDecrementLike = () => {
    this.setState(prevState => ({counter: prevState.counter - 1}))
    this.setState({isLiked: false}, this.renderPostLikeStatus)
  }

  render() {
    const {isLiked, counter} = this.state
    const {postDetails} = this.props
    const {
      userId,
      userName,
      profilePic,
      imageUrl,
      likesCount,
      postCaption,
      comments,
      created,
    } = postDetails
    const updatedCount = likesCount + counter

    return (
      <li className="posts-li-container">
        <div className="profilepic-container">
          <img
            className="profile-img"
            src={profilePic}
            alt="post author profile"
          />
          <Link className="link-items" to={`/users/${userId}`}>
            <span className="user-name">{userName}</span>
          </Link>
        </div>
        <img className="posts-img" src={imageUrl} alt="post" />
        <div className="post-desription-container">
          <div className="icon-container">
            {isLiked ? (
              <button
                className="icon-btn"
                onClick={this.onClickDecrementLike}
                testid="unLikeIcon"
                type="button"
              >
                <FcLike className="comment-icon" />
              </button>
            ) : (
              <button
                className="icon-btn"
                onClick={this.onClickIncrementLike}
                testid="likeIcon"
                type="button"
              >
                <BsHeart className="comment-icon" />
              </button>
            )}
            <button className="icon-btn" type="button">
              <FaRegComment className="comment-icon" />
            </button>

            <button className="icon-btn" type="button">
              <BiShareAlt className="comment-icon" />
            </button>
          </div>

          <p className="likes-count">{updatedCount} likes </p>
          <p>{postCaption}</p>
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
export default withRouter(SearchPostCard)
