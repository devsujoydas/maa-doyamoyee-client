import React from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const SectionHeading = ({ title, pathname, path, textcolor }) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className={`text-xl ${textcolor} md:text-3xl font-display font-bold text-foreground`}>{title}</h2>
                <Link to={path} className={`cursor-pointer ${textcolor}  md:text-base text-sm font-medium flex items-center gap-1 hover:underline`}>{pathname} <HiArrowRight /></Link>
            </div>
        </div>
    )
}

export default SectionHeading