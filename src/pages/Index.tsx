
import { useState } from "react";
import { items } from "@/data/items";
import { ItemCard } from "@/components/ItemCard";
import { materials } from "@/data/categories/materials";
import { crops } from "@/data/categories/crops";
import { food } from "@/data/categories/food";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredItems = () => {
    switch (selectedCategory) {
      case "materials":
        return materials;
      case "crops":
        return crops;
      case "food":
        return food;
      default:
        return items;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Item Catalog</h1>
        
        {/* Category Filter */}
        <div className="max-w-lg mx-auto mb-8">
          <RadioGroup
            defaultValue="all"
            onValueChange={setSelectedCategory}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Items</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="materials" id="materials" />
              <Label htmlFor="materials">Materials</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="crops" id="crops" />
              <Label htmlFor="crops">Crops Seed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="food" id="food" />
              <Label htmlFor="food">Food</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems().map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
