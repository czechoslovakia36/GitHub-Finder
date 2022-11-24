import React from 'react'
import UserResults from '../components/users/UserResults'
function Home() {
  return (
    <div>
        {/* {process.env.REACT_APP_GITHUB_TOKEN} */}
        <>
        {/* SEARCH COMPONENT */}
          <UserResults/>
        </>
    </div>
    )
}

export default Home