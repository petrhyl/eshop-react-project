import { useEffect, useState } from "react";
import cssClass from "./Carousel.module.css";

const Carousel = props => {
    const [picIndex, setPicIndex] = useState(0);
    const [picture, setPicture] = useState(props.images[0].fileName);
    const [indicators, setIndicators] = useState([]);
    const [startPointer, setStartPointer] = useState();

    const { images } = props;

    const handleNext = () => {
        if (picIndex < (props.images.length - 1)) {
            setPicIndex(prevState => prevState + 1);
        } else {
            setPicIndex(0);
        }
    }

    const handlePreview = () => {
        if (picIndex > 0) {
            setPicIndex(prevState => prevState - 1);
        } else {
            setPicIndex(props.images.length - 1);
        }
    }

    const handleTouchStart = event => {
        setStartPointer(event.changedTouches[event.changedTouches.length - 1].screenX);
    }

    const handleTouchEnd = event => {
        if ((event.changedTouches[event.changedTouches.length - 1].screenX - startPointer) < - 100) {
            handleNext();
            return;
        }

        if ((event.changedTouches[event.changedTouches.length - 1].screenX - startPointer) > 100) {
            handlePreview();
        }
    }

    useEffect(() => {
        const listItems = images.map((img, index) => {
            return (
                <li key={img.pictureId}>
                    <img id={'indicator_' + img.pictureId} className={index === picIndex ? cssClass.active : cssClass.inactive} src="https://hyl-petr.xf.cz/images/indicator.png" alt="indicator" />
                </li>
            );
        });

        setPicture(images[picIndex].fileName);
        setIndicators(listItems);
    }, [picIndex, images]);

    return (
        <div className={cssClass.carousel}>
            <div className={cssClass.slide} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img className={cssClass.picture} src={picture} alt="product" />
                <button className={`${cssClass.slideButton} ${cssClass.preview}`} onClick={handlePreview}>
                    <img src="https://hyl-petr.xf.cz/images/left-arrow-light.png" alt="preview" />
                </button>
                <button className={`${cssClass.slideButton} ${cssClass.next}`} onClick={handleNext}>
                    <img src="https://hyl-petr.xf.cz/images/right-arrow-light.png" alt="next" />
                </button>
            </div>
            <ul className={cssClass.indicatorBar}>
                {indicators}
            </ul>
        </div>
    );
}

export default Carousel;