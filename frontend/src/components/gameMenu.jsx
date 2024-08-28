import { useState } from 'react';
import { socket } from '../socket.js';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Menu = ({ status, setStatus }) => {
    const [name, setName] = useState("");
    const handleName = () => {
        if (name.length < 1) {
            alert("Please enter your username");
            return;
        }
        socket.emit('setuser', name);
        setStatus(!status);
        setName("");
    }
    const handleKey = (e) => {
        if (e.key === 'Enter')
            handleName();
    }
    return (
        <div className='menu-container'>

            <div className='game_title'>
                <span style={{ color: "#e4320e" }}>Ju</span>
                <span style={{ color: "#f19415" }}>mb</span>
                <span style={{ color: "#1454dd" }}>bl</span>
                <span style={{ color: "green" }}>itz</span>
            </div>
            <div className='menu-details'>
                <span>Enter User Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name'

                    onKeyDown={handleKey} />
                <button onClick={() => handleName()}>Play ▶</button>
            </div>
            <div className='footer'>
                <div className="name">
                    <span style={{ color: "#e4320e" }}>Ju</span>
                    <span style={{ color: "#f19415" }}>mb</span>
                    <span style={{ color: "#1454dd" }}>bl</span>
                    <span style={{ color: "green" }}>itz</span>
                </div>
                <div className="about">
                    <span>About</span>
                    <p>Jumbblitz is a free, online multiplayer word guessing game where players compete to unscramble jumbled words.
                        The player who makes the most correct guesses by the end of the game wins. Simple, fun, and challenging—Jumbblitz will test your
                        word skills against friends and rivals!
                    </p>
                    <h3 style={{ color: "white" }}> Lets PLAY!</h3>
                </div>
                <div className="contacts">
                    <span>Contacts: </span>
                    <div className='contacts__details'>
                        <a href='mailto:brijesh1205singh@gmail.com' target='__blank'><FontAwesomeIcon style={{ color: "white", fontSize: "40px", margin: ".5rem" }} icon={faEnvelope} /></a>
                        <a href='https://www.linkedin.com/in/brijesh-singh-a01771217/' target='__blank'><FontAwesomeIcon style={{ color: "white", fontSize: "40px", margin: ".5rem" }} icon={faLinkedin} /></a>
                        <a href='https://github.com/BRijesh2001singh' target='__blank'><FontAwesomeIcon style={{ color: "white", fontSize: "40px", margin: ".5rem" }} icon={faGithub} /></a>
                    </div>
                </div>

            </div>
        </div>)
}
export default Menu;

Menu.propTypes = {
    status: PropTypes.bool.isRequired,
    setStatus: PropTypes.func.isRequired,

}