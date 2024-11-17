import "./IntroCard.css";
import { Player } from '@lottiefiles/react-lottie-player';

function IntroCard({isOpen, onClose}) {
    if (!isOpen) return null;

    return(
    <div className="intro-box">
        <button className="button_top"  onClick={onClose}></button>
        <Player 
            className="player" 
            src="/Simple-text-[remix].json"  
            loop 
            autoplay
        />
    </div>
    );
}

export default IntroCard;