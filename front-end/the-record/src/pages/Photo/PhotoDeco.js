import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageEditor from '@toast-ui/react-image-editor'
import Navigation from '../../components/Navigation'

import 'tui-image-editor/dist/tui-image-editor.css'

import PhotoList from '../../components/Album/PhotoList'
import '../../styles/photo/album.css'
import '../../styles/photo/photo-deco.css'

function PhotoDeco() {
  const editorRef = useRef()
  const navigate = useNavigate()

  const myTheme = {
    'common.bisize.width': '0',
    'common.bisize.height': '0',
    'common.backgroundColor': '#fff',
    'header.margin': '0 -60px 0',
  }

  const uploadPhotoList = () => {
    const canvas = document.querySelector('.lower-canvas')
    const dataURL = canvas.toDataURL('image/png')

    navigate('/album/photodeco/upload', { state: dataURL })
  }
  return (
    <div id="photo-deco">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="photo-editor-box">
          <ImageEditor
            ref={editorRef}
            includeUI={{
              theme: myTheme,
              menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'text'],
              initMenu: 'filter',
              uiSize: {
                width: '100%',
                height: '100%',
              },
              menuBarPosition: 'left',
            }}
            selectionStyle={{
              cornerSize: 20,
              rotatingPointOffset: 70,
            }}
            usageStatistics={false}
          />
          <button
            type="button"
            className="upload-btn"
            onClick={uploadPhotoList}
          >
            사진첩에 올리기
          </button>
        </div>
        <Navigation />
      </div>
    </div>
  )
}

export default PhotoDeco
