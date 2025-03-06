import { routes } from '@/router/Router'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='{() => false}'>
            React
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {routes[0].children &&
                routes[0].children.map((route) => (
                  //console.log(route.loader() + route.path)
                  <li className='nav-item dropdown'>
                    <Link
                      to={route.path}
                      className='nav-link'
                      // id='navbarDropdown'
                      // role='button'
                      // data-bs-toggle='dropdown'
                      // aria-expanded='false'
                    >
                      {route.loader()}
                    </Link>
                    {/* {route.children && (
                      <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                        {route.children.map((child) => (
                          <li key={child.loader()}>
                            <Link to={child.path} className='dropdown-item'>
                              {child.loader()}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )} */}
                  </li>
                ))}
            </ul>
            <form className='d-flex'>
              <input class='form-control me-2' type='search' placeholder='Search' aria-label='Search' />
              <button className='btn btn-outline-success' type='submit'>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
