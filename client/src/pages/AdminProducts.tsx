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
import { ArrowLeft, Plus, Trash2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@shared/schema";

export default function AdminProducts() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    blurb: "",
    priceText: "",
    buyUrl: "",
    imageUrl: "",
    details: "",
  });

  const { data: user, isLoading: authLoading } = useQuery({ queryKey: ["/api/auth/me"], retry: false });
  const { data: products, isLoading } = useQuery<Product[]>({ queryKey: ["/api/products"] });

  const createMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error creating product", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/products/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error deleting product", variant: "destructive" });
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
      blurb: "",
      priceText: "",
      buyUrl: "",
      imageUrl: "",
      details: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
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
            <h1 className="text-3xl font-serif font-bold">Manage Products</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-product">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogDescription>Add a book, print, or digital product to your shop</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Healing: The Collection"
                    data-testid="input-title"
                  />
                </div>
                <div>
                  <Label htmlFor="blurb">Description *</Label>
                  <Textarea
                    id="blurb"
                    value={formData.blurb}
                    onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                    required
                    rows={3}
                    placeholder="A curated collection of poems..."
                    data-testid="input-blurb"
                  />
                </div>
                <div>
                  <Label htmlFor="priceText">Price *</Label>
                  <Input
                    id="priceText"
                    value={formData.priceText}
                    onChange={(e) => setFormData({ ...formData, priceText: e.target.value })}
                    required
                    placeholder="$18"
                    data-testid="input-price"
                  />
                </div>
                <div>
                  <Label htmlFor="buyUrl">Buy URL * (Gumroad, Shopify, etc.)</Label>
                  <Input
                    id="buyUrl"
                    type="url"
                    value={formData.buyUrl}
                    onChange={(e) => setFormData({ ...formData, buyUrl: e.target.value })}
                    required
                    placeholder="https://gumroad.com/..."
                    data-testid="input-buy-url"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Product Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    data-testid="input-image-url"
                  />
                </div>
                <div>
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows={2}
                    placeholder="48 pages, soft cover, limited edition"
                    data-testid="input-details"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit">
                    {createMutation.isPending ? "Creating..." : "Create Product"}
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
            <CardTitle>All Products ({products?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading products...</p>
            ) : products && products.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col p-4 border rounded-lg hover-elevate"
                    data-testid={`product-${product.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{product.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm(`Delete "${product.title}"?`)) {
                            deleteMutation.mutate(product.id);
                          }
                        }}
                        data-testid={`button-delete-${product.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{product.blurb}</p>
                    <p className="text-sm font-semibold text-primary mb-2">{product.priceText}</p>
                    {product.details && (
                      <p className="text-xs text-muted-foreground mb-2">{product.details}</p>
                    )}
                    <a
                      href={product.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Purchase Link <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No products yet. Create your first product!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
