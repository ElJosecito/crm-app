import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center bg-[#009EFF] w-full">
      <p className="text-white mt-5">Customer Relationship Management Service</p>
      
      <div className="flex justify-center items-center my-5">
        <a href="https://do.linkedin.com/in/jos%C3%A9-miguel-martinez-florimon-b93768244" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="text-white text-2xl mx-2" />
        </a>

        <a href="https://www.instagram.com/josecito.png/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl mx-2" />
        </a>

        <a href="https://github.com/ElJosecito" target='_blank' rel='noreferrer'>
          <FontAwesomeIcon icon={faGithub} className="text-white text-2xl mx-2" />
        </a>
      </div>

      <p className='text-white'>
        Developed by <a href="https://josecito.me/" target="_blank" rel="noreferrer" className="text-white font-bold">Jose Martinez</a>
      </p>


      <div className='w-full mt-5 mb-3 px-5'>
        <p className='text-white'>
          All rights reserved &copy; 2023
        </p>
      </div>

    </footer>

  )
}

export default Footer