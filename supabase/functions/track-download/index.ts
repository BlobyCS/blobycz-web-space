import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DownloadTrackingRequest {
  fileId: string;
  email: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { fileId, email }: DownloadTrackingRequest = await req.json();

    console.log('Tracking download:', { fileId, email });

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    let geoData: { country_name?: string; city?: string; latitude?: number; longitude?: number } = {};
    
    if (ip !== 'unknown' && ip !== '127.0.0.1') {
      try {
        const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        if (geoResponse.ok) {
          geoData = await geoResponse.json();
          console.log('Geo data:', geoData);
        }
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    }

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
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Download tracked successfully:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
