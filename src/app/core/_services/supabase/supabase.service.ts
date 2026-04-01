import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { ENVIRONMENT } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {

  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      ENVIRONMENT.supabase.url,
      ENVIRONMENT.supabase.anonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase as SupabaseClient;
  }
}
