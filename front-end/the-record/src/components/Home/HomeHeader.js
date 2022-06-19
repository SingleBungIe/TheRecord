/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'
import '../../styles/home/home-header.css'
import store from '../../store'
import { actions } from '../../actions/common'
import backgroundMusic from '../../assets/background_music.mp3'

function HomeHeader() {
  const navigate = useNavigate()
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)

  useEffect(() => {
    const audio = document.querySelector('audio')
    audio.volume = 0.05
  }, [])

  const moveMyPage = () => {
    store.dispatch(actions.setValue('homePageHostInfo', loginUserInfo))
    store.dispatch(actions.setValue('navPage', 'nav-home'))
    navigate('/home')
  }

  const logOut = () => {
    navigate('')
    store.dispatch(actions.setValue('navPage', 'nav-home'))
    sessionStorage.clear()
  }

  const headerProfileButton = () => {
    if (loginUserInfo.userPk !== homePageHostInfo.userPk) {
      return (
        <button
          className="header-right-button-gomyhome"
          type="button"
          onClick={() => {
            moveMyPage()
          }}
        >
          내 홈피로 돌아가기
        </button>
      )
    }
    return (
      <div className="header-right">
        <div className="header-right-button">
          <EditProfile />
        </div>
        <button
          className="header-right-button-logout"
          type="button"
          onClick={() => logOut()}
        >
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <div id="home-header">
      <p className="header-left">{homePageHostInfo.name} 님의 미니홈피</p>
      <div className="header-right-container">
        <div>{headerProfileButton()}</div>
        <audio autoPlay controls controlsList="nodownload" loop id="playAudio">
          <source src={backgroundMusic} />
        </audio>
      </div>
    </div>
  )
}

export default HomeHeader
