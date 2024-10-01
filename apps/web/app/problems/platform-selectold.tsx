import { useProblemSearchFilter } from '@/store'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/ui'
import React from 'react'

const PlatformSelectOld = () => {
  const { platforms, setPlatforms } = useProblemSearchFilter()
  return (
    <>
      <Select>
        <SelectTrigger className='w-[280px]'>
          <SelectValue placeholder='Select platform(s)'>Platforms</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='LC'>Leetcode (LC)</SelectItem>
          <SelectItem value='GFG'>GeeksForGeeks (GFG)</SelectItem>
          <SelectItem value='GFE'>GreatFrontend (GFE)</SelectItem>
          {/* <SelectItem value='jst'>TryExponent (TE)</SelectItem> */}
          {/* <SelectItem value='kst'>Korea Standard Time (KST)</SelectItem> */}
          {/* <SelectItem value='ist_indonesia'>
            Indonesia Central Standard Time (WITA)
          </SelectItem> */}
        </SelectContent>
      </Select>
    </>
  )
}

export default PlatformSelectOld
