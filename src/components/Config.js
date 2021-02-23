import React from "react";
import {
  FiPauseCircle,
  FiPlayCircle,
  FiRotateCw,
  FiXCircle,
  FiEdit2,
  FiGlobe,
  FiArrowRightCircle,
} from "react-icons/fi";
import classnames from "classnames";

const Config = ({
  config: { stopped, isDrawing, stepCount, borders },
  onChange,
  setNextStepOfGame,
}) => {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-2 p-4 items-start">
      <div className="grid grid-cols-3 gap-1 flex-wrap">
        <button
          onClick={() => onChange({ action: stopped ? 'start' : 'stop' })}
          className="mr-2 inline-flex justify-center items-center text-2xl bg-transparent hover:bg-gray-300 py-1 px-2 border border-gray-600 hover:border-transparent rounded"
        >
          {stopped ? (
            <>
              <FiPlayCircle className="mr-2 text-3xl text-green-600" />
              <span>Start</span>
            </>
          ) : (
            <>
              <FiPauseCircle className="mr-2 text-3xl text-red-600" />
              <span>Stop</span>
            </>
          )}
        </button>
        <button
          onClick={setNextStepOfGame}
          className="mr-2 inline-flex justify-center items-center text-2xl bg-transparent hover:bg-gray-300 py-1 px-2 border border-gray-600 hover:border-transparent rounded"
        >
          <FiArrowRightCircle className="mr-2 text-3xl" />
          <span>Next step</span>
        </button>
        <button
          onClick={() => onChange({ action: 'clear' })}
          className="mr-2 inline-flex justify-center items-center text-2xl bg-transparent hover:bg-gray-300 py-1 px-2 border border-gray-600 hover:border-transparent rounded"
        >
          <FiXCircle className="mr-2 text-3xl" />
          <span>Clear</span>
        </button>
        <button
          onClick={() => onChange({ action: 'restart' })}
          className="mr-2 inline-flex justify-center items-center text-2xl bg-transparent hover:bg-gray-300 py-1 px-2 border border-gray-600 hover:border-transparent rounded"
        >
          <FiRotateCw className="mr-2 text-3xl" />
          <span>Restart</span>
        </button>
        <button
          onClick={() => onChange({ action: 'draw:toggle' })}
          className={classnames(
            'mr-2 inline-flex justify-center items-center text-2xl bg-transparent hover:bg-gray-400 py-1 px-2 border border-gray-600 hover:border-transparent rounded',
            { 'bg-gray-300 border-none': isDrawing },
          )}
        >
          <FiEdit2 className="mr-2 text-3xl" />
          <span>Draw</span>
        </button>
        <button
          onClick={() => onChange({ action: 'borders:toggle' })}
          className={classnames(
            'mr-2 inline-flex justify-center items-center text-2xl bg-transparent hover:bg-gray-400 py-1 px-2 border border-gray-600 hover:border-transparent rounded',
            { 'bg-gray-300 border-none': borders },
          )}
        >
          <FiGlobe className="mr-2 text-3xl" />
          <span>Borders</span>
        </button>
      </div>
      <div>
        <label className="text-2xl">Step: {stepCount}</label>
      </div>
    </div>
  )
}

export default Config;
