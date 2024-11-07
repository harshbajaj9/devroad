'use server'

import { $Enums } from '@repo/database'
import dsaProblems from './dsaProblems'
import { prisma } from '@/lib/db'

export const parser = async () => {
  for (var i = 0; i < dsaProblems.length; i++) {
    // for (
    //   var i = leetcodeProblems.length - 1;
    //   i > leetcodeProblems.length - 20;
    //   i--
    // ) {
    var obj = dsaProblems[i]

    // console.log(obj)
    if (!obj) continue

    let cat: 'DSA' | 'SQL' | 'SHELL_SCRIPT' = 'DSA'
    switch (obj.Category) {
      case 'Shell Script':
        cat = 'SHELL_SCRIPT'
        break
      case 'DSA':
        cat = 'DSA'
        break
      case 'SQL':
        cat = 'SQL'
        break
    }

    let diff: 'EASY' | 'MEDIUM' | 'HARD' = 'EASY'
    switch (obj.Difficulty) {
      case 'Easy':
        diff = 'EASY'
        break
      case 'Medium':
        diff = 'MEDIUM'
        break
      case 'Hard':
        diff = 'HARD'
        break
    }
    let platform: 'IB' | 'GFE' | 'LC' | 'GFG' | null
    if (obj.Link.includes('leetcode.com')) {
      platform = 'LC'
    } else if (obj.Link.includes('interviewbit.com')) {
      platform = 'IB'
    } else if (obj.Link.includes('geeksforgeeks.org')) {
      platform = 'GFG'
    } else if (obj.Link.includes('greatfrontend.com')) {
      platform = 'GFE'
    }

    await prisma.problem.create({
      data: {
        url: obj.Link,
        title: obj.Title,
        category: cat,
        platform: platform,
        difficulty: diff
      }
    })
    // await prisma.platformProblem.create({
    //   data: {
    //     url: obj.Link,
    //     title: obj.Title,
    //     platform: $Enums.Platform.LC
    //   }
    // })
    console.log('done')
    // console.log('created', obj.Title, cat, primaryPlatform)
  }
}
