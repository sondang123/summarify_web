import { v4 as uuidv4 } from 'uuid'
export const debounce = (func = () => {}, timeout = 300) => {
  let timer: any
  return (...args: []) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export const returnFileSize = (input: string | number): string => {
  // Chuyển đổi đầu vào thành number nếu là string
  if (input) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let unitIndex = 0
    let size = Number(input)

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  return '0'
}
export const formatTimeZero = (value: string) => {
  let convertedValue = value

  if (convertedValue == null) {
    return '00'
  }

  convertedValue = convertedValue.toString()

  if (convertedValue.length === 1) {
    return `0${convertedValue}`
  }

  return convertedValue
}

export const uuidRandom = () => {
  return uuidv4()
}
export const getYoutubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/

  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ''
}
export const formatDuration = (duration: number) => {
  const seconds = Number(duration)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.round(seconds % 60)

  const parts = []
  if (hours > 0) parts.push(`${hours}hours`)
  if (minutes > 0) parts.push(`${minutes}mins`)
  if (remainingSeconds > 0 || parts.length === 0)
    parts.push(`${remainingSeconds || 0}secs`)

  return parts.join(' ')
}
export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hrs > 0) {
    return [hrs, mins, secs].map((v) => v.toString().padStart(2, '0')).join(':')
  }
  return [mins, secs].map((v) => v.toString().padStart(2, '0')).join(':')
}
