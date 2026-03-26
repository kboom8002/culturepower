-- 0006_publishing_schema.sql
-- DB Schema Extension for Admin Publishing Sub-systems

-- 1. Create featured_contents table
CREATE TABLE IF NOT EXISTS public.featured_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placement_type VARCHAR(100) NOT NULL, -- e.g., 'Hero', 'Trending', 'Recommended'
    content_type VARCHAR(50) NOT NULL, -- e.g., 'Story', 'Answer', 'Expert'
    content_id UUID NOT NULL, -- Reference to specific content ID
    display_order INTEGER DEFAULT 0,
    title_override VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'featured_updated_at') THEN
        CREATE TRIGGER featured_updated_at BEFORE UPDATE ON public.featured_contents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;
