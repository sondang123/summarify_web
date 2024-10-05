import { Input } from '@/components/ui/input'
import type React from 'react'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'

interface InputTimeProps {
  onChange: (time: string) => void
  defaultValue?: string // Thêm prop mới
}

const InputTime: React.FC<InputTimeProps> = ({ onChange, defaultValue }) => {
  const [time, setTime] = useState(() => {
    if (defaultValue) {
      const [hh, mm, ss] = defaultValue.split(':')
      return { hh, mm, ss }
    }
    return { hh: '', mm: '', ss: '' }
  })

  const hourRef = useRef<HTMLInputElement>(null)
  const minuteRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'hh' | 'mm' | 'ss',
  ) => {
    const value = e.target.value
    if (/^\d{0,2}$/.test(value)) {
      let newValue = value
      if (field !== 'hh' && Number.parseInt(value) > 59) {
        newValue = '59'
      }
      const newTime = { ...time, [field]: newValue }
      setTime(newTime)
      const formattedTime = `${newTime.hh.padStart(2, '0')}:${newTime.mm.padStart(2, '0')}:${newTime.ss.padStart(2, '0')}`
      onChange(formattedTime) // Pass the formatted string
      if (newValue.length === 2) {
        if (field === 'hh') minuteRef.current?.focus()
        if (field === 'mm') secondRef.current?.focus()
      }
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: 'hh' | 'mm' | 'ss',
  ) => {
    if (e.key === 'Backspace' && time[field] === '') {
      if (field === 'mm') hourRef.current?.focus()
      if (field === 'ss') minuteRef.current?.focus()
    }
  }
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue)
    }
  }, [])

  return (
    <div
      className={`flex h-12 items-center rounded-full border ${
        isFocused ? 'border-main-primary' : 'border-neutral-2'
      }`}
      onClick={() => secondRef.current?.focus()}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false)
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="me-3 ml-4"
      >
        <path
          d="M21.5366 5.52505C21.3896 5.67505 21.1948 5.75002 21.0008 5.75002C20.8118 5.75002 20.6219 5.67903 20.4759 5.53603L18.4759 3.57607C18.1809 3.28607 18.1759 2.81104 18.4649 2.51504C18.7559 2.21904 19.2296 2.21405 19.5266 2.50405L21.5266 4.46401C21.8206 4.75401 21.8256 5.22905 21.5366 5.52505ZM5.53079 3.53005C5.82379 3.23705 5.82379 2.76202 5.53079 2.46902C5.23779 2.17602 4.76275 2.17602 4.46975 2.46902L2.46975 4.46902C2.17675 4.76202 2.17675 5.23705 2.46975 5.53005C2.61575 5.67605 2.80778 5.75002 2.99978 5.75002C3.19178 5.75002 3.38381 5.67705 3.52981 5.53005L5.53079 3.53005ZM17.1367 19.0691L18.5318 20.471C18.8248 20.765 18.8228 21.24 18.5298 21.532C18.3838 21.678 18.1918 21.75 18.0008 21.75C17.8088 21.75 17.6158 21.6761 17.4698 21.5291L15.8128 19.864C14.6588 20.426 13.3688 20.75 12.0008 20.75C10.6328 20.75 9.34374 20.426 8.18874 19.864L6.53176 21.5291C6.38576 21.6761 6.19276 21.75 6.00076 21.75C5.80976 21.75 5.6177 21.677 5.4717 21.532C5.1787 21.24 5.17675 20.765 5.46975 20.471L6.86477 19.0691C4.67977 17.4771 3.25076 14.905 3.25076 12C3.25076 7.17502 7.17576 3.25002 12.0008 3.25002C16.8258 3.25002 20.7508 7.17502 20.7508 12C20.7508 14.905 19.3217 17.4771 17.1367 19.0691ZM12.0008 19.25C15.9988 19.25 19.2508 15.998 19.2508 12C19.2508 8.00202 15.9988 4.75002 12.0008 4.75002C8.00276 4.75002 4.75076 8.00202 4.75076 12C4.75076 15.998 8.00276 19.25 12.0008 19.25ZM12.0008 7.29006C11.5868 7.29006 11.2508 7.62606 11.2508 8.04006V12.0401C11.2508 12.4541 11.5868 12.7901 12.0008 12.7901C12.4148 12.7901 12.7508 12.4541 12.7508 12.0401V8.04006C12.7508 7.62606 12.4148 7.29006 12.0008 7.29006Z"
          fill="#505264"
        />
      </svg>
      <Input
        ref={hourRef}
        value={time.hh}
        onChange={(e) => handleChange(e, 'hh')}
        placeholder="hh"
        maxLength={2}
        className="w-6 border-none p-0 text-center"
        onClick={(e) => e.stopPropagation()}
      />
      <span className="text-sm"> :</span>
      <Input
        ref={minuteRef}
        value={time.mm}
        onChange={(e) => handleChange(e, 'mm')}
        onKeyDown={(e) => handleKeyDown(e, 'mm')}
        placeholder="mm"
        maxLength={2}
        className="w-8 border-none p-0 text-center"
        onClick={(e) => e.stopPropagation()}
      />
      <span className="text-sm">:</span>
      <Input
        ref={secondRef}
        value={time.ss}
        onChange={(e) => handleChange(e, 'ss')}
        onKeyDown={(e) => handleKeyDown(e, 'ss')}
        placeholder="ss"
        maxLength={2}
        className="w-6 border-none p-0 text-center"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default InputTime
