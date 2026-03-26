export interface StoryBodyRichTextProps {
  contentRichText: string
}

export function StoryBodyRichText({ contentRichText }: StoryBodyRichTextProps) {
  return (
    <div className="mb-12 w-full">
      <div 
        className="prose prose-neutral max-w-none text-body-lg text-neutral-800 leading-[1.8]
                   prose-h2:text-h2 prose-h2:text-neutral-900 prose-h2:mt-12 prose-h2:mb-6
                   prose-h3:text-h3 prose-h3:text-neutral-900 prose-h3:mt-8 prose-h3:mb-4
                   prose-p:mb-6 prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline
                   prose-blockquote:border-l-4 prose-blockquote:border-brand-700 prose-blockquote:bg-surface-soft prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-neutral-700 prose-blockquote:rounded-r-lg
                   prose-img:rounded-2xl prose-img:border prose-img:border-line-default prose-img:w-full prose-img:my-10"
        dangerouslySetInnerHTML={{ __html: contentRichText }}
      />
    </div>
  )
}
