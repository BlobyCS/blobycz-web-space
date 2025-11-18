-- Remove materialized view from API access
REVOKE ALL ON public.download_stats FROM anon, authenticated;
REVOKE ALL ON public.download_stats FROM public;

-- Create a security definer function to access stats instead
CREATE OR REPLACE FUNCTION public.get_download_stats()
RETURNS TABLE (
  file_id UUID,
  filename TEXT,
  unique_downloads BIGINT,
  total_downloads BIGINT,
  countries_count BIGINT,
  last_download TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    df.id AS file_id,
    df.filename,
    COUNT(DISTINCT a.email) AS unique_downloads,
    COUNT(a.id) AS total_downloads,
    COUNT(DISTINCT a.country) AS countries_count,
    MAX(a.download_date) AS last_download
  FROM public.download_files df
  LEFT JOIN public.assets a ON df.id = a.file_id
  GROUP BY df.id, df.filename;
$$;