import React from 'react'

const InstaPostsContext = React.createContext({
  searchInput: '',
  onChangeSearchInput: () => {},
})

export default InstaPostsContext
