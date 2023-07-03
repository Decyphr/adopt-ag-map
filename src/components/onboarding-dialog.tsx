import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { HelpCircle } from "lucide-react"

export default function OnboardingDialog() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button variant="ghost">
          <span className="sr-only">Help</span>
          <HelpCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to MapDash!</DialogTitle>
          <DialogDescription>
            Our plotting tool will help you visualize your geospatial data and plan your next project.<br /><br/>
            To get started:<br/>
            <ol className="mt-2 space-y-2">
              <li>1. Click the <strong>Draw Polygon</strong> button on the top left of the map.<br /></li>
              <li>2. Then, click on the map to start drawing your polygon.<br /></li>
              <li>3. When you&apos;re done, click the <strong>Save</strong> button on the top left of the map.<br /></li>
            </ol>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}