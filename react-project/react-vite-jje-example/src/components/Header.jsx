import { Link } from 'react-router-dom'
import routes from '../route/Routes'

const Header = () => {
  return (
    <div className='text-center mt-3'>
      {routes.map((route, index) =>
        //prettier-ignore
        <Link key={route.path || index} to={route.path}>
         {' '}{route.title}{' '}|
        </Link>,
      )}
    </div>
  )
}

export default Header
