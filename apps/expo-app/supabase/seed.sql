-- Local-dev seed: creates a confirmed test account.
-- Credentials: test@makerkit.dev / testingpassword
--
-- Token/change columns must be '' (not NULL) — GoTrue scans them into
-- non-nullable Go strings and otherwise fails with "Database error querying schema"
-- on sign-in.

with new_user as (
  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change_token_current,
    email_change,
    phone_change,
    phone_change_token,
    reauthentication_token,
    created_at,
    updated_at
  )
  values (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'test@makerkit.dev',
    crypt('testingpassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    now(),
    now()
  )
  returning id, email
)
insert into auth.identities (
  id,
  user_id,
  provider_id,
  provider,
  identity_data,
  last_sign_in_at,
  created_at,
  updated_at
)
select
  gen_random_uuid(),
  id,
  id::text,
  'email',
  jsonb_build_object('sub', id::text, 'email', email, 'email_verified', true),
  now(),
  now(),
  now()
from new_user;
