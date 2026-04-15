import { useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  return (
    <>
      <div className="text-center font-semibold text-3xl mb-6">
        Masuk atau buat akun untuk memulai
      </div>

      <form className="space-y-4">
        <div className="relative w-full">
          {!email && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
              <AtSymbolIcon className="w-5 h-5" />
              <span>Masukan email anda</span>
            </div>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400"
          />
        </div>

        <div className="relative w-full">
          {!password && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
              <LockClosedIcon className="w-5 h-5" />
              <span>Masukan password anda</span>
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400"
          />
        </div>

        <button className="w-full text-black py-2 rounded-lg">Login</button>
      </form>
    </>
  );
};

export default Login;
