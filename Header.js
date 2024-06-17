import React from 'react';

import {GAME_STATE_PLAYING, GAME_STATE_WON, GAME_STATE_DRAW} from "../Constants"; 

const Header = ({currentPlayer, gameState, Winner}) => {
    const renderLabel = () => {
        switch(gameState) {
         case GAME_STATE_PLAYING:
            return <div>player { currentPlayer } Turn</div>
         case GAME_STATE_WON:
            return <div>player { Winner } Wins</div>
        case GAME_STATE_DRAW:
            return <div>Game is Draw!</div>
         default:
         }
    }
    return (
        <div className="panel header">
        <div className="header-text">{renderLabel()}</div>
        </div>
    );
};

export default Header;