"use client";

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { mergeAttributes } from "@tiptap/core"
import { Bold, Italic, Heading2, Heading3, ImageIcon, List, ListOrdered, Quote, Undo, Redo } from "lucide-react"
import { compressImage } from "@/lib/utils/image"

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: { default: null }
    }
  },
  renderHTML({ HTMLAttributes }) {
    if (HTMLAttributes.caption) {
      const { caption, ...imgAttrs } = HTMLAttributes;
      return [
        'figure', 
        { class: 'flex flex-col items-center my-6 max-w-full' }, 
        ['img', mergeAttributes(this.options.HTMLAttributes, imgAttrs, { class: 'rounded-2xl border border-line-default w-full mb-3' })], 
        ['figcaption', { class: 'text-[14px] text-neutral-500 font-medium text-center bg-surface-soft px-4 py-1 rounded-full' }, caption]
      ]
    }
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'rounded-2xl border border-line-default w-full my-6' })]
  }
})

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomImage,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none min-h-[400px] w-full p-6 outline-none',
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || [])
        for (const item of items) {
          if (item.type.indexOf("image") === 0) {
            const file = item.getAsFile()
            if (file) {
              compressImage(file).then((compressedBase64) => {
                const caption = window.prompt("붙여넣은 이미지의 설명(캡션)을 입력하세요: (없으면 공란)")
                // During init, editor might be considered possibly null by TS
                import("@tiptap/core").then(() => {
                   if (editor) {
                     editor.chain().focus().setImage({ src: compressedBase64, caption: caption || null } as any).run()
                   }
                })
              })
              return true
            }
          }
        }
        return false
      }
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt("이미지 URL을 입력하세요:")
    if (url) {
      const caption = window.prompt("이미지의 설명(캡션)을 입력하세요: (없으면 공란)")
      editor?.chain().focus().setImage({ src: url, caption: caption || null } as any).run()
    }
  }

  return (
    <div className="flex flex-col border border-line-strong rounded-2xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-shadow">
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-soft border-b border-line-default">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive('bold') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'}`}
          title="굵게"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive('italic') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'}`}
          title="기울임"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-6 bg-line-strong mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'}`}
          title="대제목 (H2)"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'}`}
          title="중제목 (H3)"
        >
          H3
        </button>
        <div className="w-[1px] h-6 bg-line-strong mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive('bulletList') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'}`}
          title="기호 목록"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive('orderedList') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'}`}
          title="번호 목록"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive('blockquote') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'}`}
          title="인용구"
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-6 bg-line-strong mx-1" />
        <button
          type="button"
          onClick={addImage}
          className={"p-2 rounded hover:bg-neutral-200 transition-colors text-neutral-600"}
          title="이미지 URL 추가"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-6 bg-line-strong mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-neutral-200 transition-colors text-neutral-600 disabled:opacity-50"
          title="실행 취소"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-neutral-200 transition-colors text-neutral-600 disabled:opacity-50"
          title="다시 실행"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
      
      {/* Editor Content */}
      <div className="bg-surface-page cursor-text relative">
        {!editor.getText() && !editor.isActive('image') && placeholder && (
          <div className="absolute top-6 left-6 text-neutral-400 pointer-events-none">
            {placeholder}
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
