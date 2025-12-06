-- impl-05-analytics.sql
-- View to compute poster project stats: applicant counts and verified hours per project
CREATE OR REPLACE VIEW poster_project_stats AS
SELECT
  p.poster_id,
  p.id as project_id,
  p.title,
  COUNT(a.id) FILTER (WHERE a.status IN ('pending','accepted','rejected','verified')) as applicant_count,
  COALESCE(SUM(a.hours_awarded) FILTER (WHERE a.status = 'verified'),0) as verified_hours
FROM projects p
LEFT JOIN applications a ON a.project_id = p.id
GROUP BY p.poster_id, p.id, p.title;

-- End impl-05-analytics.sql
