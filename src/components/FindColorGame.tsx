import Cell from './Cell';
import GameStatus from './GameStatus';
import { useEffect, useReducer } from "react";
import styled from "styled-components";

const GAME_FRAME_SIZE:number = 360;
const CELL_MARGIN: number = 4;
const StyledFindColorGame = styled.div`
    width: ${GAME_FRAME_SIZE}px;
    display: flex;
    flex-flow: row wrap;
`;

function initialGameStatus() {
  let stage = 1;
  let axisCount = 2;
  let colorDiffLevel = 25;
  let answer = getAnswer(axisCount);
  let cellSize = getCellSize(axisCount);
  let time = 15;
  let score = 0;
  let [baseRed, baseGreen, baseBlue] = getBaseColor();
  let [answerRed, answerGreen, answerBlue] = getAnswerColor(baseRed, baseGreen, baseBlue, colorDiffLevel);

  return {
    stage: stage,
    baseColor: getRGBString(baseRed, baseGreen, baseBlue),
    answerColor: getRGBString(answerRed, answerGreen, answerBlue),
    axisCount: axisCount,
    colorDiffLevel: colorDiffLevel,
    answer: answer,
    cellSize: cellSize,
    time: time,
    score: score,
  };
}
function levelUpStage(state:stateType, action:Action) {
  let score = state.score + (state.stage ** 3) * state.time;
  let stage = state.stage + 1;
  let increaseAxisCount = stage % 2 === 1 ? 1 : 0;
  let decreaseColorDiff = stage % 3 === 2 ? -1 : 0
  let axisCount = state.axisCount + increaseAxisCount
  let colorDiffLevel = state.colorDiffLevel + decreaseColorDiff;
  let answer = getAnswer(axisCount);
  let cellSize = getCellSize(axisCount);
  let time = 15;
  let [baseRed, baseGreen, baseBlue] = getBaseColor();
  let [answerRed, answerGreen, answerBlue] = getAnswerColor(baseRed, baseGreen, baseBlue, colorDiffLevel);

  return {
    ...state,
    baseColor: getRGBString(baseRed, baseGreen, baseBlue),
    answerColor: getRGBString(answerRed, answerGreen, answerBlue),
    stage: stage,
    axisCount: axisCount,
    answer: answer,
    cellSize: cellSize,
    time: time,
    score: score,
  };
}
function lapseTime(state:stateType, action:Action) {
  let time = state.time - 1;
  return {
    ...state,
    time,
  };
}
function decreaseTime(state:stateType, action:Action) {
  let time = state.time >= 3 ? state.time - 3 : 0;
  return {
    ...state,
    time,
  };
}

interface Action {
    type: string,
}

interface stateType {
    stage: number,
    baseColor: string,
    answerColor: string,
    axisCount: number,
    colorDiffLevel: number,
    answer: number,
    cellSize: number,
    time: number,
    score: number,
}
function reducer(state:stateType, action:Action) {
  switch (action.type) {
    case 'INIT_GAME_STATUS':
      return initialGameStatus();
    case 'CORRECT':
      return levelUpStage(state, action);
    case 'INCORRECT':
      return decreaseTime(state, action);
    case 'LAPSE_TIME':
      return lapseTime(state, action);
    case 'GAME_OVER':
      alert("GAME OVER!\n스테이지: " + state.stage + ", 점수: " + state.score);
      return initialGameStatus();
    default:
      return state;
  }
}
function getRGBString(red:number, green:number, blue:number) {
  return 'rgb(' + [red, green, blue].join(',') + ')';
}
function getBaseColor() {
  return [Math.round((Math.random() * 255)), Math.round((Math.random() * 255)), Math.round((Math.random() * 255))];
}
function getAnswerColor(red:number, green:number, blue:number, colorDiffLevel:number) {
  function correctColorNum(color:number) {
    color = color > 255 ? 255 : color;
    color = color < 0 ? 0 : color;
    return color;
  }
  red = red + (colorDiffLevel * (Math.random() < 0.5 ? -1 : 1));
  red = correctColorNum(red);
  green = green + (colorDiffLevel * (Math.random() < 0.5 ? -1 : 1));
  green = correctColorNum(green);
  blue = blue + (colorDiffLevel * (Math.random() < 0.5 ? -1 : 1));
  blue = correctColorNum(blue);
  return [red, green, blue];
}
function getAnswer(axisCount:number) {
  let cellTotalCount = axisCount ** 2;
  return Math.round(Math.random() * (cellTotalCount - 1));
}
function getCellSize(axisCount: number) {
  let realGameFrame = GAME_FRAME_SIZE - (axisCount) * CELL_MARGIN;
  return Math.floor(realGameFrame / axisCount);
}


function FindColorGame() {
  const [gameStatus, dispatch] = useReducer(reducer, initialGameStatus());
 
  useEffect(() => {

    if (gameStatus.time === 0) {
      dispatch({ type: 'GAME_OVER' })
    } else {
      console.log(gameStatus);
      const timeout = setTimeout(() => dispatch({ type: 'LAPSE_TIME' }), 1000);
      return () => clearTimeout(timeout);
    }

  }, [gameStatus]);
  const onCorrect = () => {
    dispatch({ type: 'CORRECT' });
  };
  const onIncorrect = () => {
    dispatch({ type: 'INCORRECT' });
  };
  const renderingCell = () => {
    const result = [];
    for (let i = 0; i < gameStatus.axisCount ** 2; i++) {
      if (i === gameStatus.answer) {
        result.push(<Cell key={i} cellSize={gameStatus.cellSize + "px"} color={gameStatus.baseColor} onClick={onCorrect} />);
      } else {
        result.push(<Cell key={i} cellSize={gameStatus.cellSize + "px"} color={gameStatus.answerColor} onClick={onIncorrect} />);
      }
    }
    return result;
  };



  return (
    <div>
      <GameStatus stage={gameStatus.stage} time={gameStatus.time} score={gameStatus.score} />
      <StyledFindColorGame>
        {renderingCell()}
      </StyledFindColorGame>
    </div>
  );
}


export default FindColorGame;
