-- 0008_content_schema.sql
-- DB Schema Extension for Admin Content Core Sub-systems

-- 1. Create content_topics table (Top-level themes)
CREATE TABLE IF NOT EXISTS public.content_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create experts table
CREATE TABLE IF NOT EXISTS public.experts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    organization VARCHAR(150),
    role VARCHAR(100),
    bio TEXT,
    profile_image_url VARCHAR(1024),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create answers table (Knowledge Cards)
CREATE TABLE IF NOT EXISTS public.answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content_body TEXT,
    expert_id UUID REFERENCES public.experts(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES public.content_topics(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'Draft', -- 'Draft', 'Review', 'Scheduled', 'Public', 'Archived'
    author_id UUID, -- reference to admin_users/auth.users
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create partners table
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50), -- e.g., 'Government', 'Private', 'Academic'
    logo_url VARCHAR(1024),
    website_url VARCHAR(1024),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create content_resources table
CREATE TABLE IF NOT EXISTS public.content_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    file_type VARCHAR(50), -- e.g., 'PDF', 'XLSX', 'ZIP'
    file_url VARCHAR(1024) NOT NULL,
    file_size_bytes BIGINT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'content_topics_updated_at') THEN
        CREATE TRIGGER content_topics_updated_at BEFORE UPDATE ON public.content_topics FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'experts_updated_at') THEN
        CREATE TRIGGER experts_updated_at BEFORE UPDATE ON public.experts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'answers_updated_at') THEN
        CREATE TRIGGER answers_updated_at BEFORE UPDATE ON public.answers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'partners_updated_at') THEN
        CREATE TRIGGER partners_updated_at BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'content_resources_updated_at') THEN
        CREATE TRIGGER content_resources_updated_at BEFORE UPDATE ON public.content_resources FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;
