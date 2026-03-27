-- 0012_stories_related_answers.sql
-- Add JSONB column to store SSoT answer links without complex relational joins for the prototype
ALTER TABLE public.stories
ADD COLUMN IF NOT EXISTS related_answers_meta JSONB;
