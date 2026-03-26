-- 0007_settings_schema.sql
-- DB Schema Extension for Admin Settings Sub-systems

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'Editor', -- 'Super Admin', 'Editor', 'Reviewer', 'View-Only'
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create taxonomies table
CREATE TABLE IF NOT EXISTS public.taxonomies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL, -- 'Category', 'Tag', 'Series'
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, -- e.g., 'UPDATE', 'DELETE', 'LOGIN'
    target_table VARCHAR(100),
    target_id VARCHAR(255),
    changes JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'admin_users_updated_at') THEN
        CREATE TRIGGER admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'taxonomies_updated_at') THEN
        CREATE TRIGGER taxonomies_updated_at BEFORE UPDATE ON public.taxonomies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;

-- Insert initial super admin if empty (Mockup seeding for testing)
INSERT INTO public.admin_users (email, name, role) 
VALUES ('admin@culture.net', 'System Admin', 'Super Admin')
ON CONFLICT (email) DO NOTHING;
