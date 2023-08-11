import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userProfile: [],
    postsList: [],
    displayPosts: true,
    storiesList: [],
    displayStories: false,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const profileUrl = `https://apis.ccbp.in/insta-share/users/${userId}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const profileData = {
        profileId: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        postsCount: data.user_details.posts_count,
        userBio: data.user_details.user_bio,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
      }
      if (data.user_details.posts.length !== 0) {
        const posts = data.user_details.posts.map(eachPost => ({
          postId: eachPost.id,
          postImage: eachPost.image,
        }))
        this.setState({postsList: posts})
      } else {
        this.setState({displayPosts: false})
      }
      if (data.user_details.stories.length !== 0) {
        const stories = data.user_details.stories.map(eachStory => ({
          storyId: eachStory.id,
          storyImage: eachStory.image,
        }))
        this.setState({storiesList: stories, displayStories: true})
      }

      this.setState({
        userProfile: profileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getUserProfile()
  }

  renderSuccessView = () => {
    const {
      postsList,
      displayPosts,
      displayStories,
      userProfile,
      storiesList,
    } = this.state
    return (
      <>
        <div className="my-profile-container">
          <img
            className="profile-pic"
            src={userProfile.profilePic}
            alt="user profile"
          />
          <div>
            <h1>{userProfile.userName}</h1>
            <div className="profile-data-container">
              <p className="count-data">
                <span className="highlight">{userProfile.postsCount}</span>{' '}
                Posts
              </p>
              <p className="count-data">
                <span className="highlight"> {userProfile.followersCount}</span>{' '}
                Followers
              </p>
              <p className="count-data">
                <span className="highlight">{userProfile.followingCount}</span>
                {'  '}
                Following
              </p>
            </div>
            <p className="highlight">{userProfile.userId}</p>
            <p>{userProfile.userBio}</p>
          </div>
        </div>

        {displayStories && (
          <ul className="story-slider-container">
            {storiesList.map(eachStory => (
              <li key={eachStory.storyId}>
                <img
                  className="story-img"
                  src={eachStory.storyImage}
                  alt="user story"
                />
              </li>
            ))}
          </ul>
        )}
        <div className="posts-icon-container">
          <BsGrid3X3 className="posts-icon" />
          <h1>Posts</h1>
        </div>
        <div>
          {displayPosts ? (
            <ul className="posts-img-container">
              {postsList.map(eachItem => (
                <li key={eachItem.postId}>
                  <img
                    className="post-img"
                    src={eachItem.postImage}
                    alt="user post"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <>
              <BiCamera />
              <h1>No Posts Yet</h1>
            </>
          )}
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
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
      <button onClick={this.onClickTryAgain} type="button">
        Try Again
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
    return (
      <>
        <Header />
        <div className="my-profile-bg-container">
          <div className="display-posts-container">{this.renderPosts()}</div>
        </div>
      </>
    )
  }
}

export default UserProfile
