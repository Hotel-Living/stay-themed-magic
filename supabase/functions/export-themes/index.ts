
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log("Export themes function started")

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify admin access
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Authentication failed')
    }

    // Check if user is admin
    const { data: adminCheck, error: adminError } = await supabaseClient
      .rpc('has_role', { role_name: 'admin' })

    if (adminError || !adminCheck) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Admin access required' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Export all themes with complete structure
    const { data: themes, error: themesError } = await supabaseClient
      .from('themes')
      .select(`
        id,
        name,
        description,
        category,
        level,
        parent_id,
        sort_order,
        created_at
      `)
      .order('level', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true })

    if (themesError) {
      console.error('Error fetching themes:', themesError)
      throw themesError
    }

    console.log(`Successfully exported ${themes?.length || 0} themes`)

    // Create structured export data
    const exportData = {
      export_date: new Date().toISOString(),
      total_themes: themes?.length || 0,
      structure: {
        level_1_categories: themes?.filter(t => t.level === 1).length || 0,
        level_2_subcategories: themes?.filter(t => t.level === 2).length || 0,
        level_3_items: themes?.filter(t => t.level === 3).length || 0
      },
      themes: themes || []
    }

    // Return as downloadable JSON
    return new Response(
      JSON.stringify(exportData, null, 2),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="themes-export-${new Date().toISOString().split('T')[0]}.json"`
        }
      }
    )

  } catch (error) {
    console.error('Export themes error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
