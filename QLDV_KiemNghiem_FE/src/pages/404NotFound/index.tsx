import { Link } from "react-router";
import "./styte.module.scss";
import { APP_ROUTES } from "../../constants/routers";

const NotFound = () => {
  const url = new URL(window.location.href);
  const isTunaRoute =
    url.pathname === "/tuna" || url.pathname.startsWith("/tuna/");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 opacity-20 blob"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-300 opacity-20 blob"></div>

      <div className="max-w-4xl w-full mx-auto px-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 flex items-center justify-center relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <pattern
                    id="pattern-circles"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                  >
                    <circle
                      id="pattern-circle"
                      cx="10"
                      cy="10"
                      r="1.5"
                      fill="#fff"
                    ></circle>
                  </pattern>
                  <rect
                    id="rect"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#pattern-circles)"
                  ></rect>
                </svg>
              </div>

              <div className="text-center relative">
                <div className="glitch text-8xl font-extrabold text-white mb-6">
                  404
                </div>

                <div className="animate-float">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-40 w-40 text-white/90 mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      d="M10 2v7.31"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 2v7.31"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 9.61v8.56"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 9.61v8.56"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 21.78v-8.56"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 21.78v-8.56"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 5.61h16"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 9.61h16"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 13.22h16"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 17.22h16"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4a2 2 0 0 1 2-2z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                  </svg>
                </div>

                <div className="mt-4 text-white/90 font-medium text-lg">
                  Không tìm thấy trang
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-800 ml-3">
                  Trung tâm Kiểm nghiệm Tuna
                </h1>
              </div>

              <h2 className="text-3xl font-bold gradient-text mb-6">
                Trang không tồn tại
              </h2>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm
                thời không khả dụng. Vui lòng kiểm tra lại đường dẫn hoặc quay
                lại trang chủ để tiếp tục.
              </p>

              <div className="space-y-6">
                <Link
                  to={isTunaRoute ? APP_ROUTES.TUNA_ADMIN.DASHBOARD.to : "/"}
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-8 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Trở về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Trung tâm Viện Kiểm nghiệm. Tất cả các
          quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
