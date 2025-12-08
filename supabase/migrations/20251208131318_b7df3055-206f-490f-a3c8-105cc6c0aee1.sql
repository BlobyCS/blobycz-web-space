-- Drop the materialized view that depends on assets table
DROP MATERIALIZED VIEW IF EXISTS public.download_stats;

-- Drop the function that references assets table
DROP FUNCTION IF EXISTS public.get_download_stats();

-- Drop the assets table
DROP TABLE IF EXISTS public.assets;