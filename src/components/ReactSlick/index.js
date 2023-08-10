import './index.css'

const ReactSlick = props => {
  const {userStoryDetails} = props
  const {name, storyImage} = userStoryDetails

  return (
    <>
      <li>
        <img className="story-img" src={storyImage} alt={name} />
        <p className="name">{name}</p>
      </li>
    </>
  )
}

export default ReactSlick
