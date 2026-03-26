-- 0009_review_schema.sql
-- DB Schema Extension for Admin Review Workflow Sub-systems

-- 1. Create review_tasks table
CREATE TABLE IF NOT EXISTS public.review_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type VARCHAR(50) NOT NULL, -- 'Story', 'Answer'
    content_id UUID NOT NULL, -- References stories.id or answers.id
    reviewer_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'In Review', 'Returned', 'Approved'
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'review_tasks_updated_at') THEN
        CREATE TRIGGER review_tasks_updated_at BEFORE UPDATE ON public.review_tasks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;

-- Create an index to quickly look up reviews by content_id
CREATE INDEX IF NOT EXISTS idx_review_tasks_content ON public.review_tasks(content_type, content_id);
