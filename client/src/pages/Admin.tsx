import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Package, FileText, Users, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      toast({
        title: "Logged out successfully",
      });
      setLocation("/admin/login");
    } catch (error) {
      toast({
        title: "Error logging out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const adminSections = [
    {
      title: "Collections",
      description: "Manage poetry collections",
      icon: BookOpen,
      href: "/admin/collections",
      color: "text-rose-500",
    },
    {
      title: "Poems",
      description: "Manage individual poems",
      icon: FileText,
      href: "/admin/poems",
      color: "text-purple-500",
    },
    {
      title: "Events",
      description: "Manage upcoming and past events",
      icon: Calendar,
      href: "/admin/events",
      color: "text-blue-500",
    },
    {
      title: "Products",
      description: "Manage shop products",
      icon: Package,
      href: "/admin/products",
      color: "text-green-500",
    },
    {
      title: "Journal",
      description: "Manage journal posts",
      icon: FileText,
      href: "/admin/journal",
      color: "text-amber-500",
    },
    {
      title: "Newsletter",
      description: "View newsletter subscribers",
      icon: Users,
      href: "/admin/newsletter",
      color: "text-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.username}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.href}
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => setLocation(section.href)}
                data-testid={`card-admin-${section.title.toLowerCase()}`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-muted ${section.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of your content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dashboard analytics coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
