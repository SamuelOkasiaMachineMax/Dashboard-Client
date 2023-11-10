import Image from 'next/image'

import "./page.css"

import Title from "@/components /title/title";
import Alerts from "@/components /alerts/alerts";
export default function Home() {
  return (
    <div className="home">
      <Title title = "Home"/>
        <div className="home__content section__padding">
            <Alerts/>

        </div>
    </div>
  )
}
