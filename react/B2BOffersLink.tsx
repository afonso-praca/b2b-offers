import { FC } from 'react'

interface RenderProps {
  name: string
  path: string
}

interface Props {
  render: (paths: RenderProps[]) => any
  intl: any
}

const B2BOffersLink: FC<Props> = ({ render }: Props) => {
  return render([
    {
      name: "B2B Offers",
      path: '/b2b-offers',
    },
  ])
}

export default B2BOffersLink