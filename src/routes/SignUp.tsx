import DefaultLayout from "../layout/DefaultLayout";

export default function SignUp() {
  return (
    <DefaultLayout>
      <form className="form">
        <h1>Sign Up</h1>
        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />

        <button>Login</button>
      </form>
    </DefaultLayout>
  );
}
