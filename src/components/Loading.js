
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker'
import  Lottie from 'react-lottie'
import annie from '../assets/loading.json'


export const Loading = () => {
   
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: annie,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
   
    const { promiseInProgress } = usePromiseTracker();
     
      return (
        <div className={promiseInProgress ? `loading` : 'loading-done'}>
        {
         (promiseInProgress === true) ?
         <Lottie options={defaultOptions}height="50%"width="60%"/>
          :
            null
        }
      </div>
      )
    };


export default Loading
