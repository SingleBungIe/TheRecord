import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from '../../components/Navigation'
import UploadButton from '../../components/Album/UploadButton'
import EnterBoothButton from '../../components/Album/EnterBoothButton'
import MakeBoothButton from '../../components/Album/MakeBoothButton'
import PhotoPreview from '../../components/Album/PhotoPreview'
import PhotoList from '../../components/Album/PhotoList'
import '../../styles/photo/album.css'

function Album() {
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)

  return (
    <div id="album">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="album-btns">
          {loginUserInfo.userPk === homePageHostInfo.userPk ? (
            <UploadButton />
          ) : (
            <div />
          )}
          {loginUserInfo.userPk === homePageHostInfo.userPk && (
            <MakeBoothButton />
          )}
          <EnterBoothButton />
        </div>
        <PhotoPreview />
        <Navigation />
      </div>
    </div>
  )
}

export default Album
