import {
  AuthPageLayout,
  AuthPageLayoutDescription,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutSecondaryButton,
  SignUpForm,
} from '@kit/auth';
import { ButtonLink, Text } from '@kit/ui';

import { LogoImage } from '../../../components/logo';

export default function SignUpPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <LogoImage />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>Let's get started.</AuthPageLayoutHeading>

      <AuthPageLayoutDescription>
        Sign up to create your account.
      </AuthPageLayoutDescription>

      <AuthPageLayoutForm>
        <SignUpForm />
      </AuthPageLayoutForm>

      <AuthPageLayoutSecondaryButton>
        <ButtonLink variant="link" href="/auth/sign-in">
          <Text className="text-center">Already have an Account? Sign In.</Text>
        </ButtonLink>
      </AuthPageLayoutSecondaryButton>
    </AuthPageLayout>
  );
}
