import { act, renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'raniel.rz@gmail.com',
  name: 'Raniel',
  photo: 'any_photo.png',
};

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => ({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    }),
  };
});

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    console.log('USER PROFILE =>', result.current.user);

    expect(result.current.user.email).toBe(userTest.email);
  });
});
