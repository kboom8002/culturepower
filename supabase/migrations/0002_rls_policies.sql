-- supabase/migrations/0002_rls_policies.sql
-- Enable RLS on all current tables
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixit_tickets ENABLE ROW LEVEL SECURITY;

-- Utility Function for checking roles from JWT
CREATE OR REPLACE FUNCTION get_user_role() RETURNS TEXT AS $$
  SELECT current_setting('request.jwt.claims', true)::json->'app_metadata'->>'role';
$$ LANGUAGE sql STABLE;

/* --------------------------------------------------------------------------
   PUBLIC READ POLICIES
-------------------------------------------------------------------------- */
CREATE POLICY "Public can view active topics" ON topics FOR SELECT USING (true);
CREATE POLICY "Public can view active answers" ON answers FOR SELECT USING (status = 'Public');
CREATE POLICY "Public can view active stories" ON stories FOR SELECT USING (status = 'Public');
CREATE POLICY "Public can view active events" ON events FOR SELECT USING (status = 'Public');
CREATE POLICY "Public can view evidences" ON evidences FOR SELECT USING (true);
CREATE POLICY "Public can create fixit tickets" ON fixit_tickets FOR INSERT WITH CHECK (true);

/* --------------------------------------------------------------------------
   ADMIN & EDITOR POLICIES (Super Admin)
-------------------------------------------------------------------------- */
CREATE POLICY "Super admin all access topics" ON topics USING (get_user_role() = 'super_admin');
CREATE POLICY "Super admin all access answers" ON answers USING (get_user_role() = 'super_admin');
CREATE POLICY "Super admin all access stories" ON stories USING (get_user_role() = 'super_admin');
CREATE POLICY "Super admin all access events" ON events USING (get_user_role() = 'super_admin');
CREATE POLICY "Super admin all access evidences" ON evidences USING (get_user_role() = 'super_admin');
CREATE POLICY "Super admin all access audit_logs" ON audit_logs USING (get_user_role() = 'super_admin');
CREATE POLICY "Super admin all access fixit" ON fixit_tickets USING (get_user_role() = 'super_admin');

-- Operations Director
CREATE POLICY "Director all access topics" ON topics USING (get_user_role() = 'director');
CREATE POLICY "Director all access answers" ON answers USING (get_user_role() = 'director');
CREATE POLICY "Director all access stories" ON stories USING (get_user_role() = 'director');
CREATE POLICY "Director all access events" ON events USING (get_user_role() = 'director');
CREATE POLICY "Director all access evidences" ON evidences USING (get_user_role() = 'director');
CREATE POLICY "Director all access audit_logs" ON audit_logs USING (get_user_role() = 'director');
CREATE POLICY "Director all access fixit" ON fixit_tickets USING (get_user_role() = 'director');
