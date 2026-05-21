import {
  AuthPageLayout,
  AuthPageLayoutDescription,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutSecondaryButton,
  SignInForm,
} from '@kit/auth';
import { ButtonLink, Text } from '@kit/ui';

import { LogoImage } from '../../../components/logo';

export default function SignInPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <LogoImage />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>Welcome Back.</AuthPageLayoutHeading>

      <AuthPageLayoutDescription>
        Let's get you signed in.
      </AuthPageLayoutDescription>

      <AuthPageLayoutForm>
        <SignInForm />
      </AuthPageLayoutForm>

      <AuthPageLayoutSecondaryButton>
        <ButtonLink variant="link" href="/auth/sign-up">
          <Text className="text-center">Create an Account</Text>
        </ButtonLink>
      </AuthPageLayoutSecondaryButton>
    </AuthPageLayout>
  );
}
