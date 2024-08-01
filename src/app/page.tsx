import { HorizontalFlow } from "@/components/HorizontalFlow"
import { IMatchKnockouts } from "@/interfaces/matchKnockouts"
import type { Metadata } from 'next'
interface ResponseData{
  result: {
    matchKnockouts: IMatchKnockouts[]
  }
}


 
export const metadata: Metadata = {
  title: 'Test developer Tú',
  description: 'Offer lương theo năng lực',
}

async function getData() {
  const res = await fetch('https://api2.asiasport.com/match/uefa_euro_2024/knockout?contestId=4&language=vi&lang=vi_VN&timeZone=Asia%2FHo_Chi_Minh&displayAll=1')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  
  return res.json()
}

export default async function Home(){
  const data:ResponseData = await getData()
  // console.log(data.result.matchKnockouts);
  return <>
    <HorizontalFlow data={data.result.matchKnockouts} />
  </>
}
