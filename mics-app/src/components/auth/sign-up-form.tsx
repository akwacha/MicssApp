'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  ClientID: zod.string().min(1, { message: 'the ID you got please.' }),
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  companyName: zod.string().min(3, { message: 'enter Company name' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { companyName: '', ClientID: '', firstName: '', lastName: '', email: '', password: '', terms: false } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [userType, setUserType] = React.useState<string>('Client'); // State to manage selected user type

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormLabel id="sign-in-as">You Are:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="sign-in-as"
            name="row-radio-buttons-group"
            value={userType}
            onChange={(event) => setUserType(event.target.value)} // Handle radio button change
          >
            <FormControlLabel value="Client" control={<Radio />} label="Client" />
            <FormControlLabel value="Councelors" control={<Radio />} label="Councelors" />
            <FormControlLabel value="Stakeholders" control={<Radio />} label="Stakeholders" />
          </RadioGroup>

          {userType === 'Client' && (
            <Controller
              control={control}
              name="ClientID"
              render={({ field }) => (
                <FormControl error={Boolean(errors.ClientID)}>
                  <InputLabel>Client ID</InputLabel>
                  <OutlinedInput {...field} label="Client ID" />
                  {errors.ClientID ? <FormHelperText>{errors.ClientID.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          )}

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          {  userType !== 'Client' && (
            <>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.firstName)}>
                    <InputLabel>First name</InputLabel>
                    <OutlinedInput {...field} label="First name" />
                    {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.lastName)}>
                    <InputLabel>Last name</InputLabel>
                    <OutlinedInput {...field} label="Last name" />
                    {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput {...field} label="Email address" type="email" />
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              {userType === 'Stakeholders' && (
                <Controller
                  control={control}
                  name="companyName"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.companyName)}>
                      <InputLabel>Company Name</InputLabel>
                      <OutlinedInput {...field} label="Company Name" />
                      {errors.companyName ? <FormHelperText>{errors.companyName.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              )}
              <Controller
                control={control}
                name="terms"
                render={({ field }) => (
                  <div>
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label={
                        <React.Fragment>
                          I have read the <Link>terms and conditions</Link>
                        </React.Fragment>
                      }
                    />
                    {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
                  </div>
                )}
              />
            </>
          )}

          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign up
          </Button>
        </Stack>
      </form>
      <Alert color="warning">Created users are not persisted</Alert>
    </Stack>
  );
}
