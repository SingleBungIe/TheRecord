import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import store from '../store'
import { actions } from '../actions/common'
import '../styles/common/navigation.css'

function Navigation() {
  const switchNav = navPage => {
    store.dispatch(actions.setValue('navPage', navPage))
  }

  useEffect(() => {
    const nowPage = store.getState().common.navPage
    const navBar = document.querySelector(`#${nowPage}`)
    navBar.style.backgroundColor = 'white'
    navBar.style.color = 'black'
    navBar.style.borderLeft = '2px solid white'
  }, [])

  return (
    <div id="navigation">
      <Link to="/home" id="nav-home" onClick={() => switchNav('nav-home')}>
        홈
      </Link>
      <Link to="/diary" id="nav-diary" onClick={() => switchNav('nav-diary')}>
        다이어리
      </Link>
      <Link to="/album" id="nav-album" onClick={() => switchNav('nav-album')}>
        사진첩
      </Link>
    </div>
  )
}

export default Navigation
