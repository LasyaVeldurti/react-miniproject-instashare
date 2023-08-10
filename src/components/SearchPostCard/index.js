import {FcLike} from 'react-icons/fc'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const SearchPostCard = props => {
  const {postDetails} = props
  const {
    userName,
    profilePic,
    postImageUrl,
    likesCount,
    postCaption,
    comments,
    created,
  } = postDetails

  return (
    <li className="posts-li-container">
      <div className="profilepic-container">
        <img className="profile-img" src={profilePic} alt={userName} />

        <p className="user-name">{userName} </p>
      </div>
      <img className="posts-img" src={postImageUrl} alt="user post" />
      <div className="post-desription-container">
        <div className="icon-container">
          <button className="icon-btn" type="button">
            <FcLike className="comment-icon" />
          </button>

          <button className="icon-btn" type="button">
            <FaRegComment className="comment-icon" />
          </button>

          <button className="icon-btn" type="button">
            <BiShareAlt className="comment-icon" />
          </button>
        </div>

        <p className="likes-count">{likesCount} likes </p>
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

export default SearchPostCard
