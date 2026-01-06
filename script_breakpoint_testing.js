import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    breakpoint: {
      executor: 'ramping-arrival-rate', // การเพิ่มจำนวนของผู้ใช้เข้ามาในระบบอย่างค่อยเป็นค่อยไปในช่วงเวลาที่กำหนด 
      startRate: 50,
      timeUnit: '1s',
      stages: [
        { target: 10000, duration: '1m' }, // ค่อยๆเพิ่มโหลดจนถึงจุดสูงสุด
        { target: 20000, duration: '1m' },
        { target: 30000, duration: '1m' },
      ],
      preAllocatedVUs: 200,
      maxVUs: 2000,
    },
  },

  thresholds: {
    //ถ้า error เกิน 0% หยุดทันที
    http_req_failed: [
      {
        threshold: 'rate==0',
        abortOnFail: true,
        delayAbortEval: '5s',
      },
    ],
  },
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
