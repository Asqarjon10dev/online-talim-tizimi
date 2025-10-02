import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import CourseCard from './CourseCard'
import StatisticsSection from './StatisticsSection'
import HeroSection from './HeroSection'
import CoursesPage from '../pages/CoursePage'

export default function () {
  return (
    <div>
        <Home />
        <CourseCard />
        <StatisticsSection />
        <HeroSection />
        <Link to="/kurslar"   ></Link>

    </div>
  )
}
