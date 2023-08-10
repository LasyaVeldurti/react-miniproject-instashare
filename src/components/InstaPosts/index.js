import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Posts from '../Posts'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class InstaPosts extends Component {
  state = {apiStatus: apiStatusConstants.initial, postsList: []}

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/posts'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok === true) {
      //   console.log(data.posts)
      const postsData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        created: eachPost.created_at,
        likesCount: eachPost.likes_count,
        caption: eachPost.post_details.caption,
        postImageUrl: eachPost.post_details.image_url,
        comments: eachPost.comments.map(eachComment => ({
          commentsUserName: eachComment.user_name,
          commentsUserId: eachComment.user_id,
          comment: eachComment.comment,
        })),
      }))

      console.log(postsData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        postsList: postsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTyrAgain = () => {
    this.getPosts()
  }

  renderSuccessView = () => {
    const {postsList} = this.state
    return (
      <ul className="posts-ul-container">
        {postsList.map(eachItem => (
          <Posts key={eachItem.postId} postDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dpwjw4iaw/image/upload/v1689351009/insta-share/failure_image_k4ew3a.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.onClickTyrAgain} type="button">
        Try again
      </button>
    </div>
  )

  renderPosts() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderPosts()
  }
}

export default InstaPosts
