import cssClass from "./Icon.module.css";


const Icon = () =>{
    return (
        <div>
            <div>
                <div className={cssClass.part}></div>
                <div className={cssClass.part}></div>
                <div className={cssClass.part}></div>
                <div className={cssClass.part}></div>
            </div>
        </div>
    );
}

export default Icon;