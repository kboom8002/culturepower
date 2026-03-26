export interface ContextBlockProps {
  contentRichText: string
}

export function ContextBlock({ contentRichText }: ContextBlockProps) {
  return (
    <div className="mb-12 border-t border-line-default pt-10">
      <h3 className="text-h4 text-neutral-900 mb-6">상세 해설 및 맥락</h3>
      {/* 
        In a real application, contentRichText might be HTML strings from a WYSIWYG 
        or a structured JSON (like Slate/ProseMirror).
        Here we use dangerouslySetInnerHTML for demonstration of rich text mapping.
      */}
      <div 
        className="prose prose-neutral max-w-none text-body text-neutral-700 leading-loose
                   prose-h3:text-[22px] prose-h3:font-bold prose-h3:text-neutral-900 prose-h3:mt-8
                   prose-p:mb-6 prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline
                   prose-img:rounded-xl prose-img:border prose-img:border-line-default"
        dangerouslySetInnerHTML={{ __html: contentRichText }}
      />
    </div>
  )
}
