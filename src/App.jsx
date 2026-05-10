import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRoutes } from "./routes/AppRoutes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Toast } from "./components/common/Toast";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { useEffect } from "react";
import "./App.css";

function AppContent() {
  useEffect(() => {
    // Initialize theme on app mount
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (prefersDark && !savedTheme);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AppRoutes />
        <Toast />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
