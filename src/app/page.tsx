import { MapMain } from "@/common/components/map";
import { Button } from "@/common/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/common/components/ui/card";
// import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/common/components/ui/resizable";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/common/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
export default function Home() {
	return (
		<main className="relative">
			<section className="flex w-full justify-between p-4 absolute z-10">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon">
							<HamburgerMenuIcon className="h-4 w-4" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>Are you absolutely sure?</SheetTitle>
							<SheetDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</section>

			<MapMain />

			{/* <ResizablePanelGroup
        className="min-h-dvh max-w-md rounded-lg border md:min-w-[450px]"
        direction="vertical">
        <ResizablePanel minSize={25} defaultSize={75}>

        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={10} defaultSize={25}>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup> */}
		</main>
	);
}
