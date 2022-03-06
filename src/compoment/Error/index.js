import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
function ViewError({ text, visible, setText, setInVisible }) {
  useEffect(
    () => {
      if (text.length === 0) return
      setInVisible(true)
      const timeout = setTimeout(() => {
        setText('')
        setInVisible(false)
      }, 5 * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        setText('')
        setInVisible(false)
        clearTimeout(timeout);
      }
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [text]
  )
  return (
    <>
      {
        visible &&
        <div className={styles.error}>{text}</div>
      }
    </>

  )
}

export default ViewError