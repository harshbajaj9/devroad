import { $Enums } from '@repo/database'

export type ProblemData = {
  // companyId: string
  // name?: string | null
  // domain?: string | null
  // logo?: string | null
  // employeesRange?: string | null
  // estimatedAnnualRevenue?: string | null
  // industry?: string | null
  // visitors?: number | null
  // lastVisited?: Date | null
  // totalSessions?: number | null
  // visitorChange?: boolean | null
  // sessionChange?: boolean | null
  // isNewThisWeek?: boolean
  id: string
  platform: $Enums.Platform
  category: $Enums.ProblemCategory
  url: string
  title: string
  difficulty: $Enums.ProblemDifficulty | null
}
