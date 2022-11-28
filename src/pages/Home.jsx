import React from 'react'
import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'

function Home() {
  return (
    <div>
        {/* {process.env.REACT_APP_GITHUB_TOKEN} */}
        <>
        <UserSearch/>
        {/* SEARCH COMPONENT */}
          <UserResults/>
        </>
    </div>
    )
}

export default Home