export const swithTemp = (temp, type) => {
  /*
    ℃ =K - 273.15 => 開氏溫標 到 攝氏度
    ℉ =(K - 273.15)* 1.8000+ 32.00 => 開氏溫標 到 華氏度
  */
  if (type === 'F') {
    return parseInt((temp - 273.15) * 1.8 + 32)
  } else if (type === 'C') {
    return parseInt(temp - 273.15)
  }
}

export const formatTime = (second) => {
  return new Date(second).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}
