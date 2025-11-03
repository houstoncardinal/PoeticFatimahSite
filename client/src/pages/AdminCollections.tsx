import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Collection } from "@shared/schema";

export default function AdminCollections() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
  });

  const { data: user, isLoading: authLoading } = useQuery({ queryKey: ["/api/auth/me"], retry: false });
  const { data: collections, isLoading } = useQuery<Collection[]>({ queryKey: ["/api/collections"] });

  const createMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/collections", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/collections"] });
      toast({ title: "Collection created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error creating collection", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/collections/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/collections"] });
      toast({ title: "Collection updated successfully" });
      setIsDialogOpen(false);
      setEditingCollection(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error updating collection", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/collections/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/collections"] });
      toast({ title: "Collection deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error deleting collection", variant: "destructive" });
    },
  });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const resetForm = () => {
    setFormData({ title: "", slug: "", description: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCollection) {
      updateMutation.mutate({ id: editingCollection.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData({
      title: collection.title,
      slug: collection.slug,
      description: collection.description || "",
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLocation("/admin")} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-serif font-bold">Manage Collections</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingCollection(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-collection">
                <Plus className="h-4 w-4 mr-2" />
                Add Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCollection ? "Edit Collection" : "Create New Collection"}</DialogTitle>
                <DialogDescription>
                  {editingCollection ? "Update collection details" : "Add a new poetry collection"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                    }}
                    required
                    data-testid="input-title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    data-testid="input-slug"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    data-testid="input-description"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending} 
                    data-testid="button-submit"
                  >
                    {editingCollection 
                      ? (updateMutation.isPending ? "Updating..." : "Update Collection")
                      : (createMutation.isPending ? "Creating..." : "Create Collection")
                    }
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setIsDialogOpen(false);
                    setEditingCollection(null);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Collections ({collections?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading collections...</p>
            ) : collections && collections.length > 0 ? (
              <div className="space-y-4">
                {collections.map((collection) => (
                  <div
                    key={collection.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover-elevate"
                    data-testid={`collection-${collection.slug}`}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{collection.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{collection.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Slug: {collection.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(collection)}
                        data-testid={`button-edit-${collection.slug}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm(`Delete "${collection.title}"?`)) {
                            deleteMutation.mutate(collection.id);
                          }
                        }}
                        data-testid={`button-delete-${collection.slug}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No collections yet. Create your first collection!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
