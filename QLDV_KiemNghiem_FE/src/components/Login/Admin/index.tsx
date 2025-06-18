import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import yup from "../../../configs/yup.custom";
import { APP_ROUTES } from "../../../constants/routers";
import { image } from "../../../constants/image";
import { useDangNhapNhanVien } from "../../../hooks/personnels/access/useAccess";
import { queryClient } from "../../../lib/reactQuery";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useNavigate();

  let schema = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .required("Yêu cầu nhập Email")
        .email("Email sai định dạng")
        .max(50, "Email nhập phải dưới 50 ký tự"),
      password: yup
        .string()
        .required("Yêu cầu nhập mật khẩu")
        .max(200, "Mật khẩu nhập phải dưới 200 ký tự"),
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(schema), mode: "onChange" });

  const handleOnSettled = async (response: any) => {
    await queryClient.invalidateQueries({
      queryKey: ["DangNhapNhanVien"],
    });
    if (response?.status === 200) router(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
  };

  const { mutate } = useDangNhapNhanVien({
    queryKey: "DangNhapNhanVien",
    onSettled: handleOnSettled,
  });

  const onSubmit = (data: LoginForm) => {
    mutate(data);
  };

  // const handleRedirectForgot = () => {
  //   router(APP_ROUTES.TUNA_ADMIN.FORGOTPASSWORD.to);
  // };

  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
  }, []);

  return (
    <section className="flex items-center justify-center">
      <div className="container py-5">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-300">
              <div className="w-2/5 flex items-center bg-[linear-gradient(to_bottom,#F7797D,#FBD786,#C6FFDD)]">
                <img
                  src={image.imageTunaLogo}
                  alt="login form"
                  className="object-cover"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div>
              <div className="flex-1 flex items-center">
                <div className="p-8 md:p-12 w-full">
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center mb-8">
                      <span className="text-3xl font-bold">Đăng nhập</span>
                    </div>
                    <div className="mb-6 grid gap-1 relative">
                      <label
                        htmlFor="form2Example17"
                        className="block text-cyan-950"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="form2Example17"
                        {...register("email")}
                        className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.email?.message && (
                        <p className="text-sm text-red-600 absolute -bottom-6">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-8 relative">
                      <label
                        htmlFor="form2Example27"
                        className="block mb-2 text-cyan-950"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="form2Example27"
                        {...register("password")}
                        className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.password?.message && (
                        <p className="text-sm text-red-600 absolute -bottom-6">
                          {errors.password?.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <button className="w-full py-3 bg-[#41737c] text-white text-lg rounded-lg hover:bg-[#356267] transition cursor-pointer">
                        Login
                      </button>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <a
                        className="text-sm text-cyan-950 hover:underline"
                        href="#!"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-cyan-950">
                      <a href="#!" className="hover:underline">
                        Terms of use.
                      </a>
                      <a href="#!" className="hover:underline">
                        Privacy policy
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
