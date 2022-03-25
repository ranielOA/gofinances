import { act, renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import fetchMock from 'jest-fetch-mock';
import { startAsync } from 'expo-auth-session';
import { mocked } from 'ts-jest/utils';

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'raniel.rz@gmail.com',
  name: 'Raniel',
  photo: 'any_photo.png',
};

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync);

    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    } as any);

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe(userTest.email);
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync);

    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    } as any);

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});
