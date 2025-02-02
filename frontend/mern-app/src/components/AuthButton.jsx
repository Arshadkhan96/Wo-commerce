import { useAuth0 } from "@auth0/auth0-react";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <h1>Loading...</h1>;

  return isAuthenticated ? (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </button>
  ) : (
    <button onClick={() => loginWithRedirect()}>Login</button>
  );
};

export default AuthButtons;
