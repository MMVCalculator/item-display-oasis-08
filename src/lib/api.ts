/**
 * ฟังก์ชันสำหรับเรียกใช้ API เพื่อดึงข้อมูล token
 * ใช้วิธีการที่หลากหลายเพื่อแก้ไขปัญหา CORS
 */
export async function fetchTokenInfo(tokenAddress: string) {
  // ตรวจสอบว่ากำลังรันอยู่บน Netlify หรือไม่
  const isNetlify = window.location.hostname.includes("netlify.app");

  const urls = [];

  // ถ้าไม่ได้อยู่บน Netlify (เช่น localhost) ให้ลองใช้ proxy ก่อน
  if (!isNetlify) {
    urls.push(`/api/tokens/${tokenAddress}`);
  }

  // เพิ่ม URL อื่นๆ ที่น่าจะทำงานได้ทั้งบน Netlify และ localhost
  urls.push(
    // ลองใช้ JSONP หรือ CORS-proxy
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.kubscan.com/api/v2/tokens/${tokenAddress}`
    )}`,
    // ลองใช้ cors-anywhere (fallback)
    `https://cors-anywhere.herokuapp.com/https://www.kubscan.com/api/v2/tokens/${tokenAddress}`
  );

  // ลองเรียกใช้ URL แต่ละอันจนกว่าจะสำเร็จ
  for (const url of urls) {
    try {
      console.log(`Trying to fetch from ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        console.log(
          `Failed to fetch from ${url}: ${response.status} ${response.statusText}`
        );
        continue;
      }

      // กรณีใช้ allorigins
      if (url.includes("allorigins.win")) {
        const data = await response.json();
        if (data && data.contents) {
          console.log("Successfully fetched data via allorigins");
          return JSON.parse(data.contents);
        }
      } else {
        // กรณีปกติ
        console.log(`Successfully fetched data from ${url}`);
        return await response.json();
      }
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      // ไม่ throw error แต่ลองเรียก URL ถัดไป
    }
  }

  // หากทุก URL ล้มเหลว ให้โยน error
  console.error("ไม่สามารถเชื่อมต่อกับ API ได้");
  throw new Error("ไม่สามารถเชื่อมต่อกับ API ได้ โปรดลองใหม่ภายหลัง");
}
