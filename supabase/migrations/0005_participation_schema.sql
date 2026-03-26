-- 0005_participation_schema.sql
-- DB Schema Extension for Admin Participation Sub-systems

-- 1. Create member_applications table
CREATE TABLE IF NOT EXISTS public.member_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    motivation TEXT,
    status VARCHAR(50) DEFAULT 'Screening', -- Screening, Approved, Rejected, Hold
    source_channel VARCHAR(100),
    owner_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create audience_segments table
CREATE TABLE IF NOT EXISTS public.audience_segments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Active', -- Active, Unsubscribed, Bounced
    segment_id UUID REFERENCES public.audience_segments(id) ON DELETE SET NULL,
    source_cta VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create event_registrations table
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Registered', -- Registered, Confirmed, Cancelled, Waitlist
    attendance_type VARCHAR(50) DEFAULT 'Offline', -- Offline, Online
    is_attended BOOLEAN DEFAULT FALSE,
    source_page VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create partnership_inquiries table
CREATE TABLE IF NOT EXISTS public.partnership_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization VARCHAR(255) NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    inquiry_type VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New', -- New, In Progress, Replied, Qualified, Closed
    owner_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attach updated_at triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'member_apps_updated_at') THEN
        CREATE TRIGGER member_apps_updated_at BEFORE UPDATE ON public.member_applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'segments_updated_at') THEN
        CREATE TRIGGER segments_updated_at BEFORE UPDATE ON public.audience_segments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'subscribers_updated_at') THEN
        CREATE TRIGGER subscribers_updated_at BEFORE UPDATE ON public.newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'registrations_updated_at') THEN
        CREATE TRIGGER registrations_updated_at BEFORE UPDATE ON public.event_registrations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'inquiries_updated_at') THEN
        CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON public.partnership_inquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
    END IF;
END
$$;
