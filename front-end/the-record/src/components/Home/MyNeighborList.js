import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import callApi from '../../common/api'
import store from '../../store'
import { types } from '../../actions/common'

function MyNeighborList() {
  const [ListOpen, setListOpen] = useState(false)
  const [neighborList, setNeighborList] = useState([])
  const navigate = useNavigate()
  const handleHost = neighbor => {
    store.dispatch({
      type: types.FETCH_USER_INFO,
      userInfo: neighbor,
      key: 'homePageHostInfo',
    })
    navigate('/home')
  }

  useEffect(() => {
    const handleNeighbor = async () => {
      const res = await callApi({ url: '/api/user/neighbor' })
      setNeighborList(() => res)
    }
    handleNeighbor()
  }, [])

  const showNeighborList = () => {
    if (neighborList.length === 0) {
      return (
        <div style={{ textAlign: 'center', marginTop: 5 }}>
          일촌을 만들어보세요
        </div>
      )
    }
    return neighborList.map(neighbor => (
      <div key={neighbor.userPk} className="my-neighbor-list-item">
        <HomeIcon sx={{ mr: 1 }} />
        <button type="button" onClick={() => [handleHost(neighbor)]}>
          {neighbor.name} ({neighbor.userId})
        </button>
      </div>
    ))
  }

  return (
    <div id="my-neighbor-list">
      <button type="button" onClick={() => setListOpen(!ListOpen)}>
        <div />
        <div className="ilchon-surf-button">
          <StarIcon />
          <p>일촌 파도타기</p>
        </div>
        {ListOpen ? (
          <ArrowDropUpIcon color="action" />
        ) : (
          <ArrowDropDownIcon color="action" />
        )}
      </button>

      <div className="my-neighbor-list">{ListOpen && showNeighborList()}</div>
    </div>
  )
}

export default MyNeighborList
