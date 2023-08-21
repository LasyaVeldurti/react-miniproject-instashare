import {Component} from 'react'
import Slider from 'react-slick'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import ReactSlick from '../ReactSlick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class InstaStories extends Component {
  state = {apiStatus: apiStatusConstants.initial, userStoriesList: []}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/insta-share/stories'

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
      const userStoriesData = data.users_stories.map(eachStory => ({
        id: eachStory.user_id,
        name: eachStory.user_name,
        storyImage: eachStory.story_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        userStoriesList: userStoriesData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getUserStories()
  }

  renderSuccessView = () => {
    const {userStoriesList} = this.state

    const settings = {
      arrows: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      className: 'slides',
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {userStoriesList.map(eachItem => (
            <ReactSlick key={eachItem.id} userStoryDetails={eachItem} />
          ))}
        </Slider>
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
      <p>Something Went Wrong. Please Try again</p>
      <button onClick={this.onClickTryAgain} type="button">
        Try again
      </button>
    </div>
  )

  renderStories() {
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
    return this.renderStories()
  }
}

export default InstaStories
