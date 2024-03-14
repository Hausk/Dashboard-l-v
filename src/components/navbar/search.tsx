import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search..."
        className="w-full"
      />
    </div>
  )
}