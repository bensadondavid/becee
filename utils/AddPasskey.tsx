'use client'

import { authClient } from '../lib/auth/auth-client';
import { Button } from '@/Components/ui/button';
import { toast } from 'sonner';

export default function AddPasskey (){
    const newPasskey = async ()=>{
        const {error } =  await authClient.passkey.addPasskey({
        name: "example-passkey-name",
        authenticatorAttachment: "platform",
        });
        if(error){
           return toast.error("Erreur lors de la création d'une passkey")
        }
        toast.success('Passkey créée')
    }

        return(
            <Button onClick={newPasskey}>Ajouter une passkey</Button>
        )
    }