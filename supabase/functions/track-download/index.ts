import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DownloadTrackingRequest {
  fileId: string;
  email: string;
}

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v))
    return res.status(200).end()
  }

  Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v))

  try {
    // ---- VERCEL ENV místo DENO ----
    const supabase = createClient(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
    );

    const { data: testData, error: testError } = await supabase
      .from('assets')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('Supabase connection ERROR:', testError);
      return res.status(500).json({ error: 'Cannot connect to Supabase' });
    } else {
      console.log('Supabase connection OK:', testData);
    }

    const { fileId, email }: DownloadTrackingRequest = req.body;

    console.log('Tracking download:', { fileId, email });

    // IP
    const ip =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown';

    // User agent
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Geolokace (ipapi)
    let geoData = null;
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      if (geoResponse.ok) {
        geoData = await geoResponse.json();
        console.log('Geo data:', geoData);
      }
    } catch (error) {
      console.error('Error fetching geo data:', error);
    }

    // ---- VLOŽENÍ DO SUPABASE ----
    const { data, error } = await supabase
      .from('assets')
      .insert({
        file_id: fileId,
        email: email,
        ip_address: ip,
        user_agent: userAgent,
        country: geoData?.country_name || null,
        city: geoData?.city || null,
        latitude: geoData?.latitude || null,
        longitude: geoData?.longitude || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Download tracked successfully:', data);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(400).json({ error: errorMessage });
  }
}
