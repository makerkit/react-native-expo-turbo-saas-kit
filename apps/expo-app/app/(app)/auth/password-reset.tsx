import {
  AuthPageLayout,
  AuthPageLayoutDescription,
  AuthPageLayoutForm,
  AuthPageLayoutHeading,
  AuthPageLayoutLogo,
  AuthPageLayoutSecondaryButton,
  EmailPasswordResetForm,
} from '@kit/auth';
import { ButtonLink, Text } from '@kit/ui';

import { LogoImage } from '../../../components/logo';

export default function PasswordResetPage() {
  return (
    <AuthPageLayout>
      <AuthPageLayoutLogo>
        <LogoImage />
      </AuthPageLayoutLogo>

      <AuthPageLayoutHeading>Hi,</AuthPageLayoutHeading>

      <AuthPageLayoutDescription>
        Let's recover your password.
      </AuthPageLayoutDescription>

      <AuthPageLayoutForm>
        <EmailPasswordResetForm />
      </AuthPageLayoutForm>

      <AuthPageLayoutSecondaryButton>
        <ButtonLink variant="link" href="/auth/sign-in">
          <Text className="text-center">Password Recovered? Sign In.</Text>
        </ButtonLink>
      </AuthPageLayoutSecondaryButton>
    </AuthPageLayout>
  );
}
