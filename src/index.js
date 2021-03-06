import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { tsTypeQuery } from '@babel/types';

ReactDOM.render(<App />, document.getElementById('root'));
class Square extends React.Component {
    render() {
      return (
        <button
          className="square"
          onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    // handleClick(i){
    //     const squares=this.state.squares.slice();
    //     if(calculateWinner(squares)||squares[i]){
    //         return;
    //     }
    //     squares[i]=this.state.xIsNext?'X':'O';
    //     this.setState({squares:squares,
    //                     xIsNext:!this.state.xIsNext,});
    // }
    // handleClick2=()=>{
    //     const squares=Array(9).fill(null);
    //     this.setState(state => ({
    //       squares:squares
    //     }));
    //   }    
    
      renderSquare(i) {
      return <Square value={this.props.squares[i]}
                onClick={()=>this.props.onClick(i)}/>;
    }
    
    render() {
      return (
        <div>
          {/* <div className="status">
              {status}
      </div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <button onClick={this.props.onClick2}>
        reset
      </button>            

        </div>
      );
    }
  }
  function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    for(let i=0;i<lines.length;i++){
        const [a,b,c]=lines[i];
        if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
            return squares[a];
        }
    }
    return null;
}

  class Game extends React.Component {
    constructor(props){
        super(props);
        this.state={
            history:[{
                squares:Array(9).fill(null),
            }],
            record:[{
              player:"",
              location:""
            }],
            xIsNext:true,
            stepNumber:0,
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0,
        });
    }
    handleClick(i){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const record=this.state.record.slice(0,this.state.stepNumber+1);
        const current=history[history.length-1];
        const squares=current.squares.slice();
        if(calculateWinner(squares)||squares[i]){
            return;
        }
        squares[i]=this.state.xIsNext?'A':'B';
        this.setState({
            history:history.concat([{
                squares:squares,
            }]),
            record:record.concat({
              player:squares[i],
              location:i
            }),
            xIsNext:!this.state.xIsNext,
            stepNumber:history.length,
        });
    }
    handleClick2(){
        // const squares=Array(9).fill(null);
        // const history=this.state.history;
        this.setState({
            history:[{
                squares:Array(9).fill(null),
            }],
            stepNumber:0,
            xIsNext:true,
        }
        );
      }    
    render() {
        const {history,record}=this.state;
        const current=history[this.state.stepNumber];
        const winner= calculateWinner(current.squares);
        const moves=history.map((step,move)=>{
            const desc=move?
            'go to move'+move:
            'move to start';
            const squares2=Array(9);
            var i;
            for(i=0;i<9;i++){
                if(!history[move].squares[i]){
                    squares2[i]='*';
                }else{
                    squares2[i]=history[move].squares[i];
                }
            }
            return (
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                    <span>{"player is "+record[move].player+";location is "+record[move].location}</span>
                </li>
            )
        })
        let status;
        if(winner){
            status='Winner is:'+winner;
        }else{
            status='Next player: '+(this.state.xIsNext?'A':'B');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i)=>this.handleClick(i)}
                onClick2={()=>this.handleClick2()}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
