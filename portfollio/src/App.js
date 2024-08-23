
import './App.css';
import Banner from './components/banner'

import { ReactTyped } from "react-typed";
import ProjectInfo from './components/ProjectInfo';
function App() {
  return (
    <div className='bg-slate-400  text-center'>
      <p className=' pt-[100px] text-2xl  pb-3'> Welcome to My Portfollio, <br></br><span className='font-bold text-6xl text-yellow-200 pt-7'>I am Sandeep Prajapati</span></p>
      <p className='text-2xl'> <span className='pl-4 '> i can do </span>

        <ReactTyped
          strings={[
            "Full Stack Development",
            "Machine Learning / Deep Learning",
            "Basic IOT",
          ]}
          typeSpeed={100}
          backSpeed={50}
          loop
        ></ReactTyped>
      </p>
      <Banner/>
      <ProjectInfo></ProjectInfo>
    </div>
  );
}

export default App;
