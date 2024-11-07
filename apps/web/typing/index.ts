// import { JsonValue } from '@prisma/client/runtime/library'
import { $Enums, Prisma } from '@repo/database'
import { JSONContent } from 'novel'

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
  platform: string | null
  category: $Enums.ProblemCategory
  url: string
  title: string
  difficulty: $Enums.ProblemDifficulty | null
  description: Prisma.JsonValue
  // description: JSONContent
}
