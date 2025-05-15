import { useState } from "react";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom"; // Updated to react-router-dom

const Header = ({ onClick, onToggle }) => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="block w-10 h-10 text-gray-500 lg:hidden dark:text-gray-400"
            onClick={onToggle}
          >
            {/* Hamburger Icon */}
            <svg
              className={`block`}
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                fill="currentColor"
              />
            </svg>
            <svg
              className="hidden"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
            {/* Cross Icon */}
          </button>
          <button
            onClick={onClick}
            className="items-center justify-center hidden w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
          >
            <svg
              className="hidden fill-current lg:block"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                fill=""
              />
            </svg>
          </button>

          <Link to="/" className="lg:hidden">
            <img
              className="dark:hidden"
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <img
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM5.99902 7.99512C4.1706 7.99512 3.49902 7.32354 3.49902 6.49512C3.49902 5.6667 4.1706 4.99512 5.99902 4.99512C7.82745 4.99512 8.49902 5.6667 8.49902 6.49512C8.49902 7.32354 7.82745 7.99512 5.99902 7.99512ZM5.99902 13.0051C4.1706 13.0051 3.49902 12.3335 3.49902 11.5051C3.49902 10.6767 4.1706 9.99512 5.99902 9.99512C7.82745 9.99512 8.49902 10.6767 8.49902 11.5051C8.49902 12.3335 7.82745 13.0051 5.99902 13.0051ZM13.999 10.4951C14.8274 10.4951 15.499 11.1667 15.499 11.9951V12.0051C15.499 12.8335 14.8274 13.5051 13.999 13.5051C13.1706 13.5051 12.499 12.8335 12.499 12.0051C12.499 11.1667 13.1706 10.4951 13.999 10.4951ZM13.999 7.99512C12.1706 7.99512 11.499 7.32354 11.499 6.49512C11.499 5.6667 12.1706 4.99512 13.999 4.99512C15.8274 4.99512 16.499 5.6667 16.499 6.49512C16.499 7.32354 15.8274 7.99512 13.999 7.99512ZM13.999 13.0051C12.1706 13.0051 11.499 12.3335 11.499 11.5051C11.499 10.6767 12.1706 9.99512 13.999 9.99512C15.8274 9.99512 16.499 10.6767 16.499 11.5051C16.499 12.3335 15.8274 13.0051 13.999 13.0051ZM21.499 10.4951C22.3274 10.4951 22.999 11.1667 22.999 11.9951V12.0051C22.999 12.8335 22.3274 13.5051 21.499 13.5051C20.6706 13.5051 19.999 12.8335 19.999 12.0051C19.999 11.1667 20.6706 10.4951 21.499 10.4951ZM21.499 7.99512C19.6706 7.99512 18.999 7.32354 18.999 6.49512C18.999 5.6667 19.6706 4.99512 21.499 4.99512C23.3274 4.99512 23.999 5.6667 23.999 6.49512C23.999 7.32354 23.3274 7.99512 21.499 7.99512ZM21.499 13.0051C19.6706 13.0051 18.999 12.3335 18.999 11.5051C18.999 10.6767 19.6706 9.99512 21.499 9.99512C23.3274 9.99512 23.999 10.6767 23.999 11.5051C23.999 12.3335 23.3274 13.0051 21.499 13.0051Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
