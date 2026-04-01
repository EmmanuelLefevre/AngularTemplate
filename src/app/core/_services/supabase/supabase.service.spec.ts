import { TestBed } from '@angular/core/testing';
import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseService } from './supabase.service';

describe('SupabaseService', () => {

  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupabaseService]
    });
    service = TestBed.inject(SupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the supabase client', () => {
    const client: SupabaseClient = service.client;

    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(Object);
  });
});
