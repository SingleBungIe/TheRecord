import React from 'react'
import { useSelector } from 'react-redux'
import { types } from '../../actions/common'
import callApi from '../../common/api'
import store from '../../store'
import NeighborButton from './NeighborButton'

function Profile() {
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)

  const handleEnter = sentence => {
    const newSentence = sentence.split('\n').map((line, index) => {
      return (
        <p key={(line, index)}>
          {line}
          <br />
        </p>
      )
    })
    return newSentence
  }

  const imageUrl = profile => {
    return `https://s3.ap-northeast-2.amazonaws.com/the-record.bucket/${profile}`
  }

  const handleHostProfile = () => {
    return (
      <div className="profile-info">
        <img src={imageUrl(homePageHostInfo.profile)} alt="일촌 홈피" />
        <div className="profile-text">
          {handleEnter(homePageHostInfo.introduce)}
        </div>
      </div>
    )
  }

  const handleFriendship = async () => {
    await callApi({
      method: 'post',
      url: `/api/user/neighbor`,
      data: { userPk: homePageHostInfo.userPk },
    })
    store.dispatch({
      type: types.FETCH_USER_INFO,
      userInfo: homePageHostInfo,
      key: 'homePageHostInfo',
    })
  }

  const handleNeighborButton = () => {
    if (loginUserInfo.userPk !== homePageHostInfo.userPk) {
      if (homePageHostInfo.neighbor) {
        return (
          <button disabled type="button" className="already-ilchon-button">
            일촌 입니다
          </button>
        )
      }
      return (
        <button
          type="button"
          className="ilchon-button"
          onClick={() => handleFriendship()}
        >
          일촌 맺기
        </button>
      )
    }
    return <NeighborButton />
  }

  return (
    <div id="profile">
      {handleHostProfile()}
      {handleNeighborButton()}
    </div>
  )
}

export default Profile
