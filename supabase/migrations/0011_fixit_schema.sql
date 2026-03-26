-- 0011_fixit_schema.sql
-- Drop the previous incorrect DevOps tables (0010_observatory_schema)
DROP TRIGGER IF EXISTS system_alerts_updated_at ON public.system_alerts;
DROP TRIGGER IF EXISTS job_runs_updated_at ON public.job_runs;
DROP TABLE IF EXISTS public.system_alerts;
DROP TABLE IF EXISTS public.job_runs;

-- 1. Create fixit_tickets table
CREATE TABLE IF NOT EXISTS public.fixit_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    object_type VARCHAR(50) NOT NULL, -- 'Story', 'Answer', 'Event'
    object_id UUID NOT NULL,
    priority VARCHAR(10) NOT NULL, -- 'P0', 'P1', 'P2'
    issue_category VARCHAR(100) NOT NULL, -- e.g. 'Missing Evidence', 'No Reviewer', 'Orphaned'
    description TEXT,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'fixit_tickets_updated_at') THEN
        CREATE TRIGGER fixit_tickets_updated_at BEFORE UPDATE ON public.fixit_tickets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;

-- Create an index to quickly look up tickets by priority and resolution status
CREATE INDEX IF NOT EXISTS idx_fixit_tickets_priority ON public.fixit_tickets(priority, is_resolved);
