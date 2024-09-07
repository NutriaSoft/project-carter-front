'use client'
// import { Map } from "@/common/components/map";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/common/components/ui/card";
// import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/common/components/ui/resizable";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/common/components/ui/command";
import { wait } from "@/common/lib/utils";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import wretch from "wretch"

export default function Home() {


  const [searchValue, setSearchValue] = useState("")
  const debounce = useDebounce(searchValue, 400)
  const [isFocus, setIsFocus] = useState(false)
  const { isLoading, data } = useQuery({
    queryKey: ["search-atm", debounce],
    async queryFn() {

      await wait(1000)
      // throw new Error("simulate error")
      return wretch("https://jsonplaceholder.typicode.com/todos").get().json<{
        id: string, title: string
      }[]>()
    }
  })


  return (
    <main className="relative">
      <section className="flex gap-4 w-full justify-between p-4 absolute z-10">
        <Command
          // shouldFilter={false}
          onValueChange={(e) => console.log(e)}
        >
          <CommandInput
            value={searchValue}
            onBlur={() => setIsFocus(false)}
            onFocus={() => setIsFocus(true)}
            onValueChange={(e) => setSearchValue(e)}
            placeholder="Type a command or search..." />
          <CommandList hidden={!isFocus}>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup >
              {
                isLoading && <CommandItem>
                  loading
                  <SymbolIcon className="animate-spin" />
                </CommandItem>
              }

              {
                !isLoading && data?.map((value) => (
                  <CommandItem
                    key={value.id}
                    onSelect={() => console.log(value.id)}
                    onClick={() => console.log(value.id)}
                    value={value.id}>
                    {value.title}
                  </CommandItem>
                ))
              }
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </section>

      {/* <Map></Map> */}







    </main>
  );
}
