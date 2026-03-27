-- Migration for Publishing Center Features (Featured Contents)

CREATE TABLE IF NOT EXISTS public.featured_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_name TEXT NOT NULL, -- e.g., 'Home Hero', 'Home Answers', 'Home Events', 'GNB'
  content_type TEXT NOT NULL, -- e.g., 'Story', 'Answer', 'Event'
  content_id UUID NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.featured_contents ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users (since public API will need it)
CREATE POLICY "Enable read access for all users"
ON public.featured_contents FOR SELECT USING (true);

-- Allow all changes to authenticated admin users
CREATE POLICY "Enable all access for authenticated users"
ON public.featured_contents FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed some initial slots
INSERT INTO public.featured_contents (slot_name, content_type, content_id, display_order)
SELECT 'Home Hero', 'Story', id, 0 FROM public.stories WHERE status = 'Public' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.featured_contents (slot_name, content_type, content_id, display_order)
SELECT 'Home Answers', 'Answer', id, 0 FROM public.answers WHERE status = 'Public' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.featured_contents (slot_name, content_type, content_id, display_order)
SELECT 'Home Events', 'Event', id, 0 FROM public.events WHERE status = 'Public' LIMIT 1
ON CONFLICT DO NOTHING;
