import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://umcxrvqhhskemyepnstp.supabase.co';
const supabaseKey = 'sb_publishable_vhUM2RkJRJTECEt5tkRGTA_626BZGS5';

export const supabase = createClient(supabaseUrl, supabaseKey);