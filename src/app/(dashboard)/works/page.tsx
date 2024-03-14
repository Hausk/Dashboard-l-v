import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkList } from "@/components/worksList";
import Image from "next/image";

export default function Page() {
    const works = ['Test1', 'Test2', 'Test3'];
    const works2 = '';
    return (
      <>
        <div className="flex-col md:flex">
          <div className="p-0 flex-1 space-y-4 lg:p-8 lg:pt-6">
            <div className="flex items-center justify-between lg:space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Catégories</h2>
              <div className="flex items-center justify-end">
                <Button>Ajouter</Button>
              </div>
            </div>
            <Separator />
            <WorkList works={works2}/>
          </div>
        </div>
      </>
    )
}
