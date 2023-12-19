import React from 'react'
import '../styles/components/Footer.css'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <>
         <div className="footer">  
        <copyright>
          <p> Copyright &copy; {year} Made with ❤️ By Sarthak Joshi</p>
        </copyright>
      </div>
    </>
  )
}

export default Footer