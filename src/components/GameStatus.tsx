interface GameStatusInfo{
  stage: number;
  time: number;
  score: number;
}
function GameStatus({ stage, time, score }:GameStatusInfo) {
  return (
    <div>스테이지: {stage}, 남은 시간: {time}, 점수: {score}</div>
  );
}

export default GameStatus;

