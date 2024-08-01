import { IMatchKnockouts } from '@/interfaces/matchKnockouts'
import moment from 'moment'
import Image from 'next/image'

interface IProps {
  data: IMatchKnockouts
}

const FORMAT_DATE = 'DD MMM, hh:mm'
const URL = 'https://asset.asiasport.com/'

export function CardItem(props: IProps) {
  const { data } = props
  
  return (
    <div className='px-4 py-2 bg-slate-500 text-white rounded-lg border-none text-lg'>
      <p>{moment(data.matchTime).format(FORMAT_DATE)}</p>
      <div className='!flex gap-2'>
        <Image src={`${URL}${data.homeLogo}`} width={20} height={20} alt={data.homeName} />
        <p className='flex-1 flex justify-between'><span>{data.homeName}</span> <span>{data.homeScore}</span></p>
      </div>
      <div className='!flex gap-2'>
        <Image src={`${URL}${data.awayLogo}`} width={20} height={20} alt={data.awayName} />
        <p className='flex-1 flex justify-between'><span>{data.awayName}</span> <span>{data.awayScore}</span></p>
      </div>
    </div>
  )
}
