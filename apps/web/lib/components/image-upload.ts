import { SonnerToast as toast } from '@repo/ui'

// import { toast } from 'sonner'
// import { type EditorState, Plugin, PluginKey } from '@tiptap/pm/state'
// import { Decoration, DecorationSet, type EditorView } from '@tiptap/pm/view'

// import { ImageUploadOptions, UploadFn } from 'novel/plugins'
// const uploadKey = new PluginKey('upload-image')
// // biome-ignore lint/complexity/noBannedTypes: <explanation>
// function findPlaceholder(state: EditorState, id: {}) {
//   const decos = uploadKey.getState(state) as DecorationSet
//   // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
//   const found = decos.find(undefined, undefined, spec => spec.id == id)
//   return found.length ? found[0]?.from : null
// }

// export const createImageUpload =
//   ({ validateFn, onUpload }: ImageUploadOptions): UploadFn =>
//   (file, view, pos) => {
//     // check if the file is an image
//     const validated = validateFn?.(file)
//     if (!validated) return
//     // A fresh object to act as the ID for this upload
//     const id = {}

//     // Replace the selection with a placeholder
//     const tr = view.state.tr
//     if (!tr.selection.empty) tr.deleteSelection()

//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => {
//       tr.setMeta(uploadKey, {
//         add: {
//           id,
//           pos,
//           src: reader.result
//         }
//       })
//       view.dispatch(tr)
//     }

//     onUpload(file).then(
//       src => {
//         // ({ src, width, height }) => {
//         const { schema } = view.state

//         const pos = findPlaceholder(view.state, id)

//         // If the content around the placeholder has been deleted, drop
//         // the image
//         if (pos == null) return

//         // Otherwise, insert it at the placeholder's position, and remove
//         // the placeholder

//         // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
//         // the image locally
//         const imageSrc = typeof src === 'object' ? reader.result : src
//         let image = new Image()
//         let width
//         let height
//         image.src = src as string
//         image.onload = () => {
//           width = image.width
//           height = image.height
//         }
//         const node = schema.nodes.image?.create({
//           src: imageSrc,
//           width: width,
//           height: height
//         })
//         if (!node) return

//         const transaction = view.state.tr
//           .replaceWith(pos, pos, node)
//           .setMeta(uploadKey, { remove: { id } })
//         view.dispatch(transaction)
//       },
//       () => {
//         // Deletes the image placeholder on error
//         const transaction = view.state.tr
//           .delete(pos, pos)
//           .setMeta(uploadKey, { remove: { id } })
//         view.dispatch(transaction)
//       }
//     )
//   }
import { createImageUpload } from 'novel/plugins'

const onUpload = (file: File) => {
  const promise = fetch('/api/upload', {
    method: 'POST',
    headers: {
      'content-type': file?.type || 'application/octet-stream',
      'x-vercel-filename': file?.name || 'image.png'
    },
    body: file
  })
  let width
  let height
  return new Promise(resolve => {
    toast.promise(
      promise.then(async res => {
        // Successfully uploaded image
        if (res.status === 200) {
          const { url } = (await res.json()) as any
          // preload the image
          let image = new Image()
          image.src = url
          image.onload = () => {
            let width = image.width
            let height = image.height
            // resolve({ url, width, height })
            resolve(url)
          }
          // No blob store configured
        } else if (res.status === 401) {
          resolve(file)
          throw new Error(
            '`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.'
          )
          // Unknown error
        } else {
          throw new Error(`Error uploading image. Please try again.`)
        }
      }),
      {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully.',
        error: e => e.message
      }
    )
  })
}
// const onUpload = async (file: File): Promise<string | undefined> => {
//   try {
//     const res = await fetch('/api/upload', {
//       method: 'POST',
//       headers: {
//         'content-type': file?.type || 'application/octet-stream',
//         'x-vercel-filename': file?.name || 'image.png'
//       },
//       body: file
//     })

//     // Successfully uploaded image
//     if (res.status === 200) {
//       const { url } = (await res.json()) as any

//       // Preload the image
//       const image = new Image()
//       image.src = url

//       // await new Promise(resolve => (image.onload = resolve))
//       await new Promise<void>((resolve) => {
//         image.onload = () => {
//           console.log('Image loaded with dimensions:', image.width, 'x', image.height);
//           resolve(); // Resolves the promise after image is loaded
//         };
//       });
//       // image.height = file

//       // Show success toast
//       Toast({
//         title: 'Image uploaded successfully.',
//         type: 'success'
//       })

//       return url
//     }

//     // No blob store configured
//     if (res.status === 401) {
//       Toast({
//         title: 'Image uploaded locally.',
//         message:
//           '`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.',
//         type: 'error'
//       })
//       return file as any
//     }

//     // Unknown error
//     throw new Error('Error uploading image. Please try again.')
//   } catch (error: any) {
//     // Show error toast
//     Toast({
//       title: 'Error uploading image.',
//       message: error.message,
//       type: 'error'
//     })
//   }
// }
export const uploadFn = createImageUpload({
  onUpload,
  validateFn: file => {
    console.log('file', file)
    if (!file.type.includes('image/')) {
      toast.error('File type not supported.')
      // Toast({ title: 'File type not supported.', type: 'error' })
      return false
    }
    // TODO: limit file size to 5
    else if (file.size / 1024 / 1024 > 20) {
      toast.error('File size too big (max 20MB).')
      // Toast({ title: 'File size too big (max 20MB).', type: 'error' })

      return false
    }
    return true
  }
})
