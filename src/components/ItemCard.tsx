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
import { fetchTokenInfo } from "@/lib/api";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const [open, setOpen] = useState(false);
  const tokenAddress =
    item.address || "0x5BF5eea0CE540db3986fa58ee47D685104b7c2FB";
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    data: tokenInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tokenInfo", tokenAddress],
    queryFn: async () => {
      try {
        // ใช้ฟังก์ชัน fetchTokenInfo ที่เราสร้างไว้ใน api.ts
        const data = await fetchTokenInfo(tokenAddress);
        setApiError(null);
        return data;
      } catch (error) {
        console.error("Error fetching token info:", error);
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("ไม่สามารถเชื่อมต่อกับ API ได้ โปรดลองใหม่ภายหลัง");
        }
        throw error;
      }
    },
    enabled: open,
    retry: 1,
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
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              ตรวจสอบ
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.name} Token Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {isLoading ? (
              <p>กำลังโหลดข้อมูล...</p>
            ) : apiError ? (
              <div className="p-4 rounded bg-red-50 text-red-600 border border-red-200">
                <p>{apiError}</p>
                <p className="mt-2 text-sm">
                  ขณะนี้ไม่สามารถเชื่อมต่อกับ API ได้ อาจเกิดจากปัญหา CORS
                  หรือเซิร์ฟเวอร์มีปัญหา
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        `https://www.kubscan.com/token/${tokenAddress}`,
                        "_blank"
                      )
                    }
                  >
                    ดูข้อมูลที่ Kubscan โดยตรง
                  </Button>
                </div>
              </div>
            ) : tokenInfo ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-semibold">ชื่อ:</div>
                  <div>{tokenInfo.name}</div>

                  <div className="font-semibold">สัญลักษณ์:</div>
                  <div>{tokenInfo.symbol}</div>

                  <div className="font-semibold">ที่อยู่:</div>
                  <div className="truncate">{tokenInfo.address}</div>

                  <div className="font-semibold">จำนวนผู้ถือ:</div>
                  <div>{tokenInfo.holders}</div>

                  <div className="font-semibold">Decimals:</div>
                  <div>{tokenInfo.decimals}</div>

                  <div className="font-semibold">จำนวนทั้งหมด:</div>
                  <div>{tokenInfo.total_supply}</div>

                  <div className="font-semibold">ประเภท:</div>
                  <div>{tokenInfo.type}</div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        `https://www.kubscan.com/token/${tokenAddress}`,
                        "_blank"
                      )
                    }
                  >
                    ดูเพิ่มเติมที่ Kubscan
                  </Button>
                </div>
              </div>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
