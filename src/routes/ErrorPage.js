import { useRouteError } from "react-router-dom";
import cssClass from "./ErrorPage.module.css";
import MainDesign from "../components/ui/MainDesign";

const ErrorPage = () => {
    const error = useRouteError();

    let message = 'An error was occured.';

    if (error.status === 404) {
        message = 'Page not found.';
    }

    if (error.status > 404) {
        message = error.data.message;
    }

    return (
        <div className={cssClass.page}>
            <MainDesign>
                <div className={cssClass.errorBox}>
                    <h2 className={cssClass.warningMessage}>{message}</h2>
                </div>
            </MainDesign>
        </div>
    );
}

export default ErrorPage;