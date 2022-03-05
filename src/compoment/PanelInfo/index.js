import React from 'react'
import { formatTime, swithTemp } from '../../utils'
import styles from './index.module.scss'
function PanelInfo({ weather, unit }) {
  const {
    main,
    city,
    country,
    description,
    humidity,
    icon,
    temperature,
    time,
    currentTemp
  } = weather
  const RenderTemp = (temperature) => {
    return (
      <>
        {swithTemp(temperature, unit)}
        <span className={tmpUint}><sup>°</sup>{unit}</span>
      </>
    )
  }
  const { root, name, status, label, iconStyle, info, currentTmp, tmpUint } = styles
  return (
    <section className={root}>

      <span className={name}>{city},{country}</span>
      <div className={`current-tmp ${currentTmp}`}>
        {RenderTemp(currentTemp)}
      </div>
      <div className={status}>
        <span> {main}</span>
        <img className={iconStyle} src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      </div>
      <div className={info}>
        <p><span className={label}>Description:</span>{description}</p>
        <p>
          <span className={label}>Temperature :</span>
          {RenderTemp(temperature.min)} ~{RenderTemp(temperature.max)}
        </p>

        <p><span className={label}>humidity :</span>{humidity}%</p>
        <p><span className={label}>Time :</span>{formatTime(time)}</p>
      </div>
    </section>
  )
}

export default PanelInfo