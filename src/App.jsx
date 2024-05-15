import React from 'react'
import { useTranslation } from 'react-i18next'

const App = () => {
  const {t, i18n} = useTranslation()
  const languages = localStorage.getItem('i18nextLng')
  const handleChange = (e) =>{
    const selectedlanguage = e.target.value
    i18n.changeLanguage(selectedlanguage)
  }
  const data= [
    {
      savol : t('savolber1.savol'),
      javob:t('savolber1.javob'), 
    },
    {
      savol : t('savolber2.savol'),
      javob:t('savolber2.javob'), 
    }
  ]
  return (
    <div>
      <h1>Tilni op'zgartieish </h1>
      <select name="Lng" id='lng' onChange={handleChange} value={languages}>
        <option value="uz">Uz</option>
        <option value="en">En</option>
      </select>
     <p>{t('olma')}</p>
     <p>{t('anor')}</p>
     <h3>savollar</h3>
     {
      data.map((item, index) =>(
                <div key={index}>
                  <h4>{item?.savol}</h4>
                  <h4>{item?.javob}</h4>
                </div>
        ))
     }
    </div>
  )
}

export default App