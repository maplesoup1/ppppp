import React from 'react'
import Image from 'next/image'

interface SkillCardProp {
  imageUrl?: string;
  title?: string;
  description?: string;
  className?: string;
}

const SkillCard: React.FC<SkillCardProp> = ({ imageUrl = '', title, description }) => {
  return (
    <div className='h-[320px] w-[320px] rounded-3xl shadow-2xl flex flex-col'>
      <div className='p-5 flex flex-col gap-4'>
        <Image src={imageUrl} width={50} height={50} alt="ct" />
        <div className='text-2xl'>
          {title}
        </div>
        <div className=''>
          {description}
        </div>
      </div>
    </div>
  )
}

export default SkillCard