import Jumbotron from '../components/cards/Jumbotron'
import BestSellers from '../components/home/BestSellers'
import NewArrivals from '../components/home/NewArrivals'

const Home = () => (
  <>
    <div className='jumbotron h1 text-center text-danger font-weight-bold'>
      <Jumbotron text={['New arrivals', 'Best sellers', 'Special offers']} />
    </div>

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      New arrivals
    </h4>
    <NewArrivals />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      Best sellers
    </h4>
    <BestSellers />
  </>
)

export default Home
