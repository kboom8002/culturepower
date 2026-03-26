-- 0003_stories_extensions.sql
-- Add missing columns to stories table as defined in 32_DB·엔티티 스키마 명세서 v1.0.md

ALTER TABLE public.stories
ADD COLUMN IF NOT EXISTS section VARCHAR(100),
ADD COLUMN IF NOT EXISTS story_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS author_expert_id UUID,
ADD COLUMN IF NOT EXISTS reviewer_id UUID,
ADD COLUMN IF NOT EXISTS featured_flag BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image_url TEXT,
ADD COLUMN IF NOT EXISTS canonical_slug VARCHAR(255);
