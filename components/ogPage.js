import { useLiveData, saveData } from "../lib/firebase";
import { RequireLogin, useAuth, logout } from "../lib/auth";

const LoggedInUserData = () => {
  const auth = useAuth();
  console.log(auth);
  const path = `/userdata/${auth.user.uid}`;
  const { ready, data } = useLiveData(path);
  if (!ready) {
    return null;
  }
  return (
    <div>
      <input
        className="border rounded-lg px-4 py-2 m-4 w-64"
        onChange={(e) => saveData(path, e.target.value)}
        value={data}
        placeholder="This input is saved in Firebase"
      />
    </div>
  );
};

const LoginExample = () => {
  return (
    <RequireLogin>
      <div>You are signed in.</div>
      <LoggedInUserData />
      <button
        className="rounded-full px-4 py-2 bg-indigo-700 text-white"
        onClick={logout}
      >
        Sign out
      </button>
    </RequireLogin>
  );
};

const IndexPage = () => {
  return (
    <div className="p-6 h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-indigo-700">NextJS + Tailwind + Firebase</span>{" "}
        Starter
      </h1>
      <p className="p-4 font-bold mb-4 text-lg max-w-md">
        Please switch Firebase config to your own if you are going to fork this.
      </p>
      <LoginExample />
    </div>
  );
};

export default IndexPage;
