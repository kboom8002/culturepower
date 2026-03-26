-- 0004_archive_schema.sql
-- DB Schema Extension for Admin Archive Sub-systems

-- 1. Extend existing events table
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS program_json JSONB,
ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS owner_user_id UUID,
ADD COLUMN IF NOT EXISTS reviewer_id UUID;

-- 2. Create videos table
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    source_url TEXT NOT NULL,
    embed_url TEXT,
    thumbnail_url TEXT,
    duration_seconds INTEGER,
    status content_status DEFAULT 'Draft',
    related_event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(100),
    file_url TEXT NOT NULL,
    summary TEXT,
    source_label VARCHAR(100),
    status content_status DEFAULT 'Draft',
    related_event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create galleries table
CREATE TABLE IF NOT EXISTS public.galleries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    caption_summary TEXT,
    photo_count INTEGER DEFAULT 0,
    status content_status DEFAULT 'Draft',
    related_event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'videos_updated_at') THEN
        CREATE TRIGGER videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'documents_updated_at') THEN
        CREATE TRIGGER documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'galleries_updated_at') THEN
        CREATE TRIGGER galleries_updated_at BEFORE UPDATE ON public.galleries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;
