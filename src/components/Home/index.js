import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import InstaStories from '../InstaStories'
import InstaPosts from '../InstaPosts'

import SearchPostCard from '../SearchPostCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchResultsList: [],
    searchInput: '',
    displayResults: false,
  }

  getSearchResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`

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
      //  console.log(data.posts)
      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        created: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postCaption: eachPost.post_details.caption,
        imageUrl: eachPost.post_details.image_url,
        comments: eachPost.comments.map(eachComment => ({
          commentsUserName: eachComment.user_name,
          commentsUserId: eachComment.user_id,
          comment: eachComment.comment,
        })),
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchResultsList: updatedData,
        displayResults: true,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSearchInput = searchValue => {
    this.setState({searchInput: searchValue})
  }

  enterSearchInput = () => {
    this.getSearchResults()
  }

  onClickTryAgain = () => {
    this.getSearchResults()
  }

  renderSuccessView = () => {
    const {searchResultsList} = this.state

    return (
      <>
        {searchResultsList.length !== 0 ? (
          <div className="search-results-conatiner">
            <h1 className="search-results-title">Search Results</h1>
            <ul className="posts-ul-container">
              {searchResultsList.map(eachItem => (
                <SearchPostCard key={eachItem.postId} postDetails={eachItem} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="search-not-found-container">
            <img
              className="search-not-found-img"
              src="https://res.cloudinary.com/dpwjw4iaw/image/upload/v1691480717/Search_Not_Found_soahno.png"
              alt="search not found"
            />
            <h1 className="search-not-found-h1">Search Not Found</h1>
            <p className="search-not-found-p">
              Try different keyword or search again
            </p>
          </div>
        )}
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
        Try again
      </button>
    </div>
  )

  renderAllSearchResults() {
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
    const {displayResults} = this.state
    return (
      <>
        <Header
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
        {displayResults ? (
          this.renderAllSearchResults()
        ) : (
          <div>
            <InstaStories />
            <InstaPosts />
          </div>
        )}
      </>
    )
  }
}

export default Home
