import React from 'react'
import Profile from '../components/Home/Profile'
import UpdatedNews from '../components/Home/UpdatedNews'
import Navigation from '../components/Navigation'
import '../styles/home/home.css'
import '../styles/home/neighbor-button.css'

function Home() {
  return (
    <div id="home">
      <div className="bg-white-left">
        <Profile />
      </div>
      <div className="bg-white-right">
        <UpdatedNews />
        <Navigation />
      </div>
    </div>
  )
}

export default Home
