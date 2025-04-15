
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/Item";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
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
          <Button variant="outline" size="sm">
            ตรวจสอบ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
