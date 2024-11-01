'use client'
import { useRepoStructure } from '@/store'
import React from 'react'

const SelectDirectoryModal = () => {
  const { directoryModal, setDirectoryModal } = useRepoStructure()
  if (!directoryModal) return
  return (
    <>
      <div className='fixed inset-0 z-50 bg-foreground/10'></div>
      <div className='border-gray fixed inset-0 left-[50%] top-[50%] z-100 m-4 flex h-fit -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border bg-background p-8'>
        <div onClick={() => setDirectoryModal(false)}>lists</div>
      </div>
    </>
  )
}

export default SelectDirectoryModal
