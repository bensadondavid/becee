import { Button } from "@/Components/ui/button"
import { addPasskey } from "@/utils/AddPasskey"

export default function page() {

  return (
    <Button onClick={addPasskey}>Ajouter une passkey</Button>
  )
}
