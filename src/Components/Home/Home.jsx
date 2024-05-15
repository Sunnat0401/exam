import React from 'react'
import './Home.css'
const Home = () => {
  return (
    <div className='home'>
            <form className='home-f'>
                <input type="text " placeholder='malumotni kiriting' />
                <input type="text " placeholder='raqamni kiriting' />
        <button type='submit'>Submit</button>
    </form>
    </div>

  )
}

export default Home