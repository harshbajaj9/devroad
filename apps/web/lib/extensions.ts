import {
  TiptapImage,
  TiptapLink,
  UpdatedImage,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  AIHighlight,
  TiptapUnderline
} from 'novel/extensions'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { UploadImagesPlugin } from 'novel/plugins'

import { cx } from 'class-variance-authority'

const aiHighlight = AIHighlight
const placeholder = Placeholder

// const placeholder = Placeholder.configure({
//   placeholder: ({ node }) => {
//     if (node.type.name === 'heading') {
//       return `Heading ${node.attrs.level}`
//     }
//     return "Press '/' for commands, or '++' for AI autocomplete..."
//   },
//   emptyNodeClass:
//     'first:before:text-gray-400 first:before:float-left first:before:h-0 first:before:content-[attr(data-placeholder)] first:before:pointer-events-none',
//   emptyEditorClass:
//     'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-3 before:left-3 before:text-mauve-11 before:opacity-50 before-pointer-events-none',
//   includeChildren: true
// })
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer'
    )
  }
})

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx('opacity-40 rounded-lg border border-stone-200')
      })
    ]
  }
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted')
  }
})

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted')
  }
})

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx('not-prose pl-2 ')
  }
})
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    // class: cx('flex gap-2 items-start my-4')
    class: cx('flex gap-2 items-start my-1')
  },
  nested: true
})

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx('mt-4 mb-6 border-t border-muted-foreground')
  }
})
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'
import sql from 'highlight.js/lib/languages/sql'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'

// https://github.com/pheralb/typethings/blob/6a6fc777cc63c7cb4eea06dc97a61f1eac85ca14/packages/editor/src/extensions/index.ts#L15
const lowlight = createLowlight(common)
lowlight.register('html', html)
// lowlight.register({ html })
lowlight.register('css', css)
// lowlight.register({ css })
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('java', java)
lowlight.register('cpp', cpp)
// lowlight.register({ cpp })
// lowlight.register({ java })
lowlight.register('sql', sql)
lowlight.register('python', python)
// lowlight.register({ python })
lowlight.register('ruby', ruby)
const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight,
  HTMLAttributes: {
    class:
      // 'w-full bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-dark'
      'w-full border'
  }
})

const starterKit = StarterKit.configure({
  paragraph: {
    HTMLAttributes: {
      class: cx('text-foreground')
    }
  },
  bulletList: {
    HTMLAttributes: {
      class: cx('list-disc list-outside leading-3 -mt-2')
    }
  },
  orderedList: {
    HTMLAttributes: {
      class: cx('list-decimal list-outside leading-3 -mt-2')
    }
  },
  listItem: {
    HTMLAttributes: {
      class: cx('leading-normal -mb-2')
    }
  },
  blockquote: {
    HTMLAttributes: {
      class: cx('border-l-4 border-primary')
    }
  },
  // codeBlock: {
  //   HTMLAttributes: {
  //     class: cx(
  //       'rounded-md bg-black text-muted-foreground border p-5 font-mono font-medium'
  //     )
  //   }
  // },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cx('border rounded-md px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false'
    }
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4
  },
  gapcursor: false
})

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  codeBlockLowlight,
  // https://github.com/steven-tey/novel/issues/435
  TiptapUnderline
]
