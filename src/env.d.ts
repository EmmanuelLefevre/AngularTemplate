// eslint-disable-next-line @typescript-eslint/naming-convention
declare const process: {
  env: {
    NG_APP_SUPABASE_URL: string;
    NG_APP_SUPABASE_ANON_KEY: string;
    [key: string]: string | undefined;
  };
};
