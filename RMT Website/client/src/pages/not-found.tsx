import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="text-center flex flex-col items-center gap-5 max-w-md">
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-destructive" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
        </div>
        <Link href="/">
          <Button data-testid="button-go-home">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
