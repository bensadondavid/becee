import { authClient } from '../lib/auth/auth-client';

export const addPasskey = async ()=>{
        const { data, error } =  await authClient.passkey.addPasskey({
        name: "example-passkey-name",
        authenticatorAttachment: "platform",
        });
    }