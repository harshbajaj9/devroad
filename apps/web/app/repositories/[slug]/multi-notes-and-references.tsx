'use client'
import { useRepository } from '@/store'
import React, { useEffect } from 'react'
import NotesAndReferences from './edit/notes-and-references'
import RepoDescriptionAndReferences from './edit/repo-desc-and-ref'
import SectionDescriptionAndReferences from './edit/section-desc-and-ref'
import { Repository } from '@repo/database'

interface MultiNotesAndReferences {
  repository: Repository
  isOwner?: boolean
}
const MultiNotesAndReferences = ({
  repository,
  isOwner = false
}: MultiNotesAndReferences) => {
  const { openItem } = useRepository()
  const { setRepositoryDetails } = useRepository()
  useEffect(() => {
    setRepositoryDetails(repository)
  }, [])

  return (
    <>
      {!openItem && <RepoDescriptionAndReferences isOwner={isOwner} />}
      {openItem?.type === 'ITEM' && <NotesAndReferences />}
      {openItem?.type === 'SECTION' && <SectionDescriptionAndReferences />}
    </>
  )
}

export default MultiNotesAndReferences
