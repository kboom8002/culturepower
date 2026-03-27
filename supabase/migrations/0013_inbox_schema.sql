-- 0013_inbox_schema.sql
-- DB Schema Extension for Admin Inbox Sub-systems
-- Handles Question Capture, Suggestions, Corrections, and general inquiries

CREATE TABLE IF NOT EXISTS public.inbox_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL, -- 'Question', 'Suggestion', 'Correction', 'Membership', 'Event', 'Partnership', 'General'
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'Triaged', 'Mapped', 'In Progress', 'Closed'
    priority VARCHAR(10) DEFAULT 'P1', -- 'P0' (Critical), 'P1' (High), 'P2' (Low)
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    reporter_email VARCHAR(255),
    reporter_name VARCHAR(100),
    reporter_phone VARCHAR(50),
    mapped_object_type VARCHAR(50), -- e.g., 'Answer', 'Story', 'FixIt'
    mapped_object_id UUID,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at trigger
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'inbox_items_updated_at') THEN
        CREATE TRIGGER inbox_items_updated_at BEFORE UPDATE ON public.inbox_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;
