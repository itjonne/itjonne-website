import React from 'react';
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";

import { Link } from './Link';

export const LinkContainer = () => {
  return(
    <div className="link-container">
      <Link 
        name="github.com" 
        link="https://github.com/itjonne"
        icon={<AiOutlineGithub />} />
      <Link 
        name="linkedin.com" 
        link="https://www.linkedin.com/in/jonne-jormakka-74a308203/"
        icon={<AiOutlineLinkedin />} />
    </div>
  )
}