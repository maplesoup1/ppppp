import React from 'react'
import SkillCard from './_component/SkillCard'

const Skill = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center '>

        <h1 className='text-5xl md:text-7xl text-white pb-10'>My Skills</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-auto justify-center items-center'>
        <SkillCard imageUrl='/img/nn.png' title='Next.js' description='Proficient in Next.js frameworks, including server-side rendering, dynamic routing, optimizing performance, managing API routes, and building scalable, SEO-friendly web applications.'/>
        <SkillCard imageUrl='/img/React.png' title='React' description='Proficient in Redux tools for centralized state management, developing reusable components, creating custom hooks, and encapsulating Axios for efficient HTTP requests.'/>
        <SkillCard imageUrl='/img/typescript.png' title='TypeScript' description='Proficient in implementing type-safe applications for code reliability, defining reusable interfaces and types, and streamlining development with clear and maintainable code structures.'/>

        <SkillCard imageUrl='/img/dotnet.svg' title='ASP.NET Core' description='Proficient in developing RESTful APIs, configuring middleware, managing dependency injection, utilizing Entity Framework Core for data access, and securing API endpoints with JWT authentication.'/>
        <SkillCard imageUrl='/img/database.png' title='Database' description='Proficient in SQL Server, designing relational database schemas, optimizing queries for performance, utilizing caching technologies like Redis, and ensuring data integrity with constraints and transactions.'/>
        <SkillCard imageUrl='/img/azure.png' title='Azure' description='Proficient in Azure cloud services, implementing CI/CD pipelines with GitHub Actions, managing image storage with Azure Blob Storage, and deploying applications in Azure App Services.'/>
      </div>
    </div>
  )
}

export default Skill