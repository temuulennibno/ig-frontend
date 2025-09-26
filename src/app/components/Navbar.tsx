import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="w-full flex justify-between p-4 border-b">
      <Button>
        <Menu />
      </Button>
      <Button>☀️</Button>
    </div>
  );
};
