import Header from '../Header'
import InstaStories from '../InstaStories'
import InstaPosts from '../InstaPosts'

const Home = () => (
  <>
    <Header />
    <main className="home-container">
      <InstaStories />
      <InstaPosts />
    </main>
  </>
)

export default Home
