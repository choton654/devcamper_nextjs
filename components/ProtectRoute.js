import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function ProtectRoute(Component) {
  return () => {
    const token = Cookie.getJSON('userInfo') || null;
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/login');
      }
    }, [token]);
    return (
      <div>
        <Component {...arguments} />
      </div>
    );
  };
}
