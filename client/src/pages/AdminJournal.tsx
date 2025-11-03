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
import type { JournalPost } from "@shared/schema";

export default function AdminJournal() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<JournalPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    body: "",
    excerpt: "",
    category: "",
    audioUrl: "",
    imageUrl: "",
  });

  const { data: user, isLoading: authLoading } = useQuery({ queryKey: ["/api/auth/me"], retry: false });
  const { data: posts, isLoading } = useQuery<JournalPost[]>({ queryKey: ["/api/journal"] });

  const createMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/journal", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      toast({ title: "Journal post created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error creating journal post", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/journal/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      toast({ title: "Journal post updated successfully" });
      setIsDialogOpen(false);
      setEditingPost(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error updating journal post", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/journal/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      toast({ title: "Journal post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error deleting journal post", variant: "destructive" });
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
    setFormData({
      title: "",
      slug: "",
      body: "",
      excerpt: "",
      category: "",
      audioUrl: "",
      imageUrl: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (post: JournalPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      body: post.body,
      excerpt: post.excerpt || "",
      category: post.category,
      audioUrl: post.audioUrl || "",
      imageUrl: post.imageUrl || "",
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
            <h1 className="text-3xl font-serif font-bold">Manage Journal</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingPost(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-post">
                <Plus className="h-4 w-4 mr-2" />
                Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Journal Post" : "Create New Journal Post"}</DialogTitle>
                <DialogDescription>
                  {editingPost ? "Update post details" : "Add a blog post, reflection, or announcement"}
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
                  <Label htmlFor="body">Post Content *</Label>
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
                    rows={2}
                    data-testid="input-excerpt"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    placeholder="Reflections, Announcements, etc."
                    data-testid="input-category"
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
                  <Label htmlFor="imageUrl">Cover Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    data-testid="input-image-url"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending} 
                    data-testid="button-submit"
                  >
                    {editingPost 
                      ? (updateMutation.isPending ? "Updating..." : "Update Post")
                      : (createMutation.isPending ? "Creating..." : "Create Post")
                    }
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setIsDialogOpen(false);
                    setEditingPost(null);
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
            <CardTitle>All Posts ({posts?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading journal posts...</p>
            ) : posts && posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover-elevate"
                    data-testid={`post-${post.slug}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <span className="text-xs px-2 py-1 bg-muted rounded">{post.category}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt || post.body.substring(0, 150) + "..."}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                        data-testid={`button-edit-${post.slug}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm(`Delete "${post.title}"?`)) {
                            deleteMutation.mutate(post.id);
                          }
                        }}
                        data-testid={`button-delete-${post.slug}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No journal posts yet. Create your first post!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
