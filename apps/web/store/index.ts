import { RepositoryItem } from '@prisma/client'
import { create } from 'zustand'
// import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useLoginModalState = create<{
  isLoginModalOpen: boolean
  setIsLoginModalOpen: (isLoginModalOpen: boolean) => void
}>()(
  immer(set => ({
    isLoginModalOpen: false,
    setIsLoginModalOpen: (modalState: boolean) =>
      set({ isLoginModalOpen: modalState })
  }))
)

export const useProblemSearchFilter = create<{
  platforms: string[]
  setPlatforms: (platforms: string[]) => void

  categories: string[]
  setCategories: (categories: string[]) => void

  tags: string[]
  setTags: (tags: string[]) => void

  searchTerm: string
  setSearchTerm: (searchTerm: string) => void

  // setIsLoginModalOpen: (isLoginModalOpen: boolean) => void
}>()(
  immer(set => ({
    platforms: ['LC'],
    setPlatforms: (platforms: string[]) => {
      set({ platforms })
    },
    categories: ['DSA'],
    setCategories: (categories: string[]) => {
      set({ categories })
    },
    tags: ['DP'],
    setTags: (tags: string[]) => {
      set({ tags })
    },
    searchTerm: '',
    setSearchTerm: (searchTerm: string) => {
      set({ searchTerm })
    }
  }))
)
export type NoteType = {
  id: string
  title: string
  content: string | null
  order: number
  added: boolean
}
export type ReferenceType = {
  id: string
  title: string
  link: string
  order: number
  added: boolean
}
export const useEditRepository = create<{
  isCreateItemModalOpen: boolean
  setIsCreateItemModalOpen: (open: boolean) => void
  isMoveItemModalOpen: boolean
  setIsMoveItemModalOpen: (open: boolean) => void
  deletionItem: { id: string; title: string } | undefined
  setDeletionItem: (item: { id: string; title: string } | undefined) => void
  movingItem:
    | { id: string; title: string; type: 'SECTION' | 'ITEM'; parentId: string }
    | undefined
  setMovingItem: (
    item:
      | {
          id: string
          title: string
          type: 'SECTION' | 'ITEM'
          parentId: string
        }
      | undefined
  ) => void
  movingItemDepth: number
  setMovingItemDepth: (value: number) => void
  isDeleteItemModalOpen: boolean
  setIsDeleteItemModalOpen: (open: boolean) => void
  isEditMode: boolean
  setIsEditMode: (editMode: boolean) => void
  activeItem: RepositoryItem | undefined
  setActiveItem: (activeItem: RepositoryItem | undefined) => void
}>()(
  immer(set => ({
    isCreateItemModalOpen: false,
    setIsCreateItemModalOpen: (open: boolean) =>
      set({ isCreateItemModalOpen: open }),
    isMoveItemModalOpen: false,
    setIsMoveItemModalOpen: (open: boolean) =>
      set({ isMoveItemModalOpen: open }),
    deletionItem: undefined,
    setDeletionItem: (item: { id: string; title: string } | undefined) =>
      set({ deletionItem: item }),
    movingItem: undefined,
    setMovingItem: (
      item:
        | {
            id: string
            title: string
            type: 'SECTION' | 'ITEM'
            parentId: string
          }
        | undefined
    ) => set({ movingItem: item }),
    movingItemDepth: 0,
    setMovingItemDepth: (value: number) => set({ movingItemDepth: value }),
    isDeleteItemModalOpen: false,
    setIsDeleteItemModalOpen: (open: boolean) =>
      set({ isDeleteItemModalOpen: open }),
    isEditMode: false,
    setIsEditMode: (editMode: boolean) => set({ isEditMode: editMode }),
    openNotes: [],

    activeItem: undefined,
    setActiveItem: (activeItem: RepositoryItem | undefined) =>
      set({ activeItem: activeItem })
  }))
)

export const useRepository = create<{
  openItem: (RepositoryItem & { children: RepositoryItem }) | undefined
  setOpenItem: (
    openItem: (RepositoryItem & { children: RepositoryItem }) | undefined
  ) => void
  openNotes: NoteType[]
  setOpenNotes: (openNotes: NoteType[]) => void
  openReferences: ReferenceType[]
  setOpenReferences: (openReferences: ReferenceType[]) => void
}>()(
  immer(set => ({
    openNotes: [],
    setOpenNotes: (openNotes: NoteType[]) => set({ openNotes: openNotes }),
    openReferences: [],
    setOpenReferences: (openReferences: ReferenceType[]) =>
      set({ openReferences: openReferences }),
    openItem: undefined,
    setOpenItem: (
      openItem: (RepositoryItem & { children: RepositoryItem }) | undefined
    ) => set({ openItem: openItem })
  }))
)

export const useNotes = create<{
  showDescription: boolean
  toggleShowDescription: () => void
  showNotes: boolean
  toggleShowNotes: () => void
  showReferences: boolean
  toggleShowReferences: () => void
  activeNotesTab: 'MyNotes' | 'Notes'
  setActiveNotesTab: (activeNotesTab: 'MyNotes' | 'Notes') => void
  activeNote: NoteType | undefined
  setActiveNote: (activeNote: NoteType | undefined) => void
  // showNotes: boolean
  // setShowNotes: (notesState: boolean) => void
  // toggleShowNotes: () => void
}>()(
  immer(set => ({
    showDescription: true,
    toggleShowDescription: () => {
      set(state => ({ showDescription: !state.showDescription }))
    },
    showNotes: true,
    toggleShowNotes: () => {
      set(state => ({ showNotes: !state.showNotes }))
    },
    showReferences: true,
    toggleShowReferences: () => {
      set(state => ({ showReferences: !state.showReferences }))
    },
    activeNotesTab: 'MyNotes',
    setActiveNotesTab: (activeNotesTab: 'MyNotes' | 'Notes') =>
      set({ activeNotesTab: activeNotesTab }),
    activeNote: undefined,
    setActiveNote: (activeNote: NoteType | undefined) =>
      set({ activeNote: activeNote })
    // showNotes: false,
    // setShowNotes: (notesState: boolean) => set({ showNotes: notesState }),
    // toggleShowNotes: () =>
    //   set(state => {
    //     showNotes: !state.showNotes
    //   })
  }))
)

export type RepoStructureNode = {
  title: string
  id: string
  childNodes?: RepoStructureNode[]
}
export const useRepoStructure = create<{
  currentPath?: { id: string; title: string }[]
  setCurrentPath: (curPath: { id: string; title: string }[]) => void
  repoStructure: RepoStructureNode
  setRepoStructure: (editMode: RepoStructureNode) => void
  directoryModal: boolean
  setDirectoryModal: (dirMode: boolean) => void
}>()(
  immer(set => ({
    setCurrentPath: (curPath: { id: string; title: string }[]) =>
      set({ currentPath: curPath }),
    repoStructure: { title: '', id: '', childNodes: [] },
    setRepoStructure: (structure: RepoStructureNode) =>
      set({ repoStructure: structure }),
    directoryModal: false,
    setDirectoryModal: (dirMode: boolean) => set({ directoryModal: dirMode })
  }))
)

export const useBreadCrumb = create<{
  currentPath?: { id: string; title: string }[]
  setCurrentPath: (curPath: { id: string; title: string }[]) => void
}>()(
  immer(set => ({
    setCurrentPath: (curPath: { id: string; title: string }[]) =>
      set({ currentPath: curPath })
  }))
)
