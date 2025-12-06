-- impl-05-analytics.sql
-- View to compute poster job stats: applicant counts and verified hours per job
CREATE OR REPLACE VIEW poster_job_stats AS
SELECT
  j.poster_id,
  j.id as job_id,
  j.title,
  COUNT(a.id) FILTER (WHERE a.status IN ('pending','accepted','rejected','verified')) as applicant_count,
  COALESCE(SUM(a.hours_awarded) FILTER (WHERE a.status = 'verified'),0) as verified_hours
FROM jobs j
LEFT JOIN applications a ON a.job_id = j.id
GROUP BY j.poster_id, j.id, j.title;

-- End impl-05-analytics.sql
