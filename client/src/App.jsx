import { useContext } from "react";
import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Demo from "./pages/Demo";
import UploadFilePage from "./pages/UploadFilePage";
import style from "./app.module.scss";
import { AuthContext } from "./context/AuthContext";
// import PulseCalculator from "./pages/PulseCalculator";

const App = () => {
  const { isUserLogged } = useContext(AuthContext);

  return (
    <div className={style.wrapper}>
      <SnackbarProvider />
      <BrowserRouter>
        {!isUserLogged && (
          <nav className={style.nav}>
            <Link to="sign-in">Вход</Link>
            <Link to="sign-up">Регистрация</Link>
          </nav>
        )}
        <Routes>
          {isUserLogged ? (
            <>
              <Route path="demo" element={<Demo />} />
              <Route path="upload" element={<UploadFilePage />} />
              {/* <Route path="/pulse-calculator" element={<PulseCalculator filePath="/home/sirius/Загрузки/Telegram Desktop/КАРЕН_Алексеев_Сергей_2024_01_29_14_30_14_бег_5сек (3).xlsx" />} /> */}
            </>
          ) : (
            <>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </>
          )}
          <Route  
            path="*"
            element={<Navigate to={isUserLogged ? "demo" : "sign-in"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
