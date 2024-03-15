import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
    return (
        <div className="flex-col md:flex">
          <div className="p-0 flex-1 space-y-4 lg:p-8 lg:pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Utilisateurs</h2>
              <div className="flex items-center justify-end">
                <Button>Ajouter</Button>
              </div>
            </div>
            <Separator />
          </div>
        </div>
    )
}