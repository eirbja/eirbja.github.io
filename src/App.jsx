import { useState } from 'react'
import './App.css'
import './projects.css'
import Navigation from './navigation.jsx'
import Projects from './projects.jsx'

import projectData from './project_info.json'
import CV from "/my_CV.svg"


function App() {
  return (
    <>
      <div id="homeNav"></div>
      <Navigation/>
      {/* - TODO - should  make a menue to sort the projects, mabye, not that many projects yet*/}

      {/* - TODO - videos, that play when you hover.*/}

      <div className='title'>
          <p>Eirik B. Jahr</p>
          {/*interactive backround*/}
      </div>


      {/*button that scrolls down*/}
      <hr id="projectsNav" className="separator"/>
      

      {
        projectData?.length >0
          ?(
            <div className='project_container'>
            {projectData.map((project_instant, index) => (
              <Projects key={index} project={project_instant}/>
            ))}
            </div>
          ) :
          (
            <div className='empty'>
              <h2>No projects found</h2>
          </div>
          )
      }
      <hr id="cvNav" className="separator"/>


      <div className='CV_container'>
        <img src={CV} alt="My CV" />
      </div>

    </>
  )
}

export default App
