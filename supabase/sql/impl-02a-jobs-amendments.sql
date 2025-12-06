-- impl-02a-jobs-amendments.sql
-- Adds company logo field to projects table

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS company_logo_url text;

COMMENT ON COLUMN projects.company_logo_url IS 'URL for the company/organization logo';

CREATE INDEX IF NOT EXISTS idx_projects_company_logo ON projects (company_logo_url);
