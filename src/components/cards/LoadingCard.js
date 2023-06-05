import { Card, Skeleton } from 'antd'

const LoadingCard = ({ count }) => (
  <div className='row pb-5'>
    {Array(count)
      .fill(true)
      .map((_, i) => (
        <Card key={i} className='col-md-4'>
          <Skeleton active />
        </Card>
      ))}
  </div>
)

export default LoadingCard
