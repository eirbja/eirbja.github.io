import React from 'react';
import './App.css'
import './projects.css'
import './project_modal.css'
import Navigation from './navigation.jsx'
import Projects from './projects.jsx'

import data from './project_info.json'
import CV from "/my_CV.svg"

const projectData = data.projects

function App() {
  return (
    <>
      <div id="homeNav"></div>
      <Navigation/>

      <div className='title'>
          <p>{data.name}</p>
          {/* -TODO- interactive backround*/}
      </div>

      <hr id="projectsNav" className="separator"/>
      

      {
        projectData?.length > 0
          ?(
            <div className='project_container'>
            {projectData.map((project_instant, index) => (//loops through the projects and displays them
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
        <img src={CV} alt={data.name+ "'s CV"}/>
      </div>

    </>
  )
}

export default App
