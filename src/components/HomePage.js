import React, { useCallback, useReducer, useRef } from "react";
import Config from "./Config";
import CanvasGrid from "./Grid";
import Catalogue from "./Catalogue";

import { buildMatrix, REDUCER } from "../utils";
let size = 50;
const threshold = 0.66;

const initialState = {
  stepCount: 1,
  stopped: true,
  isDrawing: true,
  dead: false,
  pattern: [[1]],
  borders: false,
  size: 15,
  delay: 100,
  matrix: buildMatrix(REDUCER.random({ size, threshold }))
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'nextStep':
      const [nextMatrix, isDead] = buildMatrix(
        REDUCER.stepwise({ matrix: state.matrix, borders: state.borders }),
      )
      return {
        ...state,
        stepCount: state.stepCount + 1,
        matrix: nextMatrix,
        isDead,
      }
    case 'stop':
      return { ...state, stopped: true }
    case 'start':
      return { ...state, stopped: false }
    case 'restart':
      return { ...state, stepCount: 1, dead: false, matrix: action.matrix }
    case 'gridClick':
      return { ...state, dead: action.dead, matix: action.matrix }
    case 'clear':
      return { ...state, stepCount: 1, dead: true, stopped: true, matrix: action.matrix }
    case 'draw:toggle':
      return { ...state, isDrawing: !state.isDrawing }
    case 'borders:toggle':
      return { ...state, borders: !state.borders }
    case 'setPattern':
      return { ...state, pattern: action.pattern}
    case 'setMatrix':
      return { ...state, matrix: action.matrix}
    default:
      throw new Error("what's going on?")
  }
}


function App() {
  const [config, dispatch] = useReducer(reducer, initialState)

  const setNextStepOfGame = useCallback( () => dispatch({type: 'nextStep'}) , [dispatch] )
  const intervalId = useRef()
  const onConfigChange = useCallback(
    ({ action }) => {
      switch (action) {
        case "restart":
          dispatch({ type: action, matrix: buildMatrix(REDUCER.random({ size, threshold })) })
          break;
        case "clear":
          dispatch({ type: action, matrix: buildMatrix(REDUCER.empty({ size })) })
          break;
        case "start":
          dispatch( { type: action })
          intervalId.current = setInterval( () => dispatch({ type: 'nextStep' }), config.delay )
          break;
        case "stop":
          dispatch({ type: action })
          clearInterval(intervalId.current)
          break
        case "draw:toggle":
        case "borders:toggle":
          dispatch({ type: action });
          break;
        default:
          break;
      }
    },
    [dispatch, config.delay]
  );

  const onGridClick = useCallback(
    (location, pattern) => {
      const [matrix, isDead] = buildMatrix(
        REDUCER.edit({
          location,
          pattern,
          matrix: config.matrix,
        })
      );
      dispatch({ type: 'gridClick', dead: isDead, matrix })
    },
    [config.matrix]
  );

  const onCatalogueClick = useCallback( ({ pattern }) => dispatch({ type: 'setPattern', pattern }), [] );

  return (
    <main className="p-4 pt-0 w-screen flex flex-col gap-2 bg-gray-400 items-start justify-start overflow-auto">
      <div className="bg-gray-100 shadow-md flex items-start">
        <div className="col-start-2">
          <Config
            config={config}
            setNextStepOfGame={setNextStepOfGame}
            onChange={onConfigChange}
          />
        </div>
        <div className="">
          <Catalogue onClick={onCatalogueClick} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div style={{ minWidth: 750 }} className="p-4 bg-gray-100 shadow-lg">
          <CanvasGrid matrix={config.matrix} config={config} onClick={onGridClick} />
        </div>
      </div>
    </main>
  )
}

export default App;
