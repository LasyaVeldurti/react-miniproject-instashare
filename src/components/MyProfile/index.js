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

class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    myProfile: [],
    postsList: [],
    displayPosts: true,
    displayStories: false,
    storiesList: [],
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const profileUrl = 'https://apis.ccbp.in/insta-share/my-profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    //  console.log(data)
    if (response.ok === true) {
      const profileData = {
        profileId: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        postsCount: data.profile.posts_count,
        userBio: data.profile.user_bio,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
      }
      if (data.profile.posts.length !== 0) {
        const posts = data.profile.posts.map(eachPost => ({
          postId: eachPost.id,
          postImage: eachPost.image,
        }))
        this.setState({postsList: posts})
      } else {
        this.setState({displayPosts: false})
      }
      if (data.profile.stories.length !== 0) {
        const stories = data.profile.stories.map(eachStory => ({
          storyId: eachStory.id,
          storyImage: eachStory.image,
        }))
        this.setState({storiesList: stories, displayStories: true})
      }

      this.setState({
        myProfile: profileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getMyProfile()
  }

  renderSuccessView = () => {
    const {
      postsList,
      displayPosts,
      storiesList,
      displayStories,
      myProfile,
    } = this.state

    return (
      <>
        <div className="my-profile-container">
          <img
            className="profile-pic"
            src={myProfile.profilePic}
            alt="my profile"
          />
          <div>
            <h1>{myProfile.userName}</h1>
            <div className="profile-data-container">
              <p className="count-data">
                <span className="highlight">{myProfile.postsCount}</span> Posts
              </p>
              <p className="count-data">
                <span className="highlight"> {myProfile.followersCount}</span>{' '}
                Followers
              </p>
              <p className="count-data">
                <span className="highlight">{myProfile.followingCount}</span>
                {'  '}
                Following
              </p>
            </div>

            <p className="highlight">{myProfile.userId}</p>

            <p>{myProfile.userBio}</p>
          </div>
        </div>

        <div className="posts-icon-container">
          <BsGrid3X3 className="posts-icon" />
          <h1>Posts</h1>
        </div>
        <div>
          {displayStories && (
            <ul className="story-slider-container">
              {storiesList.map(eachItem => (
                <li key={eachItem.storyId}>
                  <img
                    className="story-img"
                    src={eachItem.storyImage}
                    alt="my story"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          {displayPosts ? (
            <ul className="posts-img-container">
              {postsList.map(eachItem => (
                <li key={eachItem.postId}>
                  <img
                    className="post-img"
                    src={eachItem.postImage}
                    alt="my post"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <>
              <BiCamera />
              <h1>No Posts</h1>
            </>
          )}
        </div>
      </>
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

export default MyProfile
