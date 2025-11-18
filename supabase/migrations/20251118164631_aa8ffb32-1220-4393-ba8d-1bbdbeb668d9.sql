-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create download_files table
CREATE TABLE public.download_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE public.download_files ENABLE ROW LEVEL SECURITY;

-- Create assets table (download tracking)
CREATE TABLE public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID REFERENCES public.download_files(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  download_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Trigger function for new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for download_files
CREATE POLICY "Anyone can view active files"
  ON public.download_files FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage files"
  ON public.download_files FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for assets
CREATE POLICY "Users can view their own downloads"
  ON public.assets FOR SELECT
  USING (email = (SELECT email FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Anyone can insert download records"
  ON public.assets FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view all downloads"
  ON public.assets FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create materialized view for download statistics
CREATE MATERIALIZED VIEW public.download_stats AS
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

-- Create index for better performance
CREATE INDEX idx_assets_email ON public.assets(email);
CREATE INDEX idx_assets_file_id ON public.assets(file_id);
CREATE INDEX idx_assets_download_date ON public.assets(download_date);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);