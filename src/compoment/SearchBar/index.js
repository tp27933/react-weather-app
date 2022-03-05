import React, { useRef, useState } from 'react'
import styles from './index.module.scss'

function SearchBar(props) {
  const { onSearch } = props,
    [inputVal, setInput] = useState({
      city: '',
      country: ''
    })
  const onClick = (e) => {
    console.dir(e)
    const { city, country } = inputVal
    const cityVal = city.trim()
    const countryVal = country.trim()
    if (!cityVal) return
    if (!countryVal) return onSearch([cityVal])
    return onSearch([cityVal, countryVal])
  }
  const clearInputs = (e) => {
    setInput(() => ({
      city: '',
      country: ''
    }))
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setInput((input) => ({
      ...input,
      [name]: value
    }))
  }
  const { btnGroup, inputLabel, root, input, inputGroup, btnSearch, btnClear, btn } = styles

  return (
    <div className={`search-bar ${root}`}>
      <div className={inputGroup}>
        <label className={inputLabel}>City </label>
        <input
          value={inputVal.city}
          name="city"
          className={`input-city ${input}`}
          onChange={onChange}
          type="text" />
      </div>
      <div className={inputGroup}>
        <label className={inputLabel}>Country </label>
        <input
          value={inputVal.country}
          type="text"
          name="country"
          className={`${input} input-country`}
          onChange={onChange}
        />
      </div>
      <div className={btnGroup}>
        <button className={`${btnSearch} ${btn}`} onClick={onClick} >
          Search
        </button>
        <button className={`${btnClear} ${btn}`} onClick={clearInputs}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default SearchBar