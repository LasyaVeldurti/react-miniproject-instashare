import './index.css'

const NotFound = props => {
  const onClickHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dpwjw4iaw/image/upload/v1690264349/not-found-page_gseyck.png"
        alt="page not found"
      />
      <h1>PAGE NOT FOUND</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <p>Please go back to the homepage.</p>

      <button onClick={onClickHomePage} className="home-page-btn" type="button">
        Home Page
      </button>
    </div>
  )
}
export default NotFound
