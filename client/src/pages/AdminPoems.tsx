import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Poem, Collection } from "@shared/schema";

export default function AdminPoems() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    body: "",
    excerpt: "",
    collectionId: "",
    themes: "",
    audioUrl: "",
    transcript: "",
    imageUrl: "",
  });

  const { data: user } = useQuery({ queryKey: ["/api/auth/me"], retry: false });
  const { data: poems, isLoading: poemsLoading } = useQuery<Poem[]>({ queryKey: ["/api/poems"] });
  const { data: collections } = useQuery<Collection[]>({ queryKey: ["/api/collections"] });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const themes = data.themes ? data.themes.split(",").map((t: string) => t.trim()) : [];
      return apiRequest("POST", "/api/poems", { ...data, themes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/poems"] });
      toast({ title: "Poem created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error creating poem", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/poems/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/poems"] });
      toast({ title: "Poem deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error deleting poem", variant: "destructive" });
    },
  });

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      body: "",
      excerpt: "",
      collectionId: "",
      themes: "",
      audioUrl: "",
      transcript: "",
      imageUrl: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
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
            <h1 className="text-3xl font-serif font-bold">Manage Poems</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-poem">
                <Plus className="h-4 w-4 mr-2" />
                Add Poem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Poem</DialogTitle>
                <DialogDescription>Add a new poem to your collection</DialogDescription>
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
                  <Label htmlFor="body">Poem Text *</Label>
                  <Textarea
                    id="body"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    required
                    rows={10}
                    data-testid="input-body"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    data-testid="input-excerpt"
                  />
                </div>
                <div>
                  <Label htmlFor="collection">Collection</Label>
                  <Select value={formData.collectionId} onValueChange={(value) => setFormData({ ...formData, collectionId: value })}>
                    <SelectTrigger data-testid="select-collection">
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections?.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="themes">Themes (comma-separated)</Label>
                  <Input
                    id="themes"
                    value={formData.themes}
                    onChange={(e) => setFormData({ ...formData, themes: e.target.value })}
                    placeholder="Healing, Love, Growth"
                    data-testid="input-themes"
                  />
                </div>
                <div>
                  <Label htmlFor="audioUrl">Audio URL</Label>
                  <Input
                    id="audioUrl"
                    type="url"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    data-testid="input-audio-url"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    data-testid="input-image-url"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit">
                    {createMutation.isPending ? "Creating..." : "Create Poem"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Poems ({poems?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {poemsLoading ? (
              <p className="text-muted-foreground">Loading poems...</p>
            ) : poems && poems.length > 0 ? (
              <div className="space-y-4">
                {poems.map((poem) => (
                  <div
                    key={poem.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover-elevate"
                    data-testid={`poem-${poem.slug}`}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{poem.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{poem.excerpt || poem.body.substring(0, 100) + "..."}</p>
                      {poem.themes && poem.themes.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {poem.themes.map((theme, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-muted rounded">
                              {theme}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm(`Delete "${poem.title}"?`)) {
                          deleteMutation.mutate(poem.id);
                        }
                      }}
                      data-testid={`button-delete-${poem.slug}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No poems yet. Create your first poem!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
