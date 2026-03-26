-- 0010_observatory_schema.sql
-- DB Schema Extension for Admin Observatory & DevOps Sub-systems

-- 1. Create system_alerts table
CREATE TABLE IF NOT EXISTS public.system_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    severity VARCHAR(50) NOT NULL, -- 'Critical', 'Warning', 'Info'
    module VARCHAR(100) NOT NULL, -- e.g., 'Database', 'Auth', 'Storage', 'API'
    message TEXT NOT NULL,
    error_code VARCHAR(100),
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create job_runs table
CREATE TABLE IF NOT EXISTS public.job_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_name VARCHAR(150) NOT NULL, -- e.g., 'Daily Sitemap Gnerator', 'RSS Feed Sync'
    status VARCHAR(50) NOT NULL, -- 'Running', 'Success', 'Failed'
    duration_ms BIGINT,
    log_output TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'system_alerts_updated_at') THEN
        CREATE TRIGGER system_alerts_updated_at BEFORE UPDATE ON public.system_alerts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'job_runs_updated_at') THEN
        CREATE TRIGGER job_runs_updated_at BEFORE UPDATE ON public.job_runs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;
