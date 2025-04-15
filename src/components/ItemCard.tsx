
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/Item";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const [open, setOpen] = useState(false);

  const { data: tokenInfo } = useQuery({
    queryKey: ['tokenInfo', item.name],
    queryFn: async () => {
      if (item.name !== 'Illuminated Soul Fragment') return null;
      
      const response = await fetch('https://www.kubscan.com/api/v2/tokens/0xbb546B399b1767883b083Fef9E69a16dd0185cDD');
      if (!response.ok) throw new Error('Failed to fetch token info');
      return response.json();
    },
    enabled: open && item.name === 'Illuminated Soul Fragment'
  });

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg truncate">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-contain"
            loading="lazy"
          />
          <div className="text-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setOpen(true)}
            >
              ตรวจสอบ
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open && item.name === 'Illuminated Soul Fragment'} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.name} Token Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {tokenInfo ? (
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(tokenInfo, null, 2)}
              </pre>
            ) : (
              <p>Loading token information...</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
