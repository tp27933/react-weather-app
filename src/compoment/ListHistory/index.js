import React from 'react'
import styles from './index.module.scss'
import { formatTime } from '../../utils'
import searchIcon from '../../assets/search.svg'
import trashIcon from '../../assets/trash.svg'

function ListHistory({ list, onCheck, onDelet }) {
  const { icon, itemWrap, index, search, city, time } = styles
  return (
    <section className={`history-list ${styles.root}`}>
      <h3>Search History</h3>
      <hr />
      <ul >
        {
          list.map((history, idx) => (
            <li key={`history-${idx}`} className={itemWrap} data-label={idx + 1}>
              <div className={city}>
                {/* {idx + 1}. */}
                <span className={index}>{history.city}, {history.country}</span>
              </div>
              <div className={itemWrap}>
                <span className={time}>{formatTime(history.time)}</span>
                <button onClick={() => onCheck(history)}>
                  <img
                    src={searchIcon}
                    className={`${search} ${icon}`}
                    alt="search"
                  />
                </button>
                <button onClick={() => onDelet(history)}>
                  <img src={trashIcon} className={icon} alt="delet" />
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default ListHistory