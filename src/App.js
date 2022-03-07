import './styles/index.scss'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { GetTodayWeather } from './api'
import ListHistory from './compoment/ListHistory'
import PanelInfo from './compoment/PanelInfo'
import SearchBar from './compoment/SearchBar'
import ViewError from './compoment/Error'

function useDidMountEffect(func, deps) {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}
function Render({ if: cond, children }) {
  return cond ? children : null
}
function App() {
  const [weather, setWeather] = useState({
    city: '',
    country: '',
    main: '',
    description: '',
    currentTemp: '',
    temperature: {
      min: '',
      max: ''
    },
    humidity: '',
    time: ''
  }),
    [unit, setUnit] = useState('C'),
    [historyList, setHistorylist] = useState([]),
    [status, setStatus] = useState('empty')

  // 歷史紀錄存至本地端
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('weatherData') || '[]')
    setHistorylist((historyList) => data)
  }, [])
  useDidMountEffect(() => {
    sessionStorage.setItem('weatherData', JSON.stringify(historyList))
  }, [historyList])

  const filterData = useCallback((data) => {
    const { name, main, weather, sys } = data
    const newData = {
      city: name,
      country: sys.country,
      main: weather[0].main,
      description: weather[0].description,
      currentTemp: main.temp,
      temperature: {
        min: main.temp_min,
        max: main.temp_max
      },
      humidity: main.humidity,
      time: new Date().getTime(),
      icon: weather[0].icon
    }
    setWeather(() => {
      setStatus('success')
      return newData
    })
  }, [])
  useDidMountEffect(() => {
    setHistorylist((historyList) => [...historyList, weather])
  }, [weather])
  const onSearch = (arr) => {
    const param = arr.join(',')
    setStatus('loading')
    GetTodayWeather(param)
      .then(res => {
        console.log(res)
        filterData(res.data)
      }).catch(err => {
        const data = err.response.data
        setStatus('error')
        setErrorText(data.message)
      })
  }

  const deletLocalStorage = (item) => {
    setHistorylist(history => history.filter(h => h.time !== item.time))
  }
  const handleSwitch = (el) => {
    const val = el.target.name
    setUnit(val)
  }
  const onCheck = (item) => {
    if (!item.country) return onSearch([item.city])
    return onSearch([item.city, item.country])
  }
  const [visible, setVisible] = useState(false)
  const [errorText, setErrorText] = useState('')
  const RenderPanel = () => {
    const componmnet = {
      'empty': <div className='empty'>Today's Weather</div>,
      'loading': <div className='empty'><span className='loading' /></div>,
      'success': <PanelInfo weather={weather} unit={unit} />,
      'error': <ViewError text={errorText}
        setText={setErrorText}
        visible={visible}
        setIsVisible={clearErrorText} />
    }
    return (
      <Render if={status}>
        {/* {componmnet[status]} */}
        {componmnet[status]}
      </Render>
    )
  }
  const clearErrorText = (status) => {
    setVisible(status)
  }
  return (
    <div className="App container layout">
      <section className='panel-wrapper'>
        <SearchBar onSearch={onSearch} />
        <div>
          <button
            className={`tempBtn celsius ${unit === 'C' ? 'activeUnit' : null}`}
            name="C"
            onClick={handleSwitch}>℃</button>
          <button
            className={`tempBtn fahrenheit  ${unit === 'F' ? 'activeUnit' : null}`}
            name="F" onClick={handleSwitch}>℉</button>
        </div>
        {RenderPanel()}
      </section>
      <ListHistory
        list={historyList}
        onCheck={onCheck}
        onDelet={deletLocalStorage}
      />
    </div>
  );
}

export default App;
