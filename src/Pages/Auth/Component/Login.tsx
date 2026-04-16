import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Store/store";
import { loginUser } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, watch } = useForm<{
    email: string;
    password: string;
  }>();

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = (data: { email: string; password: string }) => {
    try {
      dispatch(loginUser(data)).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-center font-semibold text-2xl mb-4">
        Masuk atau buat akun untuk memulai
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
            <AtSymbolIcon className="w-5 h-5" />
            {!emailValue && <span>Masukan email anda</span>}
          </div>

          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
            <LockClosedIcon className="w-5 h-5" />
            {!passwordValue && <span>Masukan password anda</span>}
          </div>

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400 focus:outline-none focus:border-red-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white font-semibold py-2 rounded-sm bg-red-600 hover:bg-red-800 disabled:bg-gray-400">
          {loading ? "Loading..." : "Login"}
        </button>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        <p className="text-center mt-4">
          Belum punya akun? Registrasi{" "}
          <a href="/register" className="text-red-600 hover:text-red-800">
            di sini
          </a>
        </p>
      </form>
    </>
  );
};

export default Login;
