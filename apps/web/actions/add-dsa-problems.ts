'use server'

import { $Enums } from '@prisma/client'
import leetcodeProblems from './parsedProblems'
import { prisma } from '@/lib/db'

export const parser = async () => {
  for (var i = 0; i < 100 && i < leetcodeProblems.length; i++) {
    // for (
    //   var i = leetcodeProblems.length - 1;
    //   i > leetcodeProblems.length - 20;
    //   i--
    // ) {
    var obj = leetcodeProblems[i]

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

    let diff: 'EASY' | 'MED' | 'HARD' = 'EASY'
    switch (obj.Category) {
      case 'Easy':
        diff = 'EASY'
        break
      case 'Medium':
        diff = 'MED'
        break
      case 'Hard':
        diff = 'HARD'
        break
    }
    await prisma.problem.create({
      data: {
        url: obj.Link,
        title: obj.Title,
        category: cat,
        platform: $Enums.Platform.LC,
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
