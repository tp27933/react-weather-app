import React, { useEffect } from 'react'
import styles from './index.module.scss'
/**
* @description the component of  error prompt
* @param {string} text - error text.
* @param {boolean} visible - componmnet visible status.
* @param {function} setText - set error text.
* @param {function} setIsVisible - set visible status.
*/

function ViewError({ text, visible, setText, setIsVisible }) {
  useEffect(
    () => {
      if (text.length === 0) return
      setIsVisible(true)
      const timeout = setTimeout(() => {
        setText('')
        setIsVisible(false)
      }, 3 * 1000);
      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        setText('')
        setIsVisible(false)
        clearTimeout(timeout);
      }
    },
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