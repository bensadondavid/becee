'use client'

import { Globe } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';


export function ImportLeadsClient(){
  
  const [inputValue, setInputValue] = useState<string>("")

  const handleChange = (e : ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value)
  }

  const handleSubmit = async()=>{
    
    if(!inputValue.trim()){
      return toast.error('Ajouter une URL Google Sheets')
    }
    try{
      const response = await fetch('/api/import', {
        method: 'POST', 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({sheetsUrl : inputValue})
      })
      
      if(!response.ok){
        const data = await response.json()
        return toast.error(data.error)
      }
      return  toast.success("Leads importés avec succès");
    }
    catch(error){
      console.log(error)
      return toast.error("Une erreur est survenue")
    }
  }

  return(

      <div className='flex flex-col w-4/5 md:w-2/3 h-full m-auto pt-2'>

        <div className='flex flex-col mb-10 gap-1'>
          <h1 className='text-2xl font-bold'>Import de leads</h1>
          <p className='text-sm text-muted-foreground'>Importez vos leads depuis Google Sheets</p>
        </div>

        <div className='rounded-xl border bg-card text-card-foreground shadow space-y-4 p-6'>
          <p className='text-xs text-muted-foreground'>Fichier → Partager → Partager avec d'autres utilisateurs → Tous les utilisateurs qui ont le lien</p>
          <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>URL de la feuille Google Sheets</p>
          <input type="text" value={inputValue} onChange={handleChange} className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' placeholder='https://docs.google.com/...' />
          <button onClick={handleSubmit} className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'><Globe />Récupérer</button>
        </div>

    </div>

  )
}