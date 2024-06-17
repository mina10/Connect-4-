import React, {useEffect, useState} from 'react';
import '../game.css';
import GameCircle from './GameCircle';
import Header from './Header';
import Footer from './Footer';
import { isWinner, isDraw, getComputerMove } from '../Helper';

import {no_Circles, PLAYER_1, PLAYER_2, NO_PLAYER, GAME_STATE_PLAYING, GAME_STATE_WON, GAME_STATE_DRAW} from "../Constants";



const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(no_Circles).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [Winner, setWinner] = useState(NO_PLAYER);

    useEffect(() => {
        initGame();

    }, []);

    const initGame  = () => {
        console.log('init Game');
        setGameBoard(Array(no_Circles).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setWinner(NO_PLAYER);
        setGameState(GAME_STATE_PLAYING);
    } 
 
    const initBoard = () =>{
        const circles = [];
        for(let i=0; i < no_Circles; i++){
          circles.push(renderCircle(i)); 
        }
        return circles;
    }
    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    console.log(GameBoard);
    const circleClicked = (id) =>{

        if(gameBoard[id] !==NO_PLAYER) return;
        if(gameState !== GAME_STATE_PLAYING) return;

        if(isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WON);
            setWinner(currentPlayer);
        }
        if(isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setWinner(NO_PLAYER);
        }

        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })
        console.log("circle clicked:" +id);
        
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1 );
        console.log(gameBoard);
        console.log(currentPlayer);
    } 
    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked} />

    }
    return (
        <>
        <Header gameState={gameState} currentPlayer={currentPlayer} Winner={Winner}/>
            <div className="gameBoard" >
                    {initBoard()}
             </div><br/>
        <Footer onSuggestClick={suggestMove} onNewGameClick={initGame} gameState={gameState}/>
        </>
    )
}

export default GameBoard;
