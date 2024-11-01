import { z } from 'zod'

const baseContent = z.object({
  type: z.string().optional(),
  attrs: z.record(z.any()).optional(),
  text: z.string().optional()
  // marks: z
  //   .array(
  //     z.object({
  //       type: z.string(),
  //       attrs: z.record(z.any()).optional()
  //     })
  //   )
  //   .optional(),
})

export type Content = z.infer<typeof baseContent>

// The TempPromptSchema is used to recursively define the schema for the content of the editor, just like the PromptSchema, but since content was needed in the type for PromptSchema, TempPromptSchema was created to provide that by preventing circular reference
const TempJsonSchema: z.ZodType<Content> = baseContent.extend({
  content: z.array(z.lazy(() => TempJsonSchema)).optional()
})

export const JsonEditorInputSchema = baseContent.extend({
  content: z.array(z.lazy(() => TempJsonSchema)).optional(),
  set: z.string().optional()
})
