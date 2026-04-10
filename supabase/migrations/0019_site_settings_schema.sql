-- 0019_site_settings_schema.sql
-- DB Schema Extension for Global Site Settings

CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name VARCHAR(255) NOT NULL DEFAULT 'My Site',
    site_description TEXT,
    contact_email VARCHAR(255),
    logo_url TEXT,
    favicon_url TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger for updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'site_settings_updated_at') THEN
        CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;

-- Insert an initial dummy config so we always have exactly one row
INSERT INTO public.site_settings (site_name, site_description, contact_email, seo_keywords) 
SELECT 'CulturePower Newsroom', '문화강국 코리아 정책 및 인사이트 뉴스룸', 'admin@culturepower.net', '문화강국, 정책, 지원사업, K-컬처'
WHERE NOT EXISTS (
    SELECT 1 FROM public.site_settings LIMIT 1
);
