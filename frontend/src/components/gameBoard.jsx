import { useEffect, useState } from 'react';
import guessed from '../assets/sounds/new-notification-7-210334.mp3'
import '../App.css';
import { socket } from '../socket';
function GameBoard() {
    const [userCount, setUserCount] = useState(0);
    const [newWord, setNewWord] = useState("");
    const [text, setText] = useState({});
    const [chat, setChat] = useState([]);
    const [score, setScore] = useState({});
    const [start, setStart] = useState(false);
    const [timer, setTimer] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState("");
    useEffect(() => {
        // Listeners for the default namespace
        //newWord
        socket.on('test', msg => {
            console.log(msg);
        })
        socket.on('newword', (word) => {
            setNewWord(word);
        })
        //msg
        socket.on('newmsg', (data) => {

            if (data.name === 'undefined') return;
            else if (data.msg[0] === 'S') {
                const newmsg = data.msg.slice(1);
                setChat((prevChat) => [...prevChat, { msg: newmsg, name: 'server' }]);
            }
            else if (data.msg[0] === 'L') {
                const newmsg = data.msg.slice(1);
                setChat((prevChat) => [...prevChat, { msg: newmsg, name: 'server-l' }]);
            }
            else {
                setChat((prevChat) => [...prevChat, { msg: data.msg, name: data.name }]);
            }
            if (chat.length > 10) {
                chat.shift();
            }
        });
        socket.on('usercount', (data) => {
            setUserCount(data);
            if (data > 1) {
                setStart(true);
            }
        })
        //check correct guess
        socket.on('correct', (data) => {
            if (data.status) {
                new Audio(guessed).play();
                setChat((prevChat) => [...prevChat, { msg: `${data.name} guessed it right!`, name: 'server' }]);
            }
        })
        //get scores
        socket.on('newscore', (chart) => {
            setScore(chart);
        })
        // //get list of joined players
        // socket.on('list', (list) => {
        //     console.log(list);
        // })
        //alert newuser joined
        socket.on('newplayer', (opsName) => {
            socket.emit('newmsg', `S${opsName} joined the game!`);

        })

        //if users leaves
        socket.on('userleft', (message) => {
            socket.emit('newmsg', message);
        });
        //timer
        socket.on('timer', (data) => {
            setTimer(data);
        })
        //winner
        socket.on('winner', (data) => {
            console.log(data)
            setGameOver(data.status);
            setWinner(data.name);
        })
        // Cleanup function to remove listeners
        return () => {
            socket.off('newword');
            socket.off('newusers');
            socket.off('newmsg');
            socket.off('newscore');
            socket.off('usercount');
            socket.off('newplayer');
        };
    }, []);

    const senDmsg = (e) => {
        if (e.key === 'Enter') {
            socket.emit('newmsg', text);
            setText("");
        }
    }

    return (
        <div className='game-box'>
            {!start ? (<div className='modal'>
                <div className="modal-content">
                    <img src='https://media4.giphy.com/media/9xQlVSF2W0gcDkjpwW/giphy.gif?cid=6c09b952fefbhagyb5w5qm98o8vwp9rn22vwhgtx5zyqxbhd&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s' />
                    <span>Waiting for opponent to join....</span>
                </div>

            </div>) : (
                <>
                    <div className="score">

                        <h2>Score Board</h2>
                        {score && Object.entries(score).map(([key, value]) => {
                            if (key === 'undefined') return;
                            return (
                                <div key={key} className='score-table'>
                                    <span >{key}:{value}</span>
                                </div>)
                        })}
                        <span>Total players:{userCount}</span>
                    </div>
                    {gameOver ? <div className='winBoard'>
                        <div className='winBoard-dis'>
                            <span>Winner</span>
                            <span>👑{winner}</span>
                        </div>
                        <button onClick={() => setGameOver(!gameOver)}>Continue</button>
                        <button onClick={() => window.location.reload()}>Leave</button>
                    </div> :
                        <div className='game-zone'>
                            {timer < 10 ? (<span className='time-content' style={{ color: "red" }}>Time left :{timer}s</span>) : (<span className='time-content'>Time left :{timer}s</span>)}
                            <span className='jword'>{newWord}</span>
                        </div>}
                    <div className='msg-container'>
                        {chat && chat.filter((item, index, self) => {
                            if (item.name === 'server' || item.name === 'server-l') {
                                // Find the first occurrence of the message with the same name and msg
                                return index === self.findIndex((t) => (
                                    t.msg === item.msg && t.name === item.name
                                ));
                            }
                            return true; // Keep all other messages
                        }).map((item, ind) => (
                            item.name === 'server' ? (
                                <span style={{ color: "#116c19" }} key={ind}>{item.name}: {item.msg}</span>
                            ) : item.name === 'server-l' ? (
                                <span style={{ color: "red" }} key={ind}>server: {item.msg}</span>
                            ) : (
                                <span key={ind}>{item.name}: {item.msg}</span>
                            )
                        ))}
                        <input type='text' value={text.length > 0 ? text : ""} onChange={(e) => {
                            setText(e.target.value)
                        }}
                            onKeyDown={(e) => senDmsg(e)}
                        />

                    </div>
                </>)}
        </div>
    );
}

export default GameBoard;
