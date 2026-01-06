import http from 'k6/http';
import { check } from 'k6';

export const options = {
  executor: 'ramping-arrival-rate', // การเพิ่มจำนวนของผู้ใช้เข้ามาในระบบอย่างค่อยเป็นค่อยไปในช่วงเวลาที่กำหนด 
  stages: [
    { duration: '2h', target: 20000 }, // ค่อยๆเพิ่มโหลดจนถึงจุดสูงสุด
  ],
};

export default function () {
  const res = http.get(
    'http://api.waqi.info/feed/shanghai/?token=demo',
    {
      headers: {
        Authorization: 'Bearer xxx',
      },
    }
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
