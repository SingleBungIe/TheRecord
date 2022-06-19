import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import '../../styles/diary/calendar.css'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

function Calendar({ sendDiary }) {
  const [today, setToday] = useState(new Date())
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [date, setDate] = useState(today.getDate())
  const [firstArr, setFirstArr] = useState([])
  const [secondArr, setSecondArr] = useState([])
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)

  useEffect(() => {
    const tempArr = []
    const tempSecArr = []
    for (let i = 1; i < 15; i++) {
      tempArr.push(i)
    }
    setFirstArr(tempArr)
    for (
      let i = 15;
      i <= new Date(today.getFullYear(), month, 0).getDate();
      i++
    ) {
      tempSecArr.push(i)
    }
    setSecondArr(tempSecArr)
  }, [month])

  const getDiary = (y, m, d) => {
    if (m < 10 && d < 10) {
      const now = `${y}-0${m}-0${d}`
      axios
        .get(
          `https://the-record.co.kr:8080/api/diary/${homePageHostInfo.userPk}/date/${now}`,
          {
            headers: {
              'x-auth-token': sessionStorage.getItem('jwt'),
            },
          },
        )
        .then(res => {
          sendDiary(res.data)
        })
      return
    }
    if (m < 10) {
      const now = `${y}-0${m}-${d}`
      axios
        .get(
          `https://the-record.co.kr:8080/api/diary/${homePageHostInfo.userPk}/date/${now}`,
          {
            headers: {
              'x-auth-token': sessionStorage.getItem('jwt'),
            },
          },
        )
        .then(res => {
          sendDiary(res.data)
        })
      return
    }
    if (d < 10) {
      const now = `${y}-${m}-0${d}`
      axios
        .get(
          `https://the-record.co.kr:8080/api/diary/${homePageHostInfo.userPk}/date/${now}`,
          {
            headers: {
              'x-auth-token': sessionStorage.getItem('jwt'),
            },
          },
        )
        .then(res => {
          sendDiary(res.data)
        })
    } else {
      const now = `${y}-${m}-${d}`
      axios
        .get(
          `https://the-record.co.kr:8080/api/diary/${homePageHostInfo.userPk}/date/${now}`,
          {
            headers: {
              'x-auth-token': sessionStorage.getItem('jwt'),
            },
          },
        )
        .then(res => {
          sendDiary(res.data)
        })
    }
  }

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setToday(new Date(year - 1, 12, date))
      setMonth(12)
      getDiary(year - 1, 12, date)
    } else {
      setToday(new Date(year, month - 1, date))
      setMonth(month - 1)
      getDiary(year, month - 1, date)
    }
  }

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setToday(new Date(year + 1, 1, date))
      setMonth(1)
      getDiary(year + 1, 1, date)
    } else {
      setToday(new Date(year, month + 1, date))
      setMonth(month + 1)
      getDiary(year, month + 1, date)
    }
  }

  const clickDay = number => {
    setDate(number)
    setToday(new Date(year, month, number))
    getDiary(year, month, number)
  }

  return (
    <div className="calendar-div">
      <div className="calendar-today">
        {month}.{date}
      </div>
      <div className="calendar-month">
        <div className="calendar-month-div">
          <ArrowLeftIcon
            onClick={() => prevMonth()}
            sx={{ fontSize: '18px', cursor: 'pointer' }}
          />
          <p>
            {year}.{month}
          </p>
          <ArrowRightIcon
            onClick={() => nextMonth()}
            sx={{ fontSize: '18px', cursor: 'pointer' }}
          />
          <div className="calendar-day-first">
            {firstArr.map(number => (
              <button
                type="button"
                key={number}
                className={
                  number === date ? 'calendar-today-btn' : 'calendar-btn'
                }
                style={{
                  color:
                    new Date(year, month - 1, number).getDay() === 6 ||
                    new Date(year, month - 1, number).getDay() === 0
                      ? '#1D8EAE'
                      : '#848484',
                }}
                onClick={() => clickDay(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        <div className="calendar-day">
          {secondArr.map(number => (
            <button
              type="button"
              key={number}
              className={
                number === date ? 'calendar-today-btn' : 'calendar-btn'
              }
              onClick={() => clickDay(number)}
              style={{
                color:
                  new Date(year, month - 1, number).getDay() === 6 ||
                  new Date(year, month - 1, number).getDay() === 0
                    ? '#1D8EAE'
                    : '#848484',
              }}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
