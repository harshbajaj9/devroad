'use client'
import SearchInput from './search-input'
// import { useRouter } from 'next/router'
import { useProblemSearchFilter } from '@/store'
import CategorySelect from './category-select'
import PlatformSelect from './platform-select'

interface HeaderProps {
  totalCount: number
  onSearchChange: (searchQuery: string | undefined) => void
  searchQuery: string
  activeTab: string
}
function Header({
  activeTab = 'all',
  // onTabClick,
  // weeklyCompaniesCount,
  totalCount,
  onSearchChange,
  searchQuery
}: HeaderProps) {
  const { platforms, setPlatforms } = useProblemSearchFilter()
  // const router = useRouter()
  // const searchParams = useSearchParams()
  const navItems = [
    // {
    //   title: 'This week',
    //   key: 'weekly',
    //   count: weeklyCompaniesCount
    // },
    {
      title: 'All Problems',
      key: 'all',
      count: totalCount
    }
  ]

  // useEffect(() => {
  //   if (searchParams.tab) {
  //     onTabClick(router.query.tab as string)
  //   }
  // }, [router.query.tab])

  // const handleTabClick = tabKey => {
  //   const href = `?tab=${tabKey}`
  //   router.replace(href, undefined, { shallow: true })
  //   onTabClick(tabKey)
  // }

  return (
    <div className='flex w-full items-start justify-between bg-background p-4 px-8'>
      <div className='flex items-start gap-6'>
        {/* <div className='my-6 flex gap-6'>
        {navItems.map(navItem => {
          return (
            <button
              // onClick={() => handleTabClick(navItem.key)}
              className={`flex items-center self-stretch rounded-md ${
                navItem.key == activeTab ? 'bg-primary-50' : ''
              } group px-3 py-2`}
            >
              <div
                className={`flex items-center gap-4 ${
                  navItem.key === activeTab
                    ? 'text-settings-hover'
                    : 'text-gray-500'
                } text-sm`}
              >
                {navItem.title}
                <div
                  className={`left-0 top-0 -ml-2 flex h-6 w-6 items-center justify-center rounded-full px-6 mix-blend-multiply ${
                    navItem.key === activeTab ? 'bg-primary-50' : 'bg-gray-100'
                  }`}
                >
                  {navItem.count}
                </div>
              </div>
            </button>
          )
        })}
      </div> */}
        {/* <Select>
        <SelectTrigger className='w-[280px]'>
          <SelectValue placeholder='Select a timezone' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value='est'>Eastern Standard Time (EST)</SelectItem>
            <SelectItem value='cst'>Central Standard Time (CST)</SelectItem>
            <SelectItem value='mst'>Mountain Standard Time (MST)</SelectItem>
            <SelectItem value='pst'>Pacific Standard Time (PST)</SelectItem>
            <SelectItem value='akst'>Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value='hst'>Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value='gmt'>Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value='cet'>Central European Time (CET)</SelectItem>
            <SelectItem value='eet'>Eastern European Time (EET)</SelectItem>
            <SelectItem value='west'>
              Western European Summer Time (WEST)
            </SelectItem>
            <SelectItem value='cat'>Central Africa Time (CAT)</SelectItem>
            <SelectItem value='eat'>East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value='msk'>Moscow Time (MSK)</SelectItem>
            <SelectItem value='ist'>India Standard Time (IST)</SelectItem>
            <SelectItem value='cst_china'>China Standard Time (CST)</SelectItem>
            <SelectItem value='jst'>Japan Standard Time (JST)</SelectItem>
            <SelectItem value='kst'>Korea Standard Time (KST)</SelectItem>
            <SelectItem value='ist_indonesia'>
              Indonesia Central Standard Time (WITA)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value='awst'>
              Australian Western Standard Time (AWST)
            </SelectItem>
            <SelectItem value='acst'>
              Australian Central Standard Time (ACST)
            </SelectItem>
            <SelectItem value='aest'>
              Australian Eastern Standard Time (AEST)
            </SelectItem>
            <SelectItem value='nzst'>
              New Zealand Standard Time (NZST)
            </SelectItem>
            <SelectItem value='fjt'>Fiji Time (FJT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value='art'>Argentina Time (ART)</SelectItem>
            <SelectItem value='bot'>Bolivia Time (BOT)</SelectItem>
            <SelectItem value='brt'>Brasilia Time (BRT)</SelectItem>
            <SelectItem value='clt'>Chile Standard Time (CLT)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}

        <PlatformSelect />
        {/* <MultiSelectDropdown /> */}
        <CategorySelect />
        {/* <div className=''>
        <FancyMultiSelect />
      </div> */}

        {/* <TagSelectionPopover /> */}
      </div>
      {/* <div>
        Platforms:{' '}
        {platforms.map(platform => (
          <span>{platform}</span>
        ))}
      </div> */}
      <div className='flex w-full items-start justify-end gap-6'>
        <SearchInput
          placeholder={'Select inputs...'}
          onSearchChange={onSearchChange}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}

export default Header
