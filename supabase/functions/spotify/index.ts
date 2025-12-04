import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SPOTIFY_CLIENT_ID = Deno.env.get('SPOTIFY_CLIENT_ID');
const SPOTIFY_CLIENT_SECRET = Deno.env.get('SPOTIFY_CLIENT_SECRET');
const SPOTIFY_REFRESH_TOKEN = Deno.env.get('SPOTIFY_REFRESH_TOKEN');

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    console.error('Missing Spotify credentials');
    return null;
  }

  const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  
  if (data.error) {
    console.error('Token refresh error:', data);
    return null;
  }

  return data.access_token;
}

async function getNowPlaying(accessToken: string) {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const data = await response.json();
  
  if (!data.item) {
    return null;
  }

  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((a: any) => a.name).join(', '),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0]?.url,
    songUrl: data.item.external_urls.spotify,
    progress: data.progress_ms,
    duration: data.item.duration_ms,
  };
}

async function exchangeCodeForToken(code: string, redirectUri: string) {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing Spotify credentials');
  }

  const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();
  
  if (data.error) {
    console.error('Token exchange error:', data);
    throw new Error(data.error_description || data.error);
  }

  return data;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    // Handle OAuth callback - exchange code for tokens
    if (action === 'callback') {
      const { code, redirectUri } = await req.json();
      console.log('Exchanging code for tokens...');
      
      const tokens = await exchangeCodeForToken(code, redirectUri);
      
      console.log('Token exchange successful!');
      console.log('REFRESH TOKEN:', tokens.refresh_token);
      
      return new Response(JSON.stringify({
        success: true,
        refreshToken: tokens.refresh_token,
        message: 'Save the refresh token as SPOTIFY_REFRESH_TOKEN secret!',
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle now playing request
    if (action === 'now-playing') {
      const accessToken = await getAccessToken();
      
      if (!accessToken) {
        return new Response(JSON.stringify({ 
          isPlaying: false,
          error: 'No access token - need to set SPOTIFY_REFRESH_TOKEN' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const nowPlaying = await getNowPlaying(accessToken);
      
      return new Response(JSON.stringify(nowPlaying || { isPlaying: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate auth URL
    if (action === 'auth-url') {
      const { redirectUri } = await req.json();
      const scopes = 'user-read-currently-playing user-read-playback-state';
      
      const authUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${SPOTIFY_CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scopes)}`;
      
      return new Response(JSON.stringify({ authUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Spotify function error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
