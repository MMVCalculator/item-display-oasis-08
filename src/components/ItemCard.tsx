import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/Item";
import { useQuery } from "@tanstack/react-query";
import { fetchEmptyBottleSupply } from "@/utils/tokenSupply";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const { data: bottleSupply } = useQuery({
    queryKey: ['bottleSupply'],
    queryFn: fetchEmptyBottleSupply,
    enabled: item.name === "Empty Bottle"
  });

  const displayQuantity = item.name === "Empty Bottle" ? bottleSupply || 0 : item.quantity || 0;

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
        <div className="text-center text-sm text-gray-600">
          Quantity: {displayQuantity}
        </div>
      </CardContent>
    </Card>
  );
}