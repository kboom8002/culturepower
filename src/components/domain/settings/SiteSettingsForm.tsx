"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Loader2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteSettings, updateSiteSettings } from "@/lib/actions/settings"

interface SiteSettingsFormProps {
  initialData: SiteSettings
}

export function SiteSettingsForm({ initialData }: SiteSettingsFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<SiteSettings>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!formData.site_name) {
      alert("사이트명은 필수 입력 항목입니다.")
      return
    }

    setIsSaving(true)
    try {
      const res = await updateSiteSettings({
        site_name: formData.site_name,
        site_description: formData.site_description,
        contact_email: formData.contact_email,
        logo_url: formData.logo_url,
        favicon_url: formData.favicon_url,
        seo_keywords: formData.seo_keywords
      })
      if (res.success) {
        alert("기본 사이트 정보가 저장되었습니다.")
        router.refresh()
      } else {
        alert(`저장 실패: ${res.error}`)
      }
    } catch (error: any) {
      alert(`오류 발생: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="bg-white rounded-3xl border border-line-default shadow-sm p-8 flex flex-col gap-6">
        
        {/* Site Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-neutral-800">사이트명 *</label>
          <input 
            type="text" 
            name="site_name"
            placeholder="예: CulturePower Newsroom" 
            className="w-full p-3 bg-neutral-50/50 border border-line-strong rounded-xl text-[15px] focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
            value={formData.site_name}
            onChange={handleChange}
          />
          <p className="text-[13px] text-neutral-500">웹 브라우저 탭 및 서비스 곳곳에 노출되는 기본 이름입니다.</p>
        </div>

        {/* Site Description */}
        <div className="flex flex-col gap-2 pt-2">
          <label className="text-sm font-bold text-neutral-800">기본 소개 (Description)</label>
          <textarea 
            name="site_description"
            rows={3}
            placeholder="사이트 포지셔닝 및 주요 성격을 요약해 주세요" 
            className="w-full p-3 bg-neutral-50/50 border border-line-strong rounded-xl text-[15px] focus:outline-none focus:border-brand-500 focus:bg-white transition-colors resize-none"
            value={formData.site_description || ''}
            onChange={handleChange}
          />
        </div>

        {/* Contact Email */}
        <div className="flex flex-col gap-2 pt-2">
          <label className="text-sm font-bold text-neutral-800">대표 이메일 (Contact Email)</label>
          <input 
            type="email" 
            name="contact_email"
            placeholder="admin@culturepower.net" 
            className="w-full p-3 bg-neutral-50/50 border border-line-strong rounded-xl text-[15px] focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
            value={formData.contact_email || ''}
            onChange={handleChange}
          />
          <p className="text-[13px] text-neutral-500">푸터, 문의하기 등에 노출될 공식 연락처입니다.</p>
        </div>

        <div className="border-b border-line-soft my-2"></div>

        {/* Branding & Assets */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-[16px] tracking-tight">브랜딩 및 SEO</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-800">로고 이미지 URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="logo_url"
                  placeholder="https://..." 
                  className="w-full p-3 bg-neutral-50/50 border border-line-strong rounded-xl text-[15px] focus:outline-none focus:border-brand-500 focus:bg-white transition-colors flex-1"
                  value={formData.logo_url || ''}
                  onChange={handleChange}
                />
              </div>
              {formData.logo_url && (
                <div className="mt-2 h-16 bg-neutral-100 rounded-lg border border-line-soft flex items-center justify-center p-2 relative">
                   <img src={formData.logo_url} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-neutral-800">파비콘(Favicon) URL</label>
              <input 
                type="text" 
                name="favicon_url"
                placeholder="https://..." 
                className="w-full p-3 bg-neutral-50/50 border border-line-strong rounded-xl text-[15px] focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                value={formData.favicon_url || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-neutral-800">기본 SEO 키워드</label>
            <textarea 
              name="seo_keywords"
              rows={2}
              placeholder="콤마(,)로 구분된 키워드 입력" 
              className="w-full p-3 bg-neutral-50/50 border border-line-strong rounded-xl text-[15px] focus:outline-none focus:border-brand-500 focus:bg-white transition-colors resize-none"
              value={formData.seo_keywords || ''}
              onChange={handleChange}
            />
            <p className="text-[13px] text-neutral-500">개별 기사에 키워드가 없을 경우 적용받을 글로벌 키워드입니다.</p>
          </div>
        </div>

      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={handleSave} disabled={isSaving} className="font-bold px-8">
          {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
          {isSaving ? "저장 중..." : "변경사항 저장"}
        </Button>
      </div>
    </div>
  )
}
