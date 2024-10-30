// import { Repository, RepositoryItem } from '@repo/database'
import { ItemNodeType, NodeType } from '@/lib/utils'
import { Repository, RepositoryItem } from '@repo/database'
import { JSONContent } from 'novel'
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
  content: JSONContent
  order: number
  added: boolean
}
export type ReferenceType = {
  id: string
  title: string
  link: string
  order: number
  added: boolean
  subType: 'ARTICLE' | 'VIDEO'
}
export const useEditRepository = create<{
  isCreateItemModalOpen: boolean
  setIsCreateItemModalOpen: (open: boolean) => void
  isMoveItemModalOpen: boolean
  setIsMoveItemModalOpen: (open1: boolean) => void
  deletionItem: { id: string; title: string | null | undefined } | undefined
  setDeletionItem: (
    item: { id: string; title: string | null | undefined } | undefined
  ) => void
  movingItem:
    | {
        id: string
        title: string | null | undefined
        type: 'SECTION' | 'ITEM'
        parentId: string
      }
    | undefined
  setMovingItem: (
    item:
      | {
          id: string
          title: string | null | undefined
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
  activeItem: ItemNodeType | undefined
  setActiveItem: (activeItem: ItemNodeType | undefined) => void
}>()(
  immer(set => ({
    isCreateItemModalOpen: false,
    setIsCreateItemModalOpen: (open: boolean) => {
      set({ isCreateItemModalOpen: open })
      console.log(
        'stateA>>>>>>>>>>>>>',
        useEditRepository.getState().isCreateItemModalOpen
      )
    },
    isMoveItemModalOpen: false,
    setIsMoveItemModalOpen: (open1: boolean) => {
      set({ isMoveItemModalOpen: open1 })
    },
    deletionItem: undefined,
    setDeletionItem: (
      item: { id: string; title: string | null | undefined } | undefined
    ) => set({ deletionItem: item }),
    movingItem: undefined,
    setMovingItem: (
      item:
        | {
            id: string
            title: string | null | undefined
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
    setActiveItem: (activeItem: ItemNodeType | undefined) =>
      set({ activeItem: activeItem })
  }))
)

export type OpenItemType = RepositoryItem & {
  children?: RepositoryItem
  // lastStatus?: number
  // tags?: string[]
}

export const useRepository = create<{
  doneItems: string[]
  setDoneItems: (fn: (doneItemsNew: string[]) => string[]) => void
  revisitItems: string[]
  setRevisitItems: (fn: (doneItemsNew: string[]) => string[]) => void
  // itemStatusMap: Record<string, number>
  // setItemStatusMap: (id: string, status: number) => void
  // setItemStatusMap: (
  //   fn: (
  //     prev: { id: string; status: number }[]
  //   ) => { id: string; status: number }[]
  // ) => void
  repositoryTags: string[]
  setRepositoryTags: (tags: string[]) => void
  repositoryDetails: Repository | undefined
  setRepositoryDetails: (details: Repository | undefined) => void
  openItem: ItemNodeType | undefined
  setOpenItem: (openItem: ItemNodeType | undefined) => void
  // openNotes: NoteType[]
  // setOpenNotes: (openNotes: NoteType[]) => void
  // openReferences: ReferenceType[]
  // setOpenReferences: (openReferences: ReferenceType[]) => void
}>()(
  immer(set => ({
    repositoryTags: [],
    setRepositoryTags: (tags: string[]) => set({ repositoryTags: tags }),
    repositoryDetails: undefined,
    setRepositoryDetails: (details: Repository | undefined) =>
      set({ repositoryDetails: details }),
    // openNotes: [],
    // setOpenNotes: (openNotes: NoteType[]) => set({ openNotes: openNotes }),
    // openReferences: [],
    // setOpenReferences: (openReferences: ReferenceType[]) =>
    //   set({ openReferences: openReferences }),
    openItem: undefined,
    setOpenItem: (openItem: ItemNodeType | undefined) =>
      set({ openItem: openItem }),
    // itemStatusMap: {} as Record<string, number>,
    // setItemStatusMap: (id: string, status: number) =>
    //   set(state => ({
    //     statusMap: { ...state.itemStatusMap, [id]: status } // Add or update entry
    //   }))
    // setItemStatusMap: (
    //   fn: (
    //     prev: { id: string; status: number }[]
    //   ) => { id: string; status: number }[]
    // ) => {
    //   set(state => ({ itemStatusMap: fn(state.itemStatusMap) }))
    // }

    doneItems: [],
    setDoneItems: (fn: (prev: string[]) => string[]) => {
      set(state => ({ doneItems: fn(state.doneItems) }))
    },
    revisitItems: [],
    setRevisitItems: (fn: (prev: string[]) => string[]) => {
      set(state => ({ revisitItems: fn(state.revisitItems) }))
    }
  }))
)

export const useFilterTags = create<{
  difficultyTag: 'EASY' | 'MED' | 'HARD' | undefined
  setDifficultyTag: (tag: 'EASY' | 'MED' | 'HARD' | undefined) => void
  filterTags: string[]
  setFilterTags: (fn: (prev: string[]) => string[]) => void
  hideTags: boolean
  setHideTags: (fn: (hTags: boolean) => boolean) => void
  // openNotes: NoteType[]
  // setOpenNotes: (openNotes: NoteType[]) => void
  // openReferences: ReferenceType[]
  // setOpenReferences: (openReferences: ReferenceType[]) => void
}>()(
  immer(set => ({
    difficultyTag: undefined,
    setDifficultyTag: (tag: 'EASY' | 'MED' | 'HARD' | undefined) =>
      set({ difficultyTag: tag }),
    filterTags: [],
    setFilterTags: (fn: (prev: string[]) => string[]) =>
      set(state => ({ filterTags: fn(state.filterTags) })),
    hideTags: false,
    setHideTags: (fn: (hTags: boolean) => boolean) =>
      set(state => ({ hideTags: fn(state.hideTags) }))
  }))
)
// type ReactStyleStateSetter<T> = T | ((prev: T) => T)
export const useNotes = create<{
  showDescription: boolean
  toggleShowDescription: () => void
  showNotes: boolean
  toggleShowNotes: () => void
  showReferences: boolean
  toggleShowReferences: () => void
  activeNotesTab: 'MyNotes' | 'Description'
  setActiveNotesTab: (activeNotesTab: 'MyNotes' | 'Description') => void
  activeNote: NoteType | undefined
  setActiveNote: (activeNote: NoteType | undefined) => void
  activeNoteContent: JSONContent | undefined
  setActiveNoteContent: (activeNote: JSONContent | undefined) => void
  openReferences: ReferenceType[]
  // setOpenReferences: (fn: ReactStyleStateSetter<ReferenceType[]>) => void
  setOpenReferences: (fn: (prev: ReferenceType[]) => ReferenceType[]) => void

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
    setActiveNotesTab: (activeNotesTab: 'MyNotes' | 'Description') =>
      set({ activeNotesTab: activeNotesTab }),
    activeNote: undefined,
    setActiveNote: (activeNote: NoteType | undefined) =>
      set({ activeNote: activeNote }),
    activeNoteContent: undefined,
    setActiveNoteContent: (activeNoteContent: JSONContent | undefined) =>
      set({ activeNoteContent: activeNoteContent }),
    openReferences: [],
    setOpenReferences: (fn: (prev: ReferenceType[]) => ReferenceType[]) => {
      set(state => ({ openReferences: fn(state.openReferences) }))
    }
    // setOpenReferences: (fn) => {
    //   set(({ openReferences }) => {
    //     // your type check equivalent here
    //     if (isArray(fn)) {
    //       const newArr = fn;
    //       return { selectedImageIds: newArr };
    //     }
    //     const setterFn = fn;
    //     return {
    //       openReferences: setterFn(openReferences)
    //     };
    //   });
    // }
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
