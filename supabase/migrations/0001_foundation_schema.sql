-- 0001_foundation_schema.sql (Recreated cleanly)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PostgreSQL ENUM Types
CREATE TYPE content_status AS ENUM ('Draft', 'Review', 'Public', 'Hidden', 'Archived');

-- 2. Entities
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    direct_answer TEXT NOT NULL,
    context TEXT,
    status content_status DEFAULT 'Draft',
    topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
    creator_id UUID,
    reviewer_id UUID,
    slug VARCHAR(255) UNIQUE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    deck TEXT,
    body TEXT NOT NULL,
    why_this_matters TEXT,
    status content_status DEFAULT 'Draft',
    creator_id UUID,
    slug VARCHAR(255) UNIQUE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    event_type VARCHAR(50),
    status content_status DEFAULT 'Draft',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    registration_link TEXT,
    slug VARCHAR(255) UNIQUE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE evidences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_entity_type VARCHAR(50) NOT NULL,
    target_entity_id UUID NOT NULL,
    file_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    user_id UUID,
    changes JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fixit_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_entity_id UUID NOT NULL,
    reporter_email VARCHAR(255),
    root_cause VARCHAR(50),
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Open',
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER answers_updated_at BEFORE UPDATE ON answers FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER stories_updated_at BEFORE UPDATE ON stories FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER topics_updated_at BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER fixit_updated_at BEFORE UPDATE ON fixit_tickets FOR EACH ROW EXECUTE FUNCTION set_updated_at();
