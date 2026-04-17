import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Store/store";
import { registerUser } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<{
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    confirm_password: string;
  }>({
    mode: "onChange",
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const firstNameValue = watch("first_name");
  const lastNameValue = watch("last_name");
  const confirmPassValue = watch("confirm_password");

  return (
    <>
      <div className="text-center font-semibold text-2xl mb-4">
        Lengkapi data untuk membuat akun
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
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400"
          />
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
            <UserIcon className="w-5 h-5" />
            {!firstNameValue && <span>Nama Depan</span>}
          </div>

          <input
            {...register("first_name", { required: "Nama Wajib Diisi" })}
            type="string"
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400"
          />
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
            <UserIcon className="w-5 h-5" />
            {!lastNameValue && <span>Nama Belakang</span>}
          </div>

          <input
            {...register("last_name", { required: "Nama Wajib Diisi" })}
            type="string"
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400"
          />
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
            <LockClosedIcon className="w-5 h-5" />
            {!passwordValue && <span>Buat Password</span>}
          </div>

          <input
            type="password"
            {...register("password", {
              required: "Password wajib diisi",
              minLength: { value: 6, message: "Minimal 6 karakter" },
            })}
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400"
          />
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
            <LockClosedIcon className="w-5 h-5" />
            {!confirmPassValue && <span>Konfirmasi Password</span>}
          </div>

          <input
            {...register("confirm_password", {
              required: "Konfirmasi password wajib diisi",
              validate: (value) =>
                value === passwordValue || "Password tidak cocok",
            })}
            type="password"
            className="w-full border rounded-sm pl-10 pr-4 py-2 border-gray-400"
          />
        </div>

        <button
          className="w-full text-white text-semibold py-2 rounded-sm bg-red-600 hover:bg-red-800 mb-6 disabled:bg-gray-400"
          disabled={!isValid}>
          {loading ? "Tunggu Sebentar" : "Register "}
        </button>
        <p>
          Sudah punya akun? Login{" "}
          <a href="/login" className="text-red-600 hover:text-red-800">
            di sini
          </a>
        </p>
      </form>
    </>
  );
};

export default Register;
