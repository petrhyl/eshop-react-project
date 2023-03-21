import { useNavigation } from "react-router-dom";
import cssClass from "./MainDesign.module.css";

const MainDesign = props => {
    const navigation = useNavigation();

    return (
        <div className={cssClass.mainDesign}>
            {navigation.state === 'loading' ? <p className={cssClass.loading}>Loading ... </p> : props.children}
        </div>
    );
}

export default MainDesign;